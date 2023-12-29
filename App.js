import {useState,useEffect} from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer, DarkTheme,LightTheme, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import AutosScreen from './HomeComponents/Autos/AutosScreen'
import ComputersScreen from './HomeComponents/Computers/ComputersScreen'
import HomeScreen from './HomeComponents/HomeScreen'
import SingleProductScreen from './HomeComponents/SingleProductScreen';
import {Auth} from "./auth components/auth"
import {auth} from './config/firebase'
import SellScreen from './SellScreen'
import AdsScreen from './AdsScreen'
import SettingsScreen from './SettingsScreen'
import CurrencyScreen from'./CurrencyComponents/CurrencyScreen'

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Autos" component={AutosScreen} />
      <HomeStack.Screen name="Computers" component={ComputersScreen} />
      <HomeStack.Screen name="Product" component={SingleProductScreen} />
    </HomeStack.Navigator>
  );
}
const CurrencyStack = createNativeStackNavigator();
function CurrencyStackScreen(){
  return (
      <CurrencyStack.Navigator screenOptions={{ headerShown: false }}>
        <CurrencyStack.Screen 
          name="Currency" 
          component={CurrencyScreen} 
        />
      </CurrencyStack.Navigator>
  )
}
const SellStack = createNativeStackNavigator();
function SellStackScreen() {
  return (
    <SellStack.Navigator screenOptions={{ headerShown: false }}>
      <SellStack.Screen
        name="Sell"
        component={SellScreen}
      />
    </SellStack.Navigator>
  )
}
const AdsStack = createNativeStackNavigator();
function AdsStackScreen() {
  return (
    <AdsStack.Navigator screenOptions={{ headerShown: false }}>
      <AdsStack.Screen name="Ads" component={AdsScreen} />

    </AdsStack.Navigator>
  );
}
const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }} >
      <SettingsStack.Screen name="Setting" component={SettingsScreen}/>
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [userAuthentication,setUserAuthentication] = useState(false)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null) {
        setUserAuthentication(false);
      } else {
        setUserAuthentication(true);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once
    const [theme,setTheme] = useState(DarkTheme)
    function toggleTheme(){
      if(theme==='DarkMode')
          setTheme(LighTheme)
      else
          setTheme(DarkTheme)
  }
    if(!userAuthentication)
      return <Auth />
    else{
      return (
        <NavigationContainer theme={theme} style={{color:'white'}}>
          <Tab.Navigator 
            screenOptions={({ route }) => ({  
              headerShown:false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
  
                if (route.name === 'Home') {
                  iconName = focused ? 'ios-home' : 'ios-home-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                } else if (route.name === 'Sell') {
                  iconName = focused ? 'add-circle' : 'add-circle-outline'
                  color = 'red'
                } else if (route.name === 'Currency') {
                  iconName = focused ? 'cash' : 'cash-outline'
                } else if (route.name === 'Ads') {
                  iconName = focused ? 'albums' : 'albums-outline'
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
              tabBarLabelStyle: {
                fontSize:11,
                fontWeight:600,
                padding:4,
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Currency" component={CurrencyStackScreen} />
            <Tab.Screen name="Sell" component={SellStackScreen} />
            <Tab.Screen name="Ads" component={AdsStackScreen} />
            <Tab.Screen name="Settings" component={SettingsStackScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
    );
    }
}
