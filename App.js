import * as React from 'react';
import { Text, View,Button, StyleSheet } from 'react-native';
import HomeScreen from "./screens/HomeScreen"
import ListScreen from "./screens/ListScreen"
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack"
import { Transition } from 'react-native-reanimated';
export default function App() {
  return (
    <AppContainer/>
  );
}


export const AppStackNavigator = createStackNavigator({
  HomeScreen : {
    screen :HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  List: {
    screen :ListScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'HomeScreen'
  }
);

const AppContainer =  createAppContainer(AppStackNavigator);