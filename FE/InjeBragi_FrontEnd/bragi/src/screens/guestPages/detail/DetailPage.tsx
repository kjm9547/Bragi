import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import Header from '../../../components/Header/Header'
import { COLOR } from '../../../colors/Colors'
import { useSelector } from 'react-redux'
import { RootReducerState } from '../../../components/redux/store/store'
import { useRootNavigation } from '../../../navigations/StackNavigation'
import { client } from '../../../services/client'
import { FlatListComponent } from 'react-native'
import { useIsFocused } from '@react-navigation/native'



export default function DetailPage() {
    const signedUser = useSelector((state: RootReducerState) => state.login.state)
    const [imageUrl,setImageUrl] = useState<string>('')
    const navigation = useRootNavigation()
   const {GET_IMAGE,GET_FEED_LIST} = client()
    const path = signedUser.data.url.split('profileImages')
    const [myFeed,setMyFeed] = useState<any>(null)
    const [cnt,setCnt] = useState(0)
    const isFocusing = useIsFocused()
    useEffect(()=>{
        const feed:any[] = []
        GET_FEED_LIST(signedUser.data.token).then((res:any)=>{
            console.log(res.data)
            res.data.map(function(element:any){
                if(element.memberName==signedUser.data.name) {
                    feed.push(element)
                }
                
            })
            
            setMyFeed(feed)
            setCnt(feed.length)
        })
        console.log()
        setImageUrl(`http://10.0.2.2:8080/image/images/profileImages${path[1]}`)
        
    },[isFocusing])
 
    const UserInfoHeader = () => {
        return (
            <View style={styles.userInfoHeaderContaner}>
                <View style={styles.imageContainer}>
                    <Image style={styles.userImage} 
                        source={{uri:imageUrl}}/>
                    
                </View>
                <View style={styles.borderW}>
                    <Text style={styles.infoText}>{cnt}</Text>
                    <Text style={styles.infoText}>게시물</Text>
                </View>
                
            </View>
        )
    }
    const SettingUserButton = () =>{
        return(
            <Pressable style={styles.button}
                onPress={onPressProfileSetting}
            >
            <Text style={styles.fontColor}>프로필 편집</Text>
        </Pressable>
        )
    } 
    const onPressOption = () =>{
        navigation.navigate('OptionPage')
    }
    const onPressProfileSetting = () =>{
        navigation.navigate('UserFix')
    }
    const UserFeeds = ()=>{
        /*데이터 베이스를 통해 가져온 피드 사진 보여주기 */
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingTop:20}}>
                {cnt==0?
                
                <Text style={styles.fontColor}>게시물 없음</Text>:
                <FlatList
                    style={{width:'100%'}}
                    data={myFeed}
                    numColumns={3}
                    renderItem={({item,index})=>{
                        console.log('flatItem',item.musicUrl)
                        return(
                            
                                <View style={{width:120,height:120,marginRight:5}}>
                                    <Image style={{width:120,height:120}} source={{uri:item.image}}/>
                                </View>
                        )
                    }}  
                />
            }
            </View>
        )
    }
   
    return (
        <View style={styles.container}>
            <Header  leftIconName={null} rightIconName='list' title={signedUser.data.name} onPressRight={onPressOption} onPressLeft={()=>{}}/>
            <UserInfoHeader />
            <SettingUserButton/>
            <UserFeeds/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKCOLOR,
        padding: 20
    },
    userInfoHeaderContaner: {
        flex: 0.2,
        flexDirection: 'row',

    },
    imageContainer: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImage: {
        flex:1,
        width: 75,
        height: 75,
        backgroundColor: COLOR.INPUTBOX_GRAY,
        borderRadius: 75 * 0.5,
    
    },
    borderW: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        color: COLOR.FONTCOLOR_WHITE,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    button:{
        marginLeft:5,
        marginTop:15,
        backgroundColor:COLOR.SEPARATE_LINE,
        alignItems:"center",
        justifyContent:"center",
        width:"50%",
        height:30,
        borderRadius:10,
    },
    fontColor:{
        //fontWeight:"bold",
        fontSize:15,
        color:COLOR.FONTCOLOR_WHITE
    }
})