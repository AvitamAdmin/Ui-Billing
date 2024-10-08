import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  alignItemCenter,
  alignSelfCenter,
  flexRow,
  justifyAround,
  justifyBetween,
  justifyCenter,
  justifyEvenly,
  mh10,
  mh15,
  ml10,
  mt5,
  mv10,
  mv15,
  p5,
} from '../../utils/theme/commonStyles';
import {labels} from '../../utils/labels';
import {
  H12Primary400,
  H12blackTwo600,
  H12white600,
  H14Primary400Underline,
  H14blackOne600,
  H16BlackOne700,
} from '../../utils/styledComponents';
import {recentInvoicesdata} from '../../utils/data/dashboardData';
import {colors} from '../../utils/theme/colors';
import {InvoiceCard} from '../../components/commonComponents';
import {useNavigation} from '@react-navigation/native';
import {screenName} from '../../utils/screenNames';
import axios from 'axios';
import CustomIcon from '../../utils/icons';
import {api} from '../../../envfile/api';
import * as Progress from 'react-native-progress';



type Customer = {
  _id: string;
  customerName: string;
  address: string;
  mobileNumber: string;
  creator: string;
  creationTime: string;
  lastModified: string;
  __v: number;
  pendingAmount: string;
};
type Invoice = {
  ShopName: string;
  shopAddress: string;
  mobNum1: string;
  mobNum2: string;
  creator: string;
  customerName: string;
  pendingAmount: string;
  grossAmount: string;
  totalAmount: string;
  paidstatus: string;
  paidamount: string;
  billNo: string; // Ensure billNo is set correctly
  Invoice: string;
  creationTime: Date;
};

const RecentInvoices = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoice, setInvoice] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchCustomers();
    fetchInvoices();
    const ws = new WebSocket(api + '/api/invoice/getInvoice');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_INVOICE') {
        setInvoice((prevInvoices) => [message.data, ...prevInvoices]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        api + '/api/customer/getcustomerdetails',
      );
      setCustomers(response.data.data); // Ensure response data is correctly set
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const [loading, setloading] = useState<boolean>(false);
  const fetchInvoices = async () => {
    try {
      setloading(true)
      const response = await axios.get(api + '/api/invoice/getInvoice');
      setInvoice(response.data.data);
      console.log(invoice.length, 'invoice');
      setloading(false)

    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const sortedInvoices = invoice
    .sort(
      (a, b) =>
        new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime(),
    )
    .slice(0, 3); // Get the last two recent invoice
  const navigation = useNavigation();

  return (
    <View style={{marginTop: 10, gap: 10}}>
      <View style={[flexRow, justifyBetween]}>
        <H16BlackOne700>{labels.recentInvoice}</H16BlackOne700>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screenName.ViewAllInvoice as never);
          }}>
          <H14Primary400Underline>{labels.viewAll}</H14Primary400Underline>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          fetchInvoices(); // Trigger manual refresh
        }}
        style={{
          padding: 10,
          backgroundColor: colors.primary,
          borderRadius: 8,
          marginVertical: 10,
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Refresh Invoice</Text>
      </TouchableOpacity>
     
      {loading ? (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            gap: 10,
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            loading . . .
          </Text>
          <View>
            <Progress.Circle
              size={35}
              thickness={5}
              showsText
              strokeCap="square"
              indeterminate={true}
            />
          </View>
        </View>):(<View>{invoice.length >= 1 ?  (<View style={{gap: 10}}>
        {sortedInvoices.map((item, id) => {
          return (
            <View
              key={id}
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                padding: 5,
                borderRadius: 8,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth:2,
                borderColor:"#d9d9d9",
                gap:10
              }}>
              <View style={{width: 70,height:70,backgroundColor:"#eeeeee",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:48}}>
              <CustomIcon
                            name={'user-large'}
                            size={35}
                            color={colors.primary}
                            type={'FontAwesome6'}
                          />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '75%',
                }}>
                <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: 3,
                }}>
                <View style={{flexDirection: 'row', gap: 10,width:"50%"}}>
                  
                  <View>
                  <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                      {item.customerName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '500',
                        color: '#3385ff',
                        fontSize: 14,
                        textAlign: 'left',
                      }}>
                      #INV-{item.billNo}
                    </Text>
                    
                  </View>
                </View>
                <View style={{flexDirection:"column",width:"50%",justifyContent:"flex-end",alignItems:"flex-end"}}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                    }}>
                    {item.paidstatus === 'Paid' ? (
                      <View
                        style={{
                          paddingRight: 5,
                          paddingLeft: 5,
                          backgroundColor: '#C2EACB',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 8,
                          width: '35%',
                        }}>
                        <View>
                          <CustomIcon
                            name={'dot-single'}
                            size={20}
                            color="#1ce549"
                            type={'Entypo'}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#595959',
                              fontSize: 16,
                              fontWeight: '500',
                            }}>
                            Paid
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          paddingRight: 5,
                          paddingLeft: 5,

                          backgroundColor: '#ebbdbd',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 8,
                          width: '53%',
                        }}>
                        <View>
                          <CustomIcon
                            name={'dot-single'}
                            size={20}
                            color="#ed0606"
                            type={'Entypo'}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#595959',
                              fontSize: 16,
                              fontWeight: '500',
                            }}>
                            UnPaid
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <View>
                    <Text style={{color:"#000"}}>
                      {new Date(item.creationTime).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>

                <View
                  style={{
                    backgroundColor: '#e6e6e6',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 5,
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#000'}}>Total Amount</Text>
                    <Text style={{color: '#000', fontWeight: '600'}}>
                      {item.totalAmount}
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#000'}}>Gross Amount</Text>
                    <Text style={{color: '#000', fontWeight: '600'}}>
                      {item.grossAmount}
                    </Text>
                  </View> */}
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#000'}}>Paid Amount</Text>
                    <Text style={{color: '#000', fontWeight: '600'}}>
                      {item.paidamount}
                    </Text>
                  </View>
                  
                </View>
              </View>
            </View>
          );
        })}
      </View>) : (<View style={{flexDirection:"column",gap:15,width:"100%",justifyContent:"center",alignItems:"center"}}>
        <View style={{backgroundColor:"#fff"}}>
          <Image source={require("../../../assets/images/invoicelogo.png")} style={{width:150,height:150}} />
        </View>
        <Text style={{color:"#000",fontSize:18,fontWeight:"bold"}}>No invoice Found</Text>
      </View>)}</View>)}
    </View>
  );
};

export default RecentInvoices;
