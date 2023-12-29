import {useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import {DarkTheme, useTheme } from '@react-navigation/native';
import {collection,addDoc} from 'firebase/firestore'
import {db} from './config/firebase'
export default function SellScreen({ navigation }) {
    const {colors} = useTheme()
    const [newItemModel,setNewItemModel]=useState('')
    const [newItemPrice,setNewItemPrice]=useState()
    const [newItemCondition,setNewItemCondition]=useState('')
    const itemsToSellCollectionRef = collection(db, "itemsToSell") 

    const sellItem = async () => { //all functions dealing with firebase should be async
        try{
        await addDoc(itemsToSellCollectionRef, {
            model:newItemModel,
            price:newItemPrice,
            condition:newItemCondition
        })
    } catch(err){
        console.error(err)
    }
    }
    return (
      <View style={styles.container}>
        <Text style={{color:colors.text}}>Upload tems to sell</Text>
        <TextInput  
                mode="outlined"
                label="model" 
                style={styles.input}
                textColor={colors.text}
                theme={DarkTheme}
                onChangeText={model=>setNewItemModel(model)}
            />
        <TextInput  
                mode="outlined"
                label="price" 
                style={styles.input}
                textColor={colors.text}
                theme={DarkTheme}
                onChangeText={price=>setNewItemPrice(price)}
            />
        <TextInput  
                mode="outlined"
                label="condition" 
                style={styles.input}
                textColor={colors.text}
                theme={DarkTheme}
                onChangeText={condition=>setNewItemCondition(condition)}
            />
        <Button onPress={sellItem} mode='elevated' style={styles.button}>Sell</Button>
      </View>
    );
  }
  const styles=StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    input: {
        width:200,
    },
    button: {
        margin:8,
        width:200,
        height:40,
    }
})