import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TopHeader } from '../../components/commonComponents';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllInvoice from './allInvoice';
import PaidInvoice from './paidInvoice';
import UnPaidInvoice from './unPaidInvoice';

const Tab = createMaterialTopTabNavigator();

const InvoiceScreen = () => {

  function tab() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold',
              textTransform: 'capitalize',
              color: focused ? '#fff' : 'gray',
              backgroundColor: focused ? '#3385ff' : 'white',
              padding: 10,
              borderRadius: 5,
              paddingLeft:10,
              paddingRight:10
            }}>
              {route.name}
            </Text>
          ),
          tabBarActiveTintColor: '#f5f', // Active tab color
          tabBarInactiveTintColor: '196', // Inactive tab color
          tabBarIndicatorStyle: {
            backgroundColor: '#fff', // Active tab indicator color
          },
          tabBarStyle: {
            backgroundColor: 'white', // Background color of the tab bar
          },
        })}
        
      >
        <Tab.Screen  name="All Invoice" component={AllInvoice} />
        <Tab.Screen name="Paid Invoice" component={PaidInvoice} />
        <Tab.Screen name="UnPaid Invoice" component={UnPaidInvoice} />
      </Tab.Navigator>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TopHeader headerText={'Invoice'} searchIcon={true} searchText={'Search Invoice'} />
      {tab()}
    </View>
  );
}

export default InvoiceScreen;

const styles = StyleSheet.create({});
