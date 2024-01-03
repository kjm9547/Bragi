import { View,TextInput, Keyboard } from "react-native";
import Header from "../../../components/Header/Header";
import { COLOR } from "../../../colors/Colors";
import { useRootNavigation } from "../../../navigations/StackNavigation";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Text,Animated } from "react-native";
import DocumentPicker,{  
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,} from 'react-native-document-picker' 
import SoundPlayer from 'react-native-sound-player'
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import ImagePicker from "../../../components/Image/ImagePicker";
import { ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";
import { TouchableWithoutFeedback } from "react-native";
import { client } from "../../../services/client";
import { RootReducerState } from "../../../components/redux/store/store";
import { useSelector } from "react-redux";
import { ExternalStorageDirectoryPath } from "react-native-fs";
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default function MusicUploadPage(){
    const naviagtion = useRootNavigation()
    const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null|any>()
    const [selectedMusic,setSelectedMusic] = useState(false)
    const [contentText,setContentText] = useState('') 
    const [photo, setPhoto] = useState<string>('data:image/jpeg;base64,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')
    const [isPlayed,setIsPlayed] = useState(false)
    const signedUser = useSelector((state: RootReducerState) => state.login.state)
    
    const{
        POST_TRACKS
    } = client()
    const interpolateAnim = useRef(new Animated.Value(0)).current
    
    const [imageUrl,setImageUrl] = useState<string>('')
    useEffect(()=>{
        const path = signedUser.data.url.split('profileImages')
        setImageUrl(`http://10.0.2.2:8080/image/images/profileImages${path[1]}`)
       
      },[signedUser])

    const onPressLeft = () => {
        SoundPlayer.pause()
        naviagtion.pop()
    }
    const onPressRight = () => {
        //
        POST_TRACKS(
            result,
            signedUser.data.token,
            contentText,
            imageUrl
            ).then(()=>{
                naviagtion.pop()
            })
            
    }
    const handleError = (err: unknown) => {
        //파일 선택시 오류 로그
        if (isCancel(err)) {
          console.warn('cancelled')
          // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
          console.warn('multiple pickers were opened, only the last will be considered')
        } else {
          throw err
        }
      }
    const onPressDocumentPicker = async() =>{
        try {
          await DocumentPicker.pickSingle({
            type:types.audio,
            presentationStyle: 'fullScreen',
            copyTo: 'cachesDirectory',
          }).then((res)=>{
            setResult([res])
            setSelectedMusic(true)
            console.log(res)
          })
       
         
          
        } catch (e) {
          handleError(e)
        }
      }
    const UploadImage = () => {
        const pickImage = async () => {
            console.log('open photo ==========', photo)
            await launchImageLibrary({
                mediaType: "photo",
            }).then((result:ImagePickerResponse|any)=>{
                if(result!=undefined){
                    const localUri = result.assets[0].uri;
                    setPhoto(localUri)
                }
              else{
                console.log('err')
              }})}
        return(
            <Pressable style={styles.imageContainer}
            onPress={()=>{pickImage()}}>
            <Image 
                style={styles.image}
                source={{uri:imageUrl}}/>
            
        </Pressable>
        )
    }
    const Contetnt = () =>{
        return(
            <>
            <Pressable style={styles.contentBox} onPress={onPressDocumentPicker} >
            <Icon name="document-attach-outline" size={32} color="white"/>
            <Text style={{color:'white',bottom:-40}}>클릭하여 파일을 추가해주세요</Text>
            </Pressable>
            
            </>
        )
        
    }
    const onPressPlay =async () =>{
        console.log('resultssssssssssss',result[0].uri)
        setIsPlayed(!isPlayed)
        const info = await SoundPlayer.getInfo()
        
        
        SoundPlayer.playUrl(result[0].uri)
          
       
        
       
      console.log('getInfo', info)
        Animated.timing(interpolateAnim,{
            toValue:1,
            duration:info.duration*1000,
            useNativeDriver:false
        }).start()
        SoundPlayer.onFinishedPlaying(()=>{
            setIsPlayed(false)
            SoundPlayer.stop()
            interpolateAnim.setValue(0)
        })
    }
    const onPressStop = () =>{
        setIsPlayed(!isPlayed)
        SoundPlayer.pause()
    }
    const onPressDelete = () =>{
        setIsPlayed(false)
        setSelectedMusic(false)
        SoundPlayer.pause()
        interpolateAnim.setValue(0)
    }
    const MusicContent = () => {
        
        return(
            <>
            <View style={{alignSelf:"center",marginTop:30}}>
            
            <UploadImage/>
            </View>
            <View style={styles.contentMusicBox}>
                {isPlayed?
                <Pressable onPress={onPressStop}
                style={{marginRight:10}}>
            <IconAnt name="pause" color='white' size={18}/>
        </Pressable>:
        <Pressable onPress={onPressPlay}
        style={{marginRight:10}}>
    <IconAnt name="caretright" color='white' size={18}/>
</Pressable>
            }
                
           
            <View style={{
                backgroundColor:COLOR.PLAYER_BACKGROUND,
                borderRadius:20,
                height:11,
                alignItems:"flex-start",
                width:'75%'
                }}>
            <Animated.View
                style={{
                    height:11,
                    borderRadius:20,
                    width: interpolateAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:['0%','100%']}),
                    backgroundColor:COLOR.PLAYER_FILL
                }}>
            </Animated.View>
            </View>
            <Pressable onPress={onPressDelete}
                    style={{marginRight:10}}>
                <IconAnt name="close" color={COLOR.ERROR_RED} size={18}/>
            </Pressable>
            </View>
            </>
        )
    }

    const styles = StyleSheet.create({
        contentBox:{
            borderWidth:1,
            borderColor:'white',
            width:'50%',
            alignSelf:"center",
            alignItems:"center",
            justifyContent:"center",
            height: height*0.4,
            borderStyle:'dashed',
            marginBottom:30,
        },
        contentMusicBox:{
            width:'100%',
            flexDirection:"row",
            alignSelf:"center",
            alignItems:"center",
            justifyContent:"center",
            height:'20%',
            
        },
        imageContainer:{
            alignSelf:"center",
            width:width*0.5,
            height:height*0.3,
            borderRadius:width*height*0.4,
            marginBottom:20
        },
        image:{
            alignSelf:"center",
            width:'100%',
            height:'100%',
            borderRadius:125,
        },
    })
    const [onFocusInput,setOnFocusInput] = useState(true)
    return(
        <View style={{flex:1,backgroundColor:COLOR.BACKCOLOR,padding:20}}>
            <Header
                leftIconName={'chevron-back-sharp'}
                onPressLeft={onPressLeft}
                onPressRight={onPressRight}
                rightIconName={'공유'}
                title="업로드"
            />
            {onFocusInput?
             !selectedMusic?
              <Contetnt/>:<MusicContent/>:null}
            <View style={{borderWidth:0.4,borderColor:COLOR.SEPARATE_LINE}}/>
            <TouchableWithoutFeedback style={{marginTop:30}} onPress={Keyboard.dismiss}>
                <View style={{flex:1}}>
                <Text style={{color:'white',marginTop:5}}>
                    간단한 소개를 작성해주세요
                </Text>
                <TextInput
                
                    placeholder="문구를 입력해주세요..."
                    value={contentText}
                    onChangeText={(value)=>{setContentText(value)}}
                    placeholderTextColor={COLOR.PLACEHOLDER_WHITE}
                    style={{color:COLOR.FONTCOLOR_WHITE}}
                    onFocus={()=>{setOnFocusInput(false)}}
                    onEndEditing={()=>{setOnFocusInput(true)}}
                    numberOfLines ={5}
                    multiline={true}
                    onSubmitEditing={()=>{Keyboard.dismiss}}
                    />
                </View>
                
            </TouchableWithoutFeedback>
            
        </View>
    )
}
