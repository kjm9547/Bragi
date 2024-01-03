import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { Pressable } from 'react-native'
import DocumentPicker,{  
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,} from 'react-native-document-picker' 
import SoundPlayer from 'react-native-sound-player'
export default function Mp3Picker(){
    const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null|any>()

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
  const onPress = () =>{
    console.log(result[0].name, result[0].type)
    try {
        // play the file tone.mp3
        
        // or play from url
       
            SoundPlayer.playUrl(result[0].uri)
       
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
  }
  const onPressDocumentPicker = async() =>{
        try {
          const pickerResult = await DocumentPicker.pickSingle({
            type:types.audio,
            presentationStyle: 'fullScreen',
            copyTo: 'cachesDirectory',
          })
          setResult([pickerResult])
          console.log(result)
        } catch (e) {
          handleError(e)
        }
      }
  
    return (
       <View>
        <Pressable  onPress={onPressDocumentPicker}>
            <Text style={{color:'white'}}>open</Text>
        </Pressable>
        <Pressable  onPress={onPress}>
            <Text style={{color:'white'}}>go</Text>
        </Pressable>
       </View>
    )
}