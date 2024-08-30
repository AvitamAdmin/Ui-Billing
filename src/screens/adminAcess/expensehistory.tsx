import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../utils/icons';
import {api} from '../../../envfile/api';
import * as Progress from 'react-native-progress';

type History = {
  type: 'income' | 'expense';
  holderName: string;
  userAccountHolder: string;
  details: string;
  amount: number;
  paymentMethod: string;
  creator: string;
  creationTime: Date;
  lastModified: Date;
  balanceAfter: number;
};

const Expensehistory = () => {
  const navigation = useNavigation(); // Correctly initializing navigation
  const [combinedHistory, setCombinedHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const incomeResponse = await axios.get(
        api + '/api/addincome/getincomehistory',
      );
      const expenseResponse = await axios.get(
        api + '/api/addexpence/getexpencehistory',
      );

      const incomeHistory = incomeResponse.data.data.map((item: any) => ({
        ...item,
        type: 'income',
        details: item.expenceDetails,
        amount: item.expenceAmount,
        balanceAfter: item.afterAmount,
      }));

      const expenseHistory = expenseResponse.data.data.map((item: any) => ({
        ...item,
        type: 'expense',
        details: item.expenceDetails,
        amount: item.expenceAmount,
        balanceAfter: item.afterexpence,
      }));

      const combined = [...incomeHistory, ...expenseHistory].sort(
        (a, b) =>
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime(),
      );
      setLoading(false);
      setCombinedHistory(combined);
      console.log(combined, 'Fetched Combined History');
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };
  const [searchInput, setSearchInput] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const handleDateChange = (event) => {
    setDateQuery(event.target.value);
  }; 
  return (
    <View
      style={{
        width: wp('100%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
      }}>
      <View
        style={{
          width: wp('90%'),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <CustomIcon
              color="#000"
              size={26}
              name="arrowleft"
              type="AntDesign"
            />
          </Pressable>
        </View> */}
        {loading ? (
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height:"100%"
            }}>
            <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>
              loading . . .
            </Text>
            <View>
              <Progress.Circle
                size={45}
                thickness={5}
                showsText
                strokeCap="square"
                indeterminate={true}
              />
            </View>
          </View>
        ) : (
          <View style={{ }}>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between",marginBottom:5}}>
          <View style={{width:"55%"}}>
        <TextInput
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Search by Holder name"
          placeholderTextColor="#ababab"
          style={{backgroundColor:"#fff",borderRadius:5,color:"#000",paddingLeft:5,paddingRight:5,height:40,width:"100%"}}
        />
      </View>
      <View style={{width:"40%"}}>
      <TextInput
      keyboardType='default'
          value={dateQuery}
          onChangeText={setDateQuery}
          style={{backgroundColor:"#fff",borderRadius:5,color:"#000",paddingLeft:5,paddingRight:5,height:40,width:"100%"}}
          placeholderTextColor="#ababab"
          placeholder="MM/DD/YYYY"
        />
      </View>
          </View>
            {combinedHistory.length > 0 ? (
              <ScrollView style={{ width: '100%', }}>
                
                <View style={{gap: 10,paddingBottom: 20}}>{combinedHistory .filter(index =>   index.holderName.toLowerCase().includes(searchInput.toLowerCase()) &&  new Date(index.creationTime)
                  .toLocaleDateString()
                  .toLowerCase()
                  .includes(dateQuery) ).map((item, id) => (
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
                      style={{
                        flexDirection: 'column',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}>
                      <View style={{flexDirection: 'row', gap: 5}}>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          {new Date(item.creationTime).toLocaleDateString()}
                        </Text>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          {new Date(item.creationTime).toLocaleTimeString()}
                        </Text>
                      </View>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        From {item.userAccountHolder}
                      </Text>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        To {item.holderName}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column', gap: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'grey'}}>
                          {item.type === 'income' ? 'Received' : 'Spent'}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{color: '#000', fontWeight: 'bold'}}>
                              ₹ {item.amount}
                            </Text>
                            <Feather
                              name={
                                item.type === 'income'
                                  ? 'arrow-down-left'
                                  : 'arrow-up-right'
                              }
                              size={24}
                              color={item.type === 'income' ? 'green' : 'red'}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', gap: 5}}>
                        <Text style={{color: 'grey'}}>Balance</Text>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          ₹ {item.balanceAfter}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}</View>
              </ScrollView>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Text style={{color: 'grey', fontSize: 16}}>
                  No history available.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Expensehistory;

const styles = StyleSheet.create({});
