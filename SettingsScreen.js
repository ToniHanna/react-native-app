import React from 'react';
import {useState,useEffect} from 'react'
import { View,Text,StatusBar} from 'react-native';
import { Button} from 'react-native-paper';
import {useTheme } from '@react-navigation/native';
import {signOut } from 'firebase/auth'
import {auth} from './config/firebase'
import * as Battery from 'expo-battery';
import * as Device from 'expo-device';
export default function SettingsScreen() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryState, setBatteryState] = useState(null);

  useEffect(() => {
    (async () => {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      const batteryState = await Battery.getBatteryStateAsync();
      setBatteryLevel(batteryLevel);
      setBatteryState(batteryState);
      if (batteryLevel < 0.1) {
        BackHandler.exitApp(); // This will close the app
      }
    })();
  }, []);

  const logOut = async () => {
    try{
        await signOut(auth)
    } catch(err){
        console.error(err);
    }
}
  const { colors } = useTheme();
  return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
      <Text style={{color:colors.text,margin:30,textAlign:'center',fontWeight:500,fontSize:20}}>{`you're device model is ${Device.modelName}, however there is always new versions check them out!`}</Text>
      <Text style={{color:colors.text}}>Battery Level: {batteryLevel ? (batteryLevel * 100).toFixed(2) : 'unknown'}%</Text>
      <Text style={{color:colors.text}} >Battery State: {batteryState ? (batteryState === Battery.BatteryState.CHARGING ? 'Charging' : 'Not Charging') : 'unknown'}</Text>
      <Button onPress={logOut} mode='elevated' style={{margin:100}}>logout</Button>
    </View>
  );
}
