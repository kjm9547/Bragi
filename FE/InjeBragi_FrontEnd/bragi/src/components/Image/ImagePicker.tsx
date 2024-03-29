import { useState,useEffect } from "react";
import { Image, Pressable, StyleSheet, Text,Dimensions } from "react-native";
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { COLOR } from "../../colors/Colors";
import { useRootNavigation } from "../../navigations/StackNavigation";
import SignUpInput from "../SignUpInput";
import { client } from "../../services/client";
import { useDispatch, useSelector } from "react-redux";
import { setImagePath } from "../redux/action/actionLogin";
import BottomSheet from '@gorhom/bottom-sheet'
import RNFS from 'react-native-fs';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

type props = {
    canChange:boolean,
    defaultImage:string
}
export default function ImagePicker({canChange,defaultImage}:props){
    const [photo, setPhoto] = useState<string>(defaultImage)
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log('loadPhoto',photo)
    },[photo])
    const pickImage = async () => {
  
       
        await launchImageLibrary({
            mediaType: "photo"
       
        }).then((result:ImagePickerResponse|any)=>{
            if(result!=undefined){
                const localUri = result.assets[0].uri;
                const uriPath = localUri.split("//").pop();
                const imageName = localUri.split("/").pop();
                setPhoto(localUri)
                console.log('set localurl ==========',result.assets[0].type)
                console.log('set uriPath ==========',uriPath)
                console.log('set Name ==========',imageName)
                const data={
                    path:localUri,
                    name:imageName,
                    type:result.assets[0].type
                }
                console.log('data-------------',data)
                dispatch(setImagePath(data))
            }
          else{
            console.log('err')
          }

        })





    }

    const navigation = useRootNavigation();
    const onPressClear=()=>{
        navigation.navigate('Landing')
    }
    const PressableText = () => {
        return (
            <Pressable style={styles.textContainer}
                onPress={pickImage}
            >
                <Text style={{color:COLOR.FIX_FONT_BLUE,alignSelf:"center",marginTop:25}}>프로필 사진 변경</Text>
            </Pressable>
        )
    }
    const [imagePath, setIm] = useState(defaultImage);
  
    return(
        <>
        <Pressable style={styles.imageContainer}
            disabled={canChange?false:true}
            onPress={pickImage}>
                {canChange?
                    <Image 
                style={styles.image}
                source={{ uri: photo }}/>:
                <Image 
                style={styles.image}
                source={{uri:defaultImage}}/>
                }
            
            
        </Pressable>
        {canChange?
        <PressableText/>:
        <SignUpInput value="IMAGE" onPress={onPressClear} title="완료"/>
            
    }
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        alignSelf:"center",
        width:'60%',
        height:'35%',
        borderRadius:width*height*0.4,
        
        marginBottom:20
    },
    image:{
        alignSelf:"center",
        width:'90%',
        height:'100%',
        borderRadius:125,
    },
    textContainer:{
        flex:0.2,
        alignContent:"center"
    }
})