import { useTheme } from '@react-navigation/native';
import {useState,useEffect,useCallback} from 'react';
import { Card, Text } from 'react-native-paper';
import {ScrollView,StyleSheet,RefreshControl} from 'react-native'
import {db} from './config/firebase'
import {getDocs,collection} from 'firebase/firestore'

const Ad = ({model,price,location,image}) => {
  const {colors} = useTheme()
  console.log(image)
  return(
    <ScrollView>
      <Card style={{flex:1,backgroundColor:colors.card,marginVertical:40,marginHorizontal:10}}>
        <Card.Title title={model} subtitle={`$${price}`}  titleStyle={{ color: colors.text}} subtitleStyle={{ color: colors.text }} />
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: colors.text }}>{location}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
)
}
  const AdsScreen = () => {
  const [adList, setAdList] = useState([])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAdList().then(() => {
      setRefreshing(false);
    });
  }, []);

  const AdsCollectionRef = collection(db, "itemsToSell") 

    const getAdList = async () => {
    try{
    const data = await getDocs(AdsCollectionRef) //await because we return a promise
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id:doc.id,
    }))
    setAdList(filteredData)
    } catch (err){
      console.error(err)
    }
  }
  
  useEffect(()=> {
    getAdList()
  },[]) //empty array so it doesn't run everytime there is a change in state
  const [refreshing, setRefreshing] = useState(false);
  return(
    <ScrollView showsHorizontalScrollIndicator={false}  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>{adList.map(item=>
      <Ad
        key={item.model}
        model={item.model}
        price={item.price}
        condition={item.condition}
      />
      )} 
    </ScrollView>
  )
}
export default AdsScreen;

const styles = StyleSheet.create({
    cardStyles: {
      width:200,
      height:250,
      marginRight:30
    }
  })