import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Bookie1 from './screns/Bookie';
import Search1 from './screns/Search';

export default class Wired extends React.Component {
  render(){
    return (
      <AppContainer/>
    )
  }
}

const TabNavigator=createBottomTabNavigator({
  Transact:{screen:Bookie1},
  Search:{screen:Search1}
},
{

defaultNavigationOptions : ({navigation})=>({

  tabBarIcon : ({})=>{

      const routeName = navigation.state.routeName
      if(routeName === 'Transact'){
        return(
          <Image
            source = {require('./assets/book.png')}
            style = {{width : 40 ,height :40}}
          />
        )
      }
      else if(routeName === 'Search'){
        return(
          <Image
            source = {require('./assets/searchingbook.png')}
            style = {{width : 40 ,height :40}}
          />
        )
      }
  }
})
}

)
const AppContainer=createAppContainer(TabNavigator)