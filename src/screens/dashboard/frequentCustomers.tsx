import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/theme/colors';
import CustomIcon from '../../utils/icons';
import { addNewDashboardData, frequentCustomersdata } from '../../utils/data/dashboardData';
import { labels } from '../../utils/labels';
import { H16White700, H14White400Underline, H10White600, H18BlackOne700, H14blackOne600 } from '../../utils/styledComponents';
import { mv15, alignSelfCenter, mh10, mv5, mt5, flexRow, alignItemCenter, justifyBetween, justifyCenter, mr10, ml10, flex1, mb15, mb10 } from '../../utils/theme/commonStyles';
import CustomModal from '../../components/commonModal';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';
import axios from 'axios';
import { api } from '../../../envfile/api';


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


const FrequentCustomers: React.FC = (props) => {


const navigation = useNavigation();

const [customer, setCustomer] = useState<Customer[]>([]);
useEffect(() => {
  fetchProducts(); // Fetch initial customer data

  const ws = new WebSocket(api + '/api/customer/getcustomerdetails');

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'CREATE_CUSTOMER') {
      setCustomer((prevCustomers) => [message.data, ...prevCustomers]);
    }
  };

  // Clean up WebSocket connection on component unmount
  return () => {
    ws.close();
  };
}, []);

const fetchProducts = async () => {
    try {
      const response = await axios.get<{data: Customer[]}>(api+
        '/api/customer/getcustomerdetails',
      );
      setCustomer(response.data.data); // Assuming response.data.data is an array of products
      console.log(customer,"ffffffff");
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

    return (
        <View style={[{ backgroundColor: colors.blackOne, height: 100, width: '100%', borderRadius: 8 }, mv15, alignSelfCenter]}>
            <View style={[mh10, mv5, mt5, flexRow, alignItemCenter, justifyBetween]}>
                <H16White700>{labels.frequentCustomers}</H16White700>
                <TouchableOpacity onPress={fetchProducts}>
                    <CustomIcon
              color="#fff"
              size={22}
              name="reload"
              type="Ionicons"
            />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",gap:5}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft:10}}>
                <View style={{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center",gap:5}}>

               {/* <View style={{justifyContent:"center",alignItems:"center"}}>
                                            <TouchableOpacity onPress={()=>{
navigation.navigate(screenName.AddCustomersScreen as never)
                }}  style={ { height: 40, width: 40, borderRadius: 100, backgroundColor: colors.white,justifyContent:"center",alignItems:"center" }}>
                                                <CustomIcon color={colors.blackOne} size={16} name='add' type='MaterialIcons' />
                                            </TouchableOpacity>
                                            <Text style={{color:"#fff"}}>Add new</Text>
                                        </View> */}
                                        <View style={{flexDirection:"row",gap:10}}>
                                        {customer.map((item,id)=>{
                                            return(
                                                <View key={id} style={{justifyContent:"center",alignItems:"center",}}>
                                        <CustomIcon
                  name={'person-circle'}
                  size={48}
                  color="#fff"
                  type={'Ionicons'}
                />
                                            <Text numberOfLines={1} style={{color:"#fff",width:70,textAlign:"center"}}>{item.customerName}</Text>
                                        </View>
                                            )
                                        })}
                                        </View>
               </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default FrequentCustomers;
