import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../utils/icons';
import { api } from '../../../envfile/api';

type History = {
  holderName: string;
  userAccountHolder: string;
  expenceDetails: string;
  expenceAmount: number;
  paymentMethod: string;
  creatore: string;
  creationTime: Date;
  lastModified: Date;
  afterAmount: number;
};

const Incomehistory = () => {
  const navigation = useNavigation();  // Correctly initializing navigation
  const [incomeHistory, setIncomeHistory] = useState<History[]>([]);  // Corrected to array type

  useEffect(() => {
    fetchInvoices();
  }, []);
  
  const fetchInvoices = async () => {
    try {
      const response = await axios.get(api + '/api/addincome/getincomehistory');
      setIncomeHistory(response.data.data);
      console.log(response.data.data, "Fetched Invoices");
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

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
          gap: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: "100%",
          }}>
          <Pressable onPress={() => {
            navigation.goBack();
          }} style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <CustomIcon
              color="#000"
              size={26}
              name="arrowleft"
              type="AntDesign"
            />
          </Pressable>
        </View>
        {incomeHistory.length > 0 ? (
          <View style={{ gap: 10 }}>
            {incomeHistory.map((item, id) => (
              <View
                key={id}
                style={{
                  flexDirection: 'row',
                  width: wp('95%'),
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  padding: 10,
                  elevation: 5,
                }}>
                <View
                  style={{ flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                  <Text style={{ color: '#000', fontWeight: 'bold' }}>{new Date(item.creationTime).toLocaleDateString()}</Text>
                  <Text style={{ color: '#000', fontWeight: 'bold' }}>From {item.userAccountHolder}  </Text>

<Text style={{ color: '#000', fontWeight: 'bold' }}>To {item.holderName}  </Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                  <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
                    <Text style={{ color: 'grey' }}>Received</Text>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>₹ {item.expenceAmount}</Text>
                        <Feather name="arrow-down-left" size={24} color="green" />
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ color: 'grey' }}>Balance</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                      ₹ {item.afterAmount}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>No income history available.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default Incomehistory;

const styles = StyleSheet.create({});
