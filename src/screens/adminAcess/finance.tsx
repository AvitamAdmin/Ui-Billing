import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const FinanceScreen = () => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          // flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: 20,
          backgroundColor: '#f2f2f2',
          height: '100%',
          borderRadius: 10,
          padding: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            width:"100%",

          }}>
          <View style={{width:"50%",flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',gap:10}}>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>
              Incoming Cash
            </Text>
            <Image
              source={require('../../../assets/images/IncomingCash.png')}
              style={{height: 40, width: 40}}
            />
          </View>
          <View style={{ flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',}}>
            <Text style={{color: '#000'}}>₹ 10000</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            width:"100%",

          }}>
          <View style={{width:"50%",flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',gap:10}}>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>
            Outgoing Cash
            </Text>
            <Image source={require('../../../assets/images/OutgoingCash.png')}style={{height:40,width:40}}/>

          </View>
          <View style={{ flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',}}>
            <Text style={{color: '#000'}}>₹ 10000</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            width:"100%",

          }}>
          <View style={{width:"50%",flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',gap:10}}>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>
            Borrowing Cash
            </Text>
            <Image source={require('../../../assets/images/BorrowingCash.png')} style={{height:40,width:40}}/>

          </View>
          <View style={{ flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',}}>
            <Text style={{color: '#000'}}>₹ 10000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FinanceScreen;

const styles = StyleSheet.create({});
