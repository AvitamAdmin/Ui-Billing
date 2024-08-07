import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';

const StatementHistory = () => {
    const navigation = useNavigation();
  return (
    <View
      style={{
        width: wp('100%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <View
        style={{
          width: wp('90%'),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap:10
        }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width:"100%",
        //   backgroundColor:"#f5f"
        }}>
          <Pressable onPress={()=>{
            navigation.goBack();
          }} style={{justifyContent: 'flex-start',
          alignItems: 'flex-start',}}>
            <CustomIcon
              color="#000"
              size={26}
              name="arrowleft"
              type="AntDesign"
            />
          </Pressable>
          <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width:"100%",
        //   backgroundColor:"#f5f"
        }}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: hp(2.5),
              paddingBottom: 40,
            }}>
            STATEMENT
          </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: wp('95%'),
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 10,
            elevation: 5,
          }}>
          <View
            style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>29-07-2024</Text>
            <FontAwesome6 name="coins" size={24} color="black" />
          </View>
          <View
            style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
            <Text></Text>

            <Text style={{color: '#000', fontWeight: 'bold'}}>Varsini</Text>
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>₹ 280.00</Text>
              <Feather name="arrow-down-left" size={24} color="green" />
            </View>
            <View style={{flexDirection: 'column', gap: 5}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                ₹ 40,000.00
              </Text>
              <Text style={{color: 'grey'}}>Balance</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: wp('95%'),
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 10,
            backgroundColor: '#fff',
            padding: 10,
            elevation: 5,
          }}>
          <View
            style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>29-07-2024</Text>
            <FontAwesome6 name="coins" size={24} color="black" />
          </View>
          <View
            style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
            <Text></Text>

            <Text style={{color: '#000', fontWeight: 'bold'}}>Varsini</Text>
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                ₹ - 280.00
              </Text>
              <Feather name="arrow-up-right" size={24} color="red" />
            </View>
            <View style={{flexDirection: 'column', gap: 5}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                ₹ 40,000.00
              </Text>
              <Text style={{color: 'grey'}}>Balance</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatementHistory;

const styles = StyleSheet.create({});
