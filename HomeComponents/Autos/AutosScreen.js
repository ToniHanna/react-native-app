import {Text,Button,View,StyleSheet,ScrollView,TouchableOpacity,StatusBar} from 'react-native'
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Car from './Car'
export default function AutosScreen({navigation}){
   const {colors} = useTheme();
   const styles=StyleSheet.create({
    headerButtons: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    title: {
      fontSize:30,
      color:colors.text,
      marginHorizontal:30,
      marginVertical:25,
    }
  })
  return(
    <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingTop:StatusBar.currentHeight}}>
            <Ionicons  name="chevron-back-outline" size= {40} color={colors.text}/>
        </TouchableOpacity>
      <Text style={styles.title}>BMW</Text>   
      <Car navigation={navigation} type='BMW'/>
      <Text style={styles.title}>Honda</Text>   
      <Car navigation={navigation} type='Honda'/>
      <Text style={styles.title}>Toyota</Text>   
      <Car navigation={navigation} type='Toyota'/>
    </ScrollView>
  )
}