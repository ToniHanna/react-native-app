import {useState} from 'react'
import {Text,ScrollView,View,TouchableOpacity,StatusBar,ImageBackground,StyleSheet,Linking} from 'react-native'
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SMS from 'expo-sms';
export default function SingleProductScreen({route:{params},navigation}){
    const {model,location,image,price} = params
    const {colors} = useTheme()
 
    const sendMessage = async () => {
        const {status} = await SMS.sendSMSAsync(
           [ '+96176057807'],
            `${model}`,
        )
    }
    
   
    return(
        <ScrollView>
            <View style={{height:800}}>
                <ImageBackground source={{uri:image}} style={{height:300,resizeMode:'stretch'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingTop:StatusBar.currentHeight}}>
                    <Ionicons  name="chevron-back-outline" size= {40} color={'black'}/>
                </TouchableOpacity>
                </ImageBackground>
                <View style={{flex:1}}>
                    <Text style={{color:colors.text,
                                fontSize:30,
                                margin:4,
                                fontFamily:'sans-serif',
                                fontWeight:600,}}>{model}</Text>
                    <Text style={{color:colors.text,
                                fontSize:30,
                                margin:4,
                                fontFamily:'sans-serif',
                                fontWeight:600,}}>{`USD ${price}`}</Text>
                    <Text style={{color:colors.text,
                                fontSize:30,
                                margin:4,
                                fontFamily:'sans-serif',
                                fontWeight:600,}}>Description</Text>
                    <Text style={{color:colors.text,fontFamily:'sans-serif',margin:4}}>
                    It has reliable reception, a bright screen, solid cameras, and good battery life. None of this is surprising; Samsung's Galaxy phones are the default choices for most Android users in the US, and certainly for existing Samsung device owners who want to upgrade. this phone is the middle child of the phone lineup—it doesn't have an S Pen like the Galaxy phone , and isn't as compact as the phone. In other years, that could make it forgettable, but this time around this phone strikes the best balance between performance, value, and portability of the three. At the high end of the Android phone market in the US, this phone competes only with the $899 Google Pixel 6 Pro. Google's flagship is more affordable and has better cameras, but this phone offers a stronger processor and cellular radio, earning it our Editors' Choice award.
                    </Text>
                    <Button icon="message" mode="outlined" textColor='blue' onPress={sendMessage} style={styles.button}>
                        SMS
                    </Button>
                    <Button icon="phone" mode="outlined" textColor='green' onPress={()=>Linking.openURL('tel:+96176057807')} style={styles.button}>
                        Call
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius:0,
        margin:2,
        width:200,
        height:40,
        alignSelf:'center'
    }
})