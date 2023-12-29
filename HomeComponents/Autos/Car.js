import { useTheme } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { Card, Text } from 'react-native-paper';
import {ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import {db} from '../../config/firebase'
import {getDocs,collection} from 'firebase/firestore'

const Car = ({model,price,location,image,navigation}) => {
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
const Cars = ({navigation,type}) => {
  const [carList, setCarList] = useState([])

  const carCollectionRef = collection(db, type)  //cars is the key

  useEffect(()=> {
    const getCarList = async () => {
      try{
      const data = await getDocs(carCollectionRef) //await because we return a promise
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id,
      }))
      setCarList(filteredData)
      } catch (err){
        console.error(err)
      }
    }
    getCarList()
  },[]) //empty array so it doesn't run everytime there is a change in state
  return(
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>{carList.map(car=>
      <Car 
        key={car.model}
        model={car.model}
        price={car.price}
        location={car.location}
        image={car.image}
        navigation={navigation}
      />
      )} 
    </ScrollView>
  )
}
export default Cars;

const styles = StyleSheet.create({
    cardStyles: {
      width:200,
      height:250,
      marginHorizontal:30
    }
  })