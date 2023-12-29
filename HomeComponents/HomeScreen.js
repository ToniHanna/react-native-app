import { Text, View, StyleSheet, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Computer from './Computers/Computer'
import Car from './Autos/Car'
export default function HomeScreen({ navigation }) {
  const { colors } = useTheme(); // Retrieve the current theme colors
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
  return (
    <ScrollView style={{border:'2px solid red',flex:1}}>
      <View style={{flex:1,alignItems: 'flex-start', flexDirection:'row',justifyContent:'space-around',marginVertical:8,paddingTop:StatusBar.currentHeight,border:'2px solid blue'}}>
        <Text style={{fontWeight:900, fontFamily:'sans-serif',fontSize:18,marginVertical:5,color:'red'}}>   dubizzle 
        </Text>
        <TouchableOpacity style={styles.headerButtons} onPress={()=>navigation.navigate('Autos')}>
          <View style={{backgroundColor: 'white', borderRadius: 20, padding: 5}}>
            <Ionicons name="car-outline" size={18} color={'red'}/>
          </View>
          <Text style={{color:colors.text,fontWeight:500,fontSize:13}}> Autos </Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.headerButtons} onPress={()=>navigation.navigate('Computers')}>
          <View style={{backgroundColor: 'white', borderRadius: 20, padding: 5}}>
            <Ionicons name="laptop-outline" size={18} color={'red'}/>
          </View>
          <Text style={{color:colors.text,fontWeight:500,fontSize:13}}> Computers </Text>
        </TouchableOpacity>
      </View>     
      <Text style={styles.title}>See our best phone deals</Text>   
      <Computer navigation={navigation} type='phones'/>
      <Text style={styles.title}>Explore our cars</Text>   
      <Car navigation={navigation} type='BMW'/>
      <Text style={styles.title}>Tablets 20% sale</Text>   
      <Computer navigation={navigation} type='tablets'/>
      <Text style={styles.title}>New reliable cars for sale!</Text>   
      <Car navigation={navigation} type='Toyota'/>
    </ScrollView>
  );
}

