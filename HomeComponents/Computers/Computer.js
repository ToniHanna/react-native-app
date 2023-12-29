import { useTheme } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { Card, Text } from 'react-native-paper';
import {ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import {db} from '../../config/firebase'
import {getDocs,collection} from 'firebase/firestore'

const Computer = ({model,price,location,image,navigation}) => {
  const {colors} = useTheme()
  console.log(image)
  return(
    <TouchableOpacity style={styles.cardStyles} onPress={() => navigation.navigate('Product',{
      model: model,
      price: price,
      location: location,
      image: image
    })}>
      <Card style={{width:200,height:250,marginRight:30,backgroundColor:colors.card}}>
        <Card.Cover source={{ uri: image }} style={{height:150}}/>
        <Card.Title title={model} subtitle={`$${price}`}  titleStyle={{ color: colors.text}} subtitleStyle={{ color: colors.text }} />
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: colors.text }}>{location}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
)
}
const Computers = ({navigation,type}) => {
  const [computerList, setComputerList] = useState([])

  const computerCollectionRef = collection(db, type)  //computers is the key

  useEffect(()=> {
    const getComputerList = async () => {
      try{
      const data = await getDocs(computerCollectionRef) //await because we return a promise
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id,
      }))
      setComputerList(filteredData)
      } catch (err){
        console.error(err)
      }
    }
    getComputerList()
  },[]) //empty array so it doesn't run everytime there is a change in state
  return(
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>{computerList.map(computer=>
      <Computer 
        key={computer.model}
        model={computer.model}
        price={computer.price}
        location={computer.location}
        image={computer.image}
        navigation={navigation}
      />
      )} 
    </ScrollView>
  )
}
export default Computers;

const styles = StyleSheet.create({
    cardStyles: {
      width:200,
      height:250,
      marginHorizontal:30
    }
  })