import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, PanResponder, FlatList, Animated, Easing, Pressable, TouchableOpacity, ImageBackground } from 'react-native'
import { COLOR } from '../../../colors/Colors'
import Header from '../../../components/Header/Header'
import { useRootNavigation } from '../../../navigations/StackNavigation'
import Feed from '../../../components/feed/Feed'
import Icon from 'react-native-vector-icons/Ionicons'

import CommentPage from './feed/CommentPage'
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { client } from '../../../services/client'
import { RootReducerState } from '../../../components/redux/store/store'
import { useSelector } from 'react-redux'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import SoundPlayer from 'react-native-sound-player'
import { useIsFocused } from '@react-navigation/native'
//import BottomSheet from '@gorhom/bottom-sheet';


export default function MainPage() {
    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height
    const isFocused =useIsFocused()
    //service
    const {
        GET_FEED_LIST,
        PUT_FEED_LIKE,
        POST_WRITE_COMMENT
    } = client()
    // anim
    const interpolateAnim = useRef(new Animated.Value(0)).current;
    const [commentList, setCommentList] = useState<any>()
    const panAnim = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (evt, gestureState) => {
            console.log('dx:', gestureState.dy); // X 방향 변화값
            //console.log('dy:', gestureState); // Y 방향 변화값
            if (gestureState.dy > 100) {
                hideHeader()
            }
        },

    })
    // hooks
    const navigation = useRootNavigation()
    const signedUser = useSelector((state: RootReducerState) => state.login.state);
    const [feedData, setFeedData] = useState<any>(null)
    const [commentIndex, setCommentIndex] = useState(null)
    useEffect(() => {
        GET_FEED_LIST(signedUser.data.token).then((res) => {
            setCommentList(res.data[0].commentList)
            console.log('xxxxxxxxxxxxxxxxxxxxxxx', res.data[0].commentList[0])
            setFeedData(res)
        })

    }, [isFocused])
    // function
    const onPressCreateFeed = () => {
        navigation.navigate('CreateFeed')
    }
    const hideHeader = () => {
        Animated.timing(interpolateAnim, {
            toValue: 1,
            useNativeDriver: false,
            duration: 500,
            easing: Easing.out(Easing.cubic),
        }).start()
    }
   

    const FeedCard = ({ data, index }: any) => {
        console.log('FeedCard Data *********', data)
        const [like, setLike] = useState(data.likeCount)
        const [clicked, setClicked] = useState(true)
        const [isPlayed, setIsPlayed] = useState(false)
        const [preData,setPreData] = useState<any>('')
        const handlePresentModalPress = useCallback(() => {
            setCommentIndex(data.id)
            setCommentList(data.commentList)
            
            bottomSheetModalRef.current?.present();
        }, []);
        const onPressPlay = async () => {
            setIsPlayed(!isPlayed)
            if(preData){
                SoundPlayer.resume()
            }
            else{
                SoundPlayer.playUrl(data.musicUrl)
                setPreData(true)
                
            }
            const info = await SoundPlayer.getInfo()
            console.log('getInfo', info)
            
            Animated.timing(interpolateAnim, {
                toValue: 1,
                duration: info.duration * 1000,
                useNativeDriver: false
            }).start()
        }
        const onPressStop = async () => {
            setIsPlayed(!isPlayed)
            SoundPlayer.pause()

        }
        return (
            <View
                style={{ height: height * 0.76 }}>
                <View style={{ flex: 0.08, marginBottom: 10, flexDirection: "row" }}>
                    {/* title */}
                    <View style={styles.feedUserImageBox}>
                        {/*  */}
                        <Image style={styles.feedUserImage} source={{ uri: data.memberProfileUrl }} />
                    </View>
                    <View style={styles.feedUserInfoBox}>
                        <Text style={styles.textWhite}>{data.memberName}</Text>
                        <View style={{ flexDirection: "row" }}>
                            {/* music info */}
                            <Icon style={{
                                alignSelf: "center",
                                marginRight: 5
                            }}
                                name="musical-notes-outline"
                                size={13}
                                color={'white'} />
                            <Text style={styles.textGray}>{data.musicArtist} -</Text>
                            <Text style={styles.textGray}>{data.musicTitle}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{ flex: 0.72, marginBottom: 5 }}>
                    {/* content */}
                    <View>
                        <ImageBackground
                            style={styles.contentImage}
                            blurRadius={5}
                            source={{ uri: data.image }}>
                            <Image style={{ width: 200, height: 200, position: 'absolute', alignSelf: 'center', top: 80, zIndex: 1 }}
                                source={{ uri: data.image }} />
                            <View style={{ backgroundColor: 'gray', flex: 1, opacity: 0.4, zIndex: 0 }}>
                                {isPlayed ?
                                 <TouchableOpacity
                                 onPress={onPressStop}>
                                 <Icon name='pause' size={24} style={{ top: 300, alignSelf: 'center' }} color="black" />
                             </TouchableOpacity>:
                                    <TouchableOpacity
                                        onPress={onPressPlay}>
                                        <Icon name='caret-forward' size={24} style={{ top: 300, alignSelf: 'center' }} color="black" />
                                    </TouchableOpacity>
                                }


                            </View>

                        </ImageBackground>
                    </View>
                </View>
                <View style={{ flex: 0.2 }}>
                    {/* footer */}
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Pressable onPress={() => {
                            PUT_FEED_LIKE(signedUser.data.token, data.id)
                            if (clicked) {
                                setLike(like + 1)
                            }
                            else {
                                setLike(like - 1)
                            }
                            setClicked(!clicked)
                        }}>{clicked ?
                            <Icon style={{ marginRight: 10, }} name="heart-outline" color={"white"} size={25}></Icon> :
                            <Icon style={{ marginRight: 10, }} name="heart" color={"red"} size={25}></Icon>}
                        </Pressable>
                        <Pressable onPress={handlePresentModalPress}>
                            <Icon name="chatbubble-outline" color={"white"} size={25}></Icon>
                        </Pressable>
                    </View>
                    <View>

                        <Text style={styles.contentText}>좋아요 {like} 개</Text>


                        <Text style={styles.contentText}>
                            {data.body}
                        </Text>
                    </View>
                </View>

            </View>
        )
    }
    const Header = () => {
        return (
            <Animated.View style={styles.titleContainer}>
                <Text style={styles.titleText}>BRAGI</Text>
                <Pressable onPress={onPressCreateFeed}>
                    <Icon name={'create-outline'} size={18} color={'white'} />
                </Pressable>
            </Animated.View>
        )

    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLOR.BACKCOLOR,
            padding: 20,

        },
        feedView: {
            backgroundColor: 'black',
            opacity: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
        },
        feedUserImageBox: {
            flex: 0.15,
            width: '100%',
            height: '100%',
            borderRadius: 25,

        },
        feedUserImage: {
            width: '80%',
            height: '100%',
            borderRadius: 25
        },
        feedUserInfoBox: {
            flex: 0.75,

            paddingLeft: 15
        },
        textWhite: {
            fontSize: 16,
            color: 'white'
        },
        textGray: {

            fontSize: 13,
            color: COLOR.FONTCOLOR_WHITE,
            marginRight: 5
        },
        contentImage: {
            width: '100%',
            height: '100%',

        },
        contentText: {
            fontSize: 14,
            color: 'white'
        },
        titleContainer: {

            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 30
        },
        titleText: {
            fontWeight: "bold",
            fontSize: 17,
            color: COLOR.FONTCOLOR_WHITE
        },
        nextText: {
            fontSize: 16,
            color: COLOR.FIX_FONT_BLUE
        }

    })

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const onPressCommentButton = () => { console.log('hi') }
    // variables
    const snapPoints = useMemo(() => ['5%', '98%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        console.log(snapPoints)
        Animated.timing(interpolateAnim, {
            toValue: 0,
            useNativeDriver: false,
            duration: 500,
            easing: Easing.out(Easing.cubic),
        }).start()
    }, [snapPoints])
    const [p, setP] = useState(null)
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.2}
                disappearsOnIndex={1}
                appearsOnIndex={2}
            />
        ),
        []
    );

    const RnderView = ({ data, index }: any) => {
        console.log('dtatsdtasdtasdtsdtasdfsdaf',commentList[index])
        return (

            <View style={{ height: 80, borderWidth: 1, flexDirection: 'row' }}>
                {/* 댓글 뷰 */}
                <View style={{ width: '15%', height: 80, justifyContent: 'center' }}>
                    {/* 유저 프로필 뷰 */}
                    <Image
                        style={{ height: 50, width: 50, borderRadius: 25 }}
                        source={{
                            uri:
                                //image url등록 필요
                                //
                                commentList[index].memberProfileUri
                        }} />
                </View>
                <View style={{ width: '85%' }}>
                    {/* 유저 코멘트 뷰 */}
                    <View style={{ height: 20, marginTop: 6 }}>
                        <Text style={{ color: COLOR.FONTCOLOR_WHITE }}> {commentList[index].memberName}</Text>
                    </View>
                    <View style={{ height: 78 }}>
                        <Text style={{ color: COLOR.FONTCOLOR_WHITE }}> {commentList[index].body}</Text>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLOR.BACKCOLOR, }}>
                <BottomSheetModalProvider>
                    <View
                        style={styles.container}>

                        {/* <Header title='BRAGI'
            rightIconName='create-outline'
            onPressRight={onPressCreateFeed}
            leftIconName={null}
            onPressLeft={() => { }}
            key={''}
            interpolateAnim={interpolateAnim} /> */}

                        {/* content 피드 들어와야함 */}
                        <Header />

                        {feedData &&
                            (<FlatList
                                data={feedData.data}
                                renderItem={({ item, index }: any) => {

                                    return (<FeedCard data={item} index={index} />)
                                }} />)
                        }
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={1}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                            backdropComponent={renderBackdrop}
                            backgroundStyle={{ backgroundColor: COLOR.COMMENT_BACKGROUND }}
                           
                            footerComponent={() => { return (<CommentPage 
                                setCommentList={setCommentList}
                                setFeedData={setFeedData}
                               
                                index={commentIndex} />) }}
                            handleComponent={() => {
                                return (
                                    <View style={{
                                        borderBottomWidth: 0.7,
                                        borderColor: COLOR.SEPARATE_LINE,
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{ width: 40, height: 4, borderRadius: 100, marginBottom: 10, backgroundColor: COLOR.SEPARATE_LINE }} />
                                        <Text style={{ color: 'white', fontFamily: 'JalnanGothicTTF' }}>댓글</Text>
                                    </View>
                                )
                            }}
                        >
                            <BottomSheetFlatList
                                data={commentList}
                                renderItem={({ item, index }) => { return (<RnderView index={index} />) }}
                            >

                            </BottomSheetFlatList>
                        </BottomSheetModal>
                        {/* <BottomSheet
      index={1}
        ref={sheetRef}
        snapPoints={[450, 300, 0]}>
          <View
        style={{
          backgroundColor: 'white',
          padding: 16,
          height: 450,
        }}
      >
        <Text>Swipe down to close</Text>
      </View>
         </BottomSheet> */}
                    </View>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    )
}

