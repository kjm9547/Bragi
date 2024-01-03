import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View,Image, LayoutAnimation, FlatList } from "react-native";
import IconAnt from 'react-native-vector-icons/AntDesign'
import { COLOR } from "../../../colors/Colors";
import SoundPlayer from 'react-native-sound-player'
import { client } from "../../../services/client";
import { useSelector } from "react-redux";
import { RootReducerState } from "../../../components/redux/store/store";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
export default function UploadContent(isFocused:any) {
    const testData = [
       'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FFlying%20-%20Track%20Tribe.mp3',
       'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FGirl%20On%20Top%20-%20Amy%20Lynn%20%26%20the%20Honeymen.mp3',
       'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FIs%20This%20Really%20Happening_%20-%20TrackTribe.mp3'
       
    ]
    const {
        GET_TRACK
    } = client()
    const signedUser = useSelector((state: RootReducerState) => state.login.state);
    const [trackData,setTrackData] = useState<any>([])
   
    useEffect(()=>{
        GET_TRACK(signedUser.data.token).then((res)=>{
            
            setTrackData(res.data)
        })
        
         
           
     
    },[isFocused])
    const styles = StyleSheet.create({
        contentBox: {

        },
        contentMusicBox: {
            width: '100%',
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            height: height*0.10,

        },
        imageContainer: {
            alignSelf: "center",
            width: width * 0.5,
            height: height * 0.3,
            borderRadius: width * height * 0.4,
            marginBottom: 20
        },
        image: {
            alignSelf: "center",
            width: '100%',
            height: '100%',
            borderRadius: 125,
        },
        textBox:{
            paddingLeft:10,
            paddingRight:10,
            width:width*0.6,
            backgroundColor:COLOR.MUSIC_PLAYER_GRAY
        }
    })
    const onPressPlay = async () => {
        console.log('eeeeeeeeeeeeeeeeeeeeee')
      
       
       
      
            SoundPlayer.playUrl('content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2FIs%20This%20Really%20Happening_%20-%20TrackTribe.mp3')
           
    }
    const RenderItem = (item:any,index:any) =>{
        const [isExpanded,setIsExpanded] = useState(false)
        const [iconName,setIconName] = useState('caretdown')
        const [isPlay,setIsPlay] = useState(false)
        const interpolateAnim = useRef(new Animated.Value(0)).current
        const musicBarAnim = useRef(new Animated.Value(0)).current
        
        
        useEffect(()=>{
            console.log('indexItem',item.item.body)
            if(isExpanded){
                setIconName('caretup')
            }
            else {setIconName('caretdown')}
        },[isExpanded])
       const onPressa = () =>{
        SoundPlayer.resume()
        setIsPlay(!isPlay)
        Animated.timing(musicBarAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: false
        }).start()
       }
        const onPressPause =async () =>{
            setIsPlay(!isPlay)
            SoundPlayer.pause()
           musicBarAnim.setValue(0)
        }
        const onPressExpand = () => {
            //setSelectedMusic(false)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setIsExpanded(!isExpanded)
            Animated.timing(interpolateAnim, {
                toValue: isExpanded ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
              }).start();
          
           
        }
        return(
            <View style={{
            }}>
                <View style={{borderWidth:0.3,borderColor:COLOR.SEPARATE_LINE}}/>
                <View style={styles.contentMusicBox}>
                {isPlay?
                <Pressable onPress={onPressPause}
                style={{ marginRight: 10}}>
                <IconAnt name="pause" color='white' size={18} />
            </Pressable>:
            <Pressable onPress={onPressa}
            style={{ marginRight: 10}}>
            <IconAnt name="caretright" color='white' size={18} />
        </Pressable>
                    
                }
                    
                    <View style={{
                        backgroundColor: COLOR.PLAYER_BACKGROUND,
                        borderRadius: 20,
                        height: 11,
                        alignItems: "flex-start",
                        width: '75%'
                    }}>
                        <Animated.View
                            style={{
                                height: 11,
                                borderRadius: 20,
                                width: musicBarAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%']
                                }),
                                backgroundColor: COLOR.PLAYER_FILL
                            }}>
                        </Animated.View>
                    </View>
                    
                    <Pressable onPress={onPressExpand}
                        style={{ marginLeft: 10,}}>
                        <IconAnt name={iconName} color={COLOR.FONTCOLOR_WHITE} size={18} />
                    </Pressable>
                </View>
                
                    {isExpanded&&
                   
                    <Animated.View style={{
                    flexDirection:'row',
                    padding:20,
                    height: interpolateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, height*0.24],
                    })
                }}>
                     <View style={{
                        width:80,
                        height:80,
                        borderRadius:40,
                        marginRight:15
                    }}>
                        <Image style={{  width:80,
                        height:80,borderRadius:40,}} source={{uri:item.item.title}}/>
                    </View>
                    <View style={styles.textBox}>
                    <Text style={{color:'white',marginTop:10}}>
                        {/* 유제 네임 */}
                        {item.item.memberName}
                    </Text>
                    <Text style={{color:'white',marginTop:10}}>
                        {/* 유저 텍스트 */}
                        {item.item.body}
                        
                    </Text>
                    </View>
                    </Animated.View>
                   
                    }
                   
                    
                   <View style={{borderWidth:0.3,borderColor:COLOR.SEPARATE_LINE}}/>
                   
            </View>
        )
    }
    return (
      <FlatList
        data={trackData}
        renderItem={({item,index})=>{return(<RenderItem item={item} index={index}/>)}}
      />
    )
}