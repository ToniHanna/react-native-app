import {useState,useEffect} from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer, DarkTheme, useTheme } from '@react-navigation/native';
import {TextInput} from 'react-native-paper'
export default function LBP({ navigation }) {
    fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=28fb36349e1a47b39654cf747a9a4b7e").then((result)=>{
      const myData = result.json()
      return myData
    }).then(currency=>{
      const LBP = amount * currency.rates['LBP']
      setResult(LBP.toFixed(2))
    })
    const [amount,setAmount] = useState()
    const [result,setResult] = useState()
    console.log(amount)
    const {colors} = useTheme()
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:25,
                      color:colors.text,
                      margin:8,
                      fontFamily:'sans-serif',
                      fontWeight:600,}}>Live Currency Converter</Text>
        <TextInput  
                  theme={DarkTheme}
                  mode="outlined"
                  label="USD amount"
                  style={{width:200,height:40}}
                  textColor={colors.text}
                  onChangeText={(amount)=>setAmount(amount)}
                  
              />
              <Text style={{ color: colors.text, marginVertical: 20 }}>
                {amount && !isNaN(amount) ? `the amount in LBP is ${result}` : ''}
              </Text>
      </View>
    );
  }