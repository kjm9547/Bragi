import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
import { COLOR } from '../../../colors/Colors'
import Header from '../../../components/Header/Header'
import Mp3Picker from './Mp3Picker'
import SoundPlayer from './SoundPlayerView'
import SoundPlayerView from './SoundPlayerView'
import { useRootNavigation } from '../../../navigations/StackNavigation'
import UploadContent from './UploadContent'
import { useIsFocused } from '@react-navigation/native'
export default function UploadPage(){
    const navigation = useRootNavigation()
    const isFocused  = useIsFocused()
    const onPressUpload = () => {
        console.log('?')
        navigation.navigate('MusicUploadPage')
    }
    return(
        <View style={styles.container}>
            <View style={{padding:20,marginBottom:-20}}>
            <Header 
            leftIconName={''}
            onPressLeft={()=>{}}
            onPressRight={onPressUpload}
            rightIconName={'cloud-upload-outline'}
            title='BRAGI'/>
            </View>
            
            <UploadContent isFocused={isFocused}/>
            
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLOR.BACKCOLOR,
      
    }
})