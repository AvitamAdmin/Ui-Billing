import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  _id: string;
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
  billNo: string;
  totalInvoicePiadAmount: string;
  Invoice: {
    productId: string;
    productName: string;
    sellingPrice: number;
    quantity: number;
    totalPrice: number;
    bag: number;
  }[];
  creationTime: Date;
};

const UnPaidInvoice = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    fetchCustomers();
    fetchInvoices();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${api}/api/customer/getcustomerdetails`,
      );
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${api}/api/invoice/getInvoice`);
      setInvoices(response.data.data);
      console.log(response.data.data.totalInvoicePiadAmount,"find totalInvoicepiadamount")
      setloading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const updatePaidStatus = async (id: string,pendingamounts:string,customerName:string,totalInvoicePiadAmount:string) => {
    try {
      // console.log(id, 'id-inv');

      const response = await axios.post(
        api + `/api/invoice/updatePaidStatus/`,
        {id,pendingamounts,totalInvoicePiadAmount},
      );
      const selectedCustomer = customerName;
      console.log(selectedCustomer,"mmmm");
      const setamount = 0
      const pendingamount = setamount
      const updateresponse = await axios.post(api+
        '/api/customer/updatePendingAmt',
        {pendingamount, selectedCustomer},
      );
      console.log(response.data, 'response');
      console.log(updateresponse.data, 'updateresponse');
      setInvoices(prevInvoices =>
        prevInvoices.map(invoice =>
          invoice._id === id ? {...invoice, paidstatus: 'Paid'} : invoice,
        ),
      );
    } catch (error) {
      console.error('Error updating paid status:', error);
    }
  };
  return (
    <>
      {loading ? (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: '#fff',
            gap: 10,
          }}>
          <Text style={{color: '#ababab', fontSize: 25, fontWeight: 'bold'}}>
            loading . . .
          </Text>
          <View>
            <Progress.Circle
              size={70}
              thickness={5}
              showsText
              strokeCap="square"
              indeterminate={true}
            />
          </View>
        </View>
      ) : (
        <ScrollView
          style={{backgroundColor: '#cccccc', width: '100%', padding: 10}}>
          <View>
            {invoices.filter(index => index.paidstatus == 'UnPaid').length >=
            1 ? (
              <View style={{gap: 10, paddingBottom: 20}}>
                {invoices
                  .filter(index => index.paidstatus == 'UnPaid')
                  .map((item, id) => (
                    <View
                    key={id}
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                      gap: 5,
                      borderRadius: 8,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{display: 'flex', flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#000',
                            fontSize: 20,
                          }}>
                          INVOICE
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

                      <View style={{}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#196',
                            fontSize: 20,
                          }}>
                          {item.ShopName}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <Text>
                        Date :{' '}
                        {new Date(item.creationTime).toLocaleDateString()}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                      }}>
                      <View style={{width: '55%', backgroundColor: '#fff'}}>
                        <Text style={{fontSize: 14, color: '#000'}}>
                          {item.ShopName}
                        </Text>
                        <Text style={{fontSize: 10, color: '#737373'}}>
                          {item.shopAddress}
                        </Text>
                        <Text style={{fontSize: 10, color: '#737373'}}>
                          {item.mobNum1}
                        </Text>
                        <Text style={{fontSize: 10, color: '#737373'}}>
                          {item.mobNum2}
                        </Text>
                      </View>
                      <View style={{width: '45%', backgroundColor: '#fff'}}>
                        {customers
                          .filter(
                            index => index.customerName === item.customerName,
                          )
                          .map(index => (
                            <View key={index._id}>
                              <Text style={{fontSize: 14, color: '#000'}}>
                                {index.customerName}
                              </Text>
                              <Text style={{fontSize: 10, color: '#737373'}}>
                                {index.address}
                              </Text>
                              <Text style={{fontSize: 10, color: '#737373'}}>
                                {index.mobileNumber}
                              </Text>
                            </View>
                          ))}
                      </View>
                    </View>

                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          gap: 5,
                          padding: 10,
                          backgroundColor: '#e6e6e6',
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                        }}>
                        <View style={{width: '35%'}}>
                          <Text style={{color: '#333333'}} numberOfLines={1}>Particulars</Text>
                        </View>
                        <View style={{width: '15%'}}>
                          <Text style={{textAlign: 'center', color: '#333333'}} numberOfLines={1}>
                            Rate
                          </Text>
                        </View>
                        <View style={{width: '15%'}}>
                          <Text style={{textAlign: 'center', color: '#333333'}} numberOfLines={1}>
                            Quantity
                          </Text>
                        </View>
                        <View style={{width: '10%'}}>
                          <Text style={{textAlign: 'center', color: '#333333'}} numberOfLines={1}>
                            Bag
                          </Text>
                        </View>
                        <View style={{width: '25%'}}>
                          <Text style={{textAlign: 'center', color: '#333333'}} numberOfLines={1}>
                            Amount
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          borderWidth: 2,
                          borderColor: '#e6e6e6',
                          borderBottomWidth: 0,
                        }}>
                        {item.Invoice.map((product, id) => (
                          <View>
                            <View
                            key={id}
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              gap: 5,
                              padding: 10,
                              borderBottomWidth: 2,
                              borderColor: '#e6e6e6',
                            }}>
                            <View style={{width: '35%'}}>
                              <Text style={{color: '#333333'}}>
                                {product.productName}
                              </Text>
                            </View>
                            <View style={{width: '15%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.sellingPrice}
                              </Text>
                            </View>
                            <View style={{width: '15%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.quantity1}
                              </Text>
                            </View>
                            <View style={{width: '10%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.bag1}
                              </Text>
                            </View>
                            <View style={{width: '25%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.sellingPrice * product.quantity1 * product.bag1}
                              </Text>
                            </View>
                          </View>
                          {product.quantity2 == "0" ? (<View></View>) : (<View
                            key={id}
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              gap: 5,
                              padding: 10,
                              borderBottomWidth: 2,
                              borderColor: '#e6e6e6',
                            }}>
                            <View style={{width: '35%'}}>
                              <Text style={{color: '#333333'}}>
                                {product.productName}
                              </Text>
                            </View>
                            <View style={{width: '15%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.sellingPrice}
                              </Text>
                            </View>
                            <View style={{width: '15%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.quantity2}
                              </Text>
                            </View>
                            <View style={{width: '10%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.bag2}
                              </Text>
                            </View>
                            <View style={{width: '25%'}}>
                              <Text
                                style={{textAlign: 'center', color: '#333333'}}>
                                {product.sellingPrice * product.quantity2 * product.bag2}
                              </Text>
                            </View>
                          </View>)}
                          </View>
                          
                        ))}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          width: '40%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.paidstatus == 'Paid' ? (
                          <Image
                            source={require('../../../assets/images/paid.png')}
                            style={{height: hp(8), width: wp(20)}}
                          />
                        ) : (
                          <Image
                            source={require('../../../assets/images/unpaid.jpg')}
                            style={{height: hp(8), width: wp(20)}}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          gap: 5,
                        }}>
                        <View>
                          <Text style={{color: '#000'}}>Pending Amount</Text>
                        </View>
                        <View>
                          <Text style={{color: '#000'}}>Paid Amount</Text>
                        </View>
                        <View>
                          <Text style={{color: '#000'}}>Total Amount</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '20%',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          gap: 5,
                        }}>
                        <View>
                          <Text style={{color: '#000'}}>
                            {item.pendingAmount}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#000'}}>{item.paidamount}</Text>
                        </View>
                        <View>
                          <Text style={{color: '#000'}}>
                            {item.totalAmount}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Pressable
                        onPress={() => {
                          const id = item._id;
                          const customerName = item.customerName;
                          const pendingamounts = item.pendingAmount;
                          const totalInvoicePiadAmount = item.totalInvoicePiadAmount;
                          console.log(pendingamounts);
                          console.log(customerName);
                          console.log(id);
                          updatePaidStatus(id,pendingamounts,customerName,totalInvoicePiadAmount);
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: '#196',
                          padding: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          Change UnPaid status to paid
                        </Text>
                      </Pressable>
                  </View>
                  ))}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  gap: 15,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <Image
                    source={require('../../../assets/images/Rectangle.png')}
                    style={{width: 150, height: 150}}
                  />
                </View>
                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                  No invoice Found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default UnPaidInvoice;

const styles = StyleSheet.create({});