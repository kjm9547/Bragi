import { Dimensions, StyleSheet, View } from "react-native";
import Mp3Picker from "./Mp3Picker";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function SoundPlayerView(){
    return(
        <View style={styles.soundContainer}>
            <Mp3Picker/>
        </View>
    )
}
const styles = StyleSheet.create({
    soundContainer:{
        borderWidth:1,
        borderColor:'white',
        height:height/9
    }
})