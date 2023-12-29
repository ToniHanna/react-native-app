import {Text,Button,View,StyleSheet,ScrollView,TouchableOpacity,StatusBar} from 'react-native'
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Computer from './Computer'
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
      <Text style={styles.title}>Phones</Text>   
      <Computer navigation={navigation} type='phones'/>
      <Text style={styles.title}>Laptops</Text>   
      <Computer navigation={navigation} type='lapotps'/>
      <Text style={styles.title}>Tablets</Text>   
      <Computer navigation={navigation} type='tablets'/>
    </ScrollView>
  )
}