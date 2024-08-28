import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {api} from '../../../envfile/api';
import CustomIcon from '../../utils/icons';
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

const Viewallcustomers = () => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const [customer, setCustomer] = useState<Customer[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<{data: Customer[]}>(
        api + '/api/customer/getcustomerdetails',
      );
      setCustomer(response.data.data); // Assuming response.data.data is an array of products
      console.log(customer, 'ffffffff');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const [errMsg, setErrMsg] = useState('');
  const deletecustomer = async (id: string) => {
    console.log(id, "id");

    try {
        await axios.delete(api + `/api/customer/${id}`);
        await fetchProducts();
        setErrMsg(''); // Clear any previous error message
    } catch (error) {
        console.error('Error deleting customer:', error);
        // Check if the error response indicates a pending amount issue
        if (error.response && error.response.status === 400) {
            setErrMsg(error.response.data.status); // Set the error message from the server
        } else {
            setErrMsg('Error deleting customer.'); // Generic error message
        }
    }
};


  return (
    <View style={{flexDirection: 'column', padding: 10}}>
      <View style={{padding: 5,paddingBottom:10,width:"100%"}}>
        <Text style={{color:"red"}}>{errMsg}</Text>
      </View>
      <View style={{flexDirection: 'column', gap: 10}}>
        {customer.map((item, id) => {
          return (
            <View
              key={id}
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1a1a1a',
                flexDirection: 'row',
                borderRadius: 8,
                padding: 3,
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '85%',
                }}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomIcon
                    name={'person-circle'}
                    size={48}
                    color="#fff"
                    type={'Ionicons'}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '75%',
                    gap: 5,
                    padding: 3,
                  }}>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Customer Name : {item.customerName}
                  </Text>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    ADdress : {item.address}
                  </Text>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Mob Number : {item.mobileNumber}
                  </Text>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Pending Amount : {item.pendingAmount}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => {
                  console.log(item._id);
                  const id = item._id;
                  deletecustomer(id);
                }}
                style={{flexDirection: 'row', width: '10%'}}>
                <CustomIcon
                  name={'remove-circle'}
                  size={25}
                  color="red"
                  type={'Ionicons'}
                />
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Viewallcustomers;

const styles = StyleSheet.create({});
