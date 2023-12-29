import { NavigationContainer, DarkTheme, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LBP from './LBP'
import SAR from './SAR'
import CAD from './CAD'
import GBP from './GBP'
import JPY from './JPY'
import CNY from './CNY'
import RUB from './RUB'
import QAR from './QAR'

import {EUROC} from './EUROC.js'

const Drawer = createDrawerNavigator();
export default function CurrencyScreen() {
    return (
      <NavigationContainer independent={true} theme={DarkTheme} >
        <Drawer.Navigator initialRouteName="LBP">
            <Drawer.Screen name="LBP" component={LBP} />
            <Drawer.Screen name="EUROC" component={EUROC} />
            <Drawer.Screen name="SAR" component={SAR} />
            <Drawer.Screen name="CAD" component={CAD} />
            <Drawer.Screen name="GBP" component={GBP} />
            <Drawer.Screen name="JPY" component={JPY} />
            <Drawer.Screen name="CNY" component={CNY} />
            <Drawer.Screen name="RUB" component={RUB} />
            <Drawer.Screen name="QAR" component={QAR} />
      </Drawer.Navigator>
      </NavigationContainer>
    );
  }