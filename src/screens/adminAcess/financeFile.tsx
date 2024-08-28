import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';

import FinanceScreen from './AddExpence';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StockUpdate from './stockupdate';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AddExpence from './AddExpence';
import AddIncome from './AddIncome';
import {screenName} from '../../utils/screenNames';

const FinanceFile = () => {
  const navigation = useNavigation();

  function tab() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: focused ? '#000' : '#999999',
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {route.name}
            </Text>
          ),
        })}>
        <Tab.Screen name="Add Expense" component={AddExpence} />
        <Tab.Screen name="Add Income" component={AddIncome} />
      </Tab.Navigator>
    );
  }

  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#743BFF',
          height: '6%',
          padding: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
      </View>
      {tab()}
      <View style={{padding: 10}}>
        <Pressable
          onPress={() => {
            navigation.navigate(screenName.History as never);
          }}
          style={{
            width: '100%',
            backgroundColor: '#8F62FF',
            padding: 5,
            justifyContent: 'center',
            bottom: 0,
            flexDirection: 'column',
            borderRadius: 8,
          }}>
          <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>
            View History
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FinanceFile;

const styles = StyleSheet.create({});
