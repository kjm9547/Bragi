
import { View,Text, StyleSheet, Alert } from "react-native";
import Header from "../../../components/Header/Header";
import { COLOR } from "../../../colors/Colors";
import { useRootNavigation } from "../../../navigations/StackNavigation";
import { TouchableOpacity } from "react-native";

export default function OptionPage(){
    const navigation = useRootNavigation()
    return(
        <View style={styles.container}>
 <Header leftIconName={'chevron-back'} onPressLeft={()=>{navigation.pop()}} onPressRight={()=>{}} rightIconName={null} title="계정"/>
 
 <TouchableOpacity
 onPress={()=>{
    Alert.alert('logout?','로그아웃 하시겠습니까?',[
        {text:'예',onPress:()=>{navigation.navigate('Landing')}},
        {text:'아니오',onPress:()=>{},style:'cancel'}
    ])
 }} 
 style={{borderTopWidth:0.3,
    borderBottomWidth:0.3,
    borderColor:COLOR.PLACEHOLDER_WHITE,height:75,
    justifyContent:"center"}}>
        <Text style={{color:'white',}}>로그아웃</Text>
 </TouchableOpacity>
        </View>
       
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLOR.BACKCOLOR,
        padding:10
    },
})