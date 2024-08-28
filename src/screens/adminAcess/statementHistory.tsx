import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { api } from '../../../envfile/api';

type Invoice = {
  ShopName: string,
  shopAddress: string,
  mobNum1: string,
  mobNum2: string,
  creator: string,
  customerName: string,
  pendingAmount: string,
  grossAmount: string,
  totalAmount: string,
  paidstatus: string,
  paidamount: string,
  totalInvoicePiadAmount: string,
  billNo: string, 
  Invoice: string,
  creationTime: Date,
};

const StatementHistory = () => {
    const navigation = useNavigation();
    const [totalPaidAmount, settotalPaidAmount] = useState<number | undefined>();
    const [invoice, setInvoice] = useState<Invoice[]>([]);

    useEffect(() => {
        fetchTotalPaidAmount();
        fetchInvoices();
    }, []);

    const fetchTotalPaidAmount = async () => {
        try {
            const response = await axios.get(api + '/api/invoice/totalpaidamount');
            settotalPaidAmount(response.data); 
            console.log(totalPaidAmount, "Total Paid Amount");
        } catch (error) {
            console.error('Error fetching Total Paid Amount:', error);
        }
    };

    const fetchInvoices = async () => {
        try {
            const response = await axios.get(api + '/api/invoice/getInvoice');
            setInvoice(response.data.data);
            console.log(response.data.data, "Fetched Invoices");
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    // Sort invoices by creationTime in descending order
    const sortedInvoices = invoice
        .filter(inv => inv.paidstatus === 'Paid')
        .sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());

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
                <View style={{ gap: 10 }}>
                    {sortedInvoices.map((item, id) => (
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
                                <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.customerName}  #INV-{item.billNo}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', gap: 10 }}>
                                <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
                                    <Text style={{ color: 'grey' }}>Received</Text>
                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: '#000', fontWeight: 'bold' }}>₹ {item.paidamount}</Text>
                                            <Feather name="arrow-down-left" size={24} color="green" />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text style={{ color: 'grey' }}>Balance</Text>
                                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                                        ₹ {item.totalInvoicePiadAmount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                {/* <View
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
            style={{flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>29-07-2024</Text>
            {/* <FontAwesome6 name="coins" size={24} color="black" /> */}
            {/* <Text style={{color: '#000', fontWeight: 'bold'}}>Varsini</Text>

          </View>
          
          <View style={{flexDirection: 'column', gap: 10}}>
          <View style={{flexDirection:"row",gap:5,alignItems: 'center'}}>
          <Text style={{color: 'grey'}}>Debited</Text>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{color: '#000', fontWeight: 'bold'}}>₹ - 280.00</Text>
              <Feather name="arrow-up-right" size={24} color="red" /></View>
            </View>
          </View>
            <View style={{flexDirection: 'row', gap: 5}}>
            <Text style={{color: 'grey'}}>Balance</Text>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                ₹ 40,000.00
              </Text>
            </View>
          </View>
        </View> */} */}
            </View>
        </View>
    );
};

export default StatementHistory;

const styles = StyleSheet.create({});
