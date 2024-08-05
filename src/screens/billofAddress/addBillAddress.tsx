import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TopHeader} from '../../components/commonComponents';
import {labels} from '../../utils/labels';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CustomIcon from '../../utils/icons';
import { LinearProgress } from '@rneui/themed';
import { colors } from '../../utils/theme/colors';
import axios from 'axios';
import { api } from '../../../envfile/api';

const AddBillAddress = () => {
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);

  const handleImagePicker = async () => {
    console.log('pressing camera button');

    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result && result.assets && result.assets.length > 0) {
        const base64 = result.assets[0].base64!;
        setImageURL(base64);
        console.log(base64, 'img response'); // Log the base64 image data
      }
    } catch (error) {
      console.error('Image picking error:', error);
    }
  };

  const [formValues, setFormValues] = useState({
    shopName: '',
    shopsalename: '',
    address: '',
    mobilenum1: '',
    mobilenum2: '',
  });
const { shopName,
  shopsalename,
  address,
  mobilenum1,
  mobilenum2,} = formValues;
  const handleInputChange = (name: string, value: string) => {
    setFormValues({...formValues, [name]: value});
  };


  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateBillAddress = async () => {
    if (
      shopName !== '' &&
      shopsalename !== '' &&
      address !== '' &&
      mobilenum1 !== '' &&
      mobilenum2 !== ''
    ) {
      try {
        console.log('create bill process started');

        const response = await axios.post(api+
          '/api/bill/shopbillcreate',
          { shopName,
            shopsalename,
            address,
            mobilenum1,
            mobilenum2,
            imageURL },
        );
  
        console.log(response.data);
        console.log('create bill succeeded');
      //   setFormValues({  shopName: '',
      // shopsalename: '',
      // address: '',
      // mobilenum1: '',
      // mobilenum2: '',
      // })
      // setImageURL('');
      } catch (error) {
        console.error('Bill Create failed', error);
      }
    } else {
      setErrorMsg('All input fields are required.');
    }
  };
  
  return (
    <View>
      <TopHeader headerText={labels.createbilladdress} />
      <View
        style={{
          backgroundColor: '#f7f7f7',
          width: '100%',
          height: '100%',
          padding: 10,
          gap:10
        }}>
        <View style={{padding: 3, borderRadius: 8, display:"flex", flexDirection:"row", gap:5, backgroundColor:"#e6e6e6", borderWidth: 1, borderColor: '#bfbfbf'}}>
          <View style={{width:"22%"}}>
            {imageURL ? 
              <Image source={{ uri: `data:image/jpeg;base64,${imageURL}` }} style={{ height: 80, width: 80, borderRadius: 10 }} /> 
              : 
              <TouchableOpacity
                onPress={handleImagePicker}
                style={{
                  borderWidth: 3,
                  borderColor: '#4d4dff',
                  height: 80,
                  width: 80,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <CustomIcon
                  name={'cloudupload'}
                  size={56}
                  color="#4d4dff"
                  type={'AntDesign'}
                />
              </TouchableOpacity>
            }
          </View>
          <View style={{display:"flex",flexDirection:"row",width:"75%",justifyContent:"space-between",alignItems:"flex-start"}}>
            <Text style={{fontSize:18, color:"#262626", fontWeight:"500"}}>Upload Logo</Text>
            <TouchableOpacity onPress={()=>{setImageURL('')}}>
            <CustomIcon
                      color="red"
                      size={24}
                      name="delete"
                      type="MaterialIcons"
                    />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:10}}>
          <View>
          <Text style={{ color: '#000',fontSize:14}}>Shop Name</Text>
          <TextInput
            placeholder="Enter Shop Name"
            placeholderTextColor="#ababab" 
            value={formValues.shopName}
            onChangeText={text => handleInputChange('shopName', text)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 8,
              color: '#000',
            }}
          />
          </View>
         <View>
         <Text style={{ color: '#000',fontSize:14}}>Shop Address</Text>

<TextInput
  placeholder="Enter Shop Address"
  placeholderTextColor="#ababab" 
  value={formValues.address}
  onChangeText={text => handleInputChange('address', text)}
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    color: '#000',
  }}
/>
         </View>
         <View>
         <Text style={{ color: '#000',fontSize:14}}>Shop Sales Details</Text>

<TextInput
  placeholder="Shop Sales Details"
  placeholderTextColor="#ababab" 
  value={formValues.shopsalename}
  onChangeText={text => handleInputChange('shopsalename', text)}
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    color: '#000',
  }}
/>
         </View>
          <View style={{display:"flex", flexDirection:"row", gap:15, width:"100%", justifyContent:"space-between", alignItems:"center"}}>
            <View style={{width:"45%"}}>
            <Text style={{ color: '#000',fontSize:16}}>Mobile Number 1</Text>


            <TextInput
keyboardType='number-pad'
              placeholder="Mobile Number 1"
              placeholderTextColor="#ababab" 
              value={formValues.mobilenum1}
              onChangeText={text => handleInputChange('mobilenum1', text)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 8,
                borderRadius: 8,
                color: '#000',
              }}
            />
            </View>
            <View style={{width:"45%"}}>
           <Text style={{ color: '#000',fontSize:16}}>Mobile Number 2</Text>

<TextInput
keyboardType='number-pad'
  placeholder="Mobile Number 2"
  placeholderTextColor="#ababab" 
  value={formValues.mobilenum2}
  onChangeText={text => handleInputChange('mobilenum2', text)}
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    color: '#000',
  }}
/>
           </View>
          </View>
          {errorMsg ? (
                <Text style={{color: 'red', marginVertical: 10}}>
                  {errorMsg}
                </Text>
              ) : null}
          <TouchableOpacity 
            style={{
              width: '100%',
              backgroundColor: '#8F62FF',
              padding: 10,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal:5,
              paddingVertical:10
            }}  
            onPress={handleCreateBillAddress}
          >
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Create Bill Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddBillAddress;

const styles = StyleSheet.create({});
