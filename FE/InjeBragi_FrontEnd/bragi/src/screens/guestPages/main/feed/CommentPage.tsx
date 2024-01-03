
import React,{useMemo,useCallback,useRef,useState, useEffect} from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Text,View,TextInput,Image,Pressable,KeyboardAvoidingView,FlatList,Dimensions } from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { BottomSheetProvider } from '@gorhom/bottom-sheet/lib/typescript/contexts';
import { COLOR } from '../../../../colors/Colors';
import { useSelector } from 'react-redux';
import { RootReducerState } from '../../../../components/redux/store/store';
import { client } from '../../../../services/client';
const height = Dimensions.get("screen").height

type props = {
    
    index:any,
    setCommentList:React.Dispatch<any>
    setFeedData: React.Dispatch<any>
    
    
}
export default  function CommentPage({
    index,
    setCommentList,
    setFeedData
}:props){
    const {
        GET_FEED_LIST,
        
        POST_WRITE_COMMENT
    } = client()
    const [text,setText] = useState('')
    const signedUser = useSelector((state: RootReducerState) => state.login.state)
    const [imageUrl,setImageUrl] = useState<string>('')
    useEffect(()=>{
        const path = signedUser.data.url.split('profileImages')
        setImageUrl(`http://10.0.2.2:8080/image/images/profileImages${path[1]}`)
        
      },[])
      
    const onPressPosting=() => {
        setText('')
        const postData = {
            body:text,
            memberProfileUrl:imageUrl
        }
        
        POST_WRITE_COMMENT(
            index,
            signedUser.data.token,
            postData
            ).then((res:any)=>{
                GET_FEED_LIST(signedUser.data.token).then((res:any) => {
                    setCommentList(res.data[0].commentList)
                    console.log('xxxxxxxxxxxxxxxxxxxxxxx', res.data[0].commentList[0])
                    setFeedData(res)
                })
            })
    }
   console.log(index)
    //signedUser.data.url
    return(
        <View style={{height:85}}>
            {/* 헤더뷰 */}
            {/* 
            */}
        <KeyboardAvoidingView style={{
           position:'absolute',
            flexDirection:'row',
            width:"100%",
            borderTopWidth:0.7,
            borderColor:COLOR.SEPARATE_LINE,
            height:75,
            flex:0.1,
            bottom:10
            }}>
                <View style={{width:"18%",
                alignItems:'center',
                justifyContent:'center',
                }}>
                <Image 
                style={{height:50,width:50,borderRadius:25}}
            source={{uri:
                imageUrl
            }}/>
                </View>
            <View
             style={{width:"70%",justifyContent:'center',marginRight:10}}>
            <TextInput
            style={{borderWidth:0.7,
                borderColor:COLOR.
                SEPARATE_LINE,
                borderRadius:20,
                height:50,
                paddingLeft:10,
                color:COLOR.FONTCOLOR_WHITE
            }}
                value={text}
                onChangeText={(value)=>{setText(value)}}
                placeholder='답글 달기'
                placeholderTextColor={COLOR.SEPARATE_LINE}
            />
            </View>
           
            <Pressable style={{width:"9%",justifyContent:'center'}}
                onPress={onPressPosting}
            >
            <Text style={{color:COLOR.FIX_FONT_BLUE}}>게시</Text>
            </Pressable>
        </KeyboardAvoidingView>
        </View>       
    )

}