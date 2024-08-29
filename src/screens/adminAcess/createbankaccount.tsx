import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {OnboardingButton} from '../../components/commonButton';
import {TopHeader} from '../../components/commonComponents';
import {labels} from '../../utils/labels';
import {screenName} from '../../utils/screenNames';
import {colors} from '../../utils/theme/colors';
import {
  bg_color_white,
  flex1,
  flexRow,
  justifyBetween,
  mh15,
  mv15,
} from '../../utils/theme/commonStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../envfile/api';


const Createbankaccount = () => {
  const [formValues, setFormValues] = useState({
    accountno: '',
    accountholder: '',
    mobileno: '',
    accountbalance: '',
    nickname: '',
  });
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [accounttype, setAccounttype] = useState('');
  const navigation = useNavigation();

  const handleInputChange = (name: string, value: string) => {
    setFormValues({...formValues, [name]: value});
  };

  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setCurrentUser(email ?? undefined); // Handle null case
        console.log(currentUser, 'asdfghjkl');

        console.log('Retrieved email:', email);
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    };

    fetchEmail();
  }, []);
  const handleSaveBtnClick = async () => {
  
    // Check if any of the input fields are empty
    if (  !formValues.accountno ||
        !formValues.accountholder ||
        !formValues.accountbalance ||
        !formValues.mobileno ||
        !formValues.nickname ) {
      setErrorMsg('All input fields are required.');
      return;
    }
  
    // Check the length of the account number
    if (formValues.accountno.length > 14 || formValues.accountno.length < 11) {
      setErrorMsg('Check your account number');
      return;
    }
    if (formValues.mobileno.length > 10) {
      setErrorMsg('Check your Mobile number');
      return;
    }
    console.log(formValues.accountno.length,"length");
    
  
    try {
      // Make the API request to create the bank account
      const response = await axios.post(api+
        '/api/bank/createbankacc',
        { accountno: formValues.accountno,
          accountholder: formValues.accountholder,
          accountbalance: formValues.accountbalance,
          mobileno: formValues.mobileno,
          nickname: formValues.nickname,
          creator:currentUser,
          accounttype},
      );
      
  
      console.log(response.data);
  
      // Clear the form values after successful creation
      setFormValues({
        accountno: '',
        accountholder: '',
        mobileno: '',
        accountbalance: '',
        nickname: '',
      });
  
      setErrorMsg(''); // Clear any error messages
    } catch (error) {
      console.error('Create bank account failed', error);
      setErrorMsg('Failed to create account. Please try again.');
    }
  };
  

  const handleCancelBtnClick = () => {
    setIsActiveBtn(false);
    setFormValues({
        accountno: '',
      accountholder: '',
      mobileno: '',
      accountbalance: '',
      nickname: '',
    });
    setErrorMsg("");
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, []),
  );

  return (
    <View style={{flex:1,height:"100%",width:"100%",flexDirection:"column",justifyContent:"space-between"}}>
      <View style={{marginHorizontal: 15, marginVertical: 15,height:"85%",}}>
        <TopHeader headerText={labels.addnewbankaccount} />
        <ScrollView>
          <View style={{paddingBottom: '5%'}}>
            
            <View style={{gap:10}}>
             
              <TextInput
                placeholder="Enter Bank Account Number"
                 keyboardType='number-pad'
                placeholderTextColor="#000" 
                value={formValues.accountno}
                onChangeText={text => handleInputChange('accountno', text)}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 8,
                  borderRadius: 8,
                  color: '#000',
                }}
              />
             
                <View style={{flex: 1, }}>
                  
                  <TextInput
                  keyboardType='default'
                    placeholder="Account Holder Name"
                    placeholderTextColor="#000" 
                    value={formValues.accountholder}
                    onChangeText={text =>
                      handleInputChange('accountholder', text)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 8,
                      borderRadius: 8,
                      color: '#000',
                    }}
                  />
                </View>
                <View style={{flex: 1,}}>
                 
                  <TextInput
                  keyboardType='number-pad'
                    placeholder="Enter Mobile Number"
                    placeholderTextColor="#000" 
                    value={formValues.mobileno}
                    onChangeText={text =>
                      handleInputChange('mobileno', text)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 8,
                      borderRadius: 8,
                      color: '#000',
                    }}
                  />
                </View>
                <View style={{flex: 1,}}>
                 
                  <TextInput
                  keyboardType='number-pad'
                    placeholder="Account Balance"
                    placeholderTextColor="#000" 
                    value={formValues.accountbalance}
                    onChangeText={text =>
                      handleInputChange('accountbalance', text)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 8,
                      borderRadius: 8,
                      color: '#000',
                    }}
                  />
                </View>
                <View style={{flex: 1,}}>
                 
                  <TextInput
                  keyboardType='default'
                    placeholder="Add Nickname"
                    placeholderTextColor="#000" 
                    value={formValues.nickname}
                    onChangeText={text =>
                      handleInputChange('nickname', text)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 8,
                      borderRadius: 8,
                      color: '#000',
                    }}
                  />
                </View>
              
              {errorMsg ? (
                <Text style={{color: 'red', marginVertical: 10}}>
                  {errorMsg}
                </Text>
              ) : null}
              <View style={[flexRow, justifyBetween, {marginVertical: 20}]}>
                <OnboardingButton
                  width={160}
                  title={labels.reset}
                  onChange={handleCancelBtnClick}
                  backgroundColor={
                     colors.greySeven
                  }
                  color={ colors.blackOne}
                />
                <OnboardingButton
                  width={160}
                  title="Create Account"
                  onChange={handleSaveBtnClick}
                  backgroundColor={
                    colors.primary                  }
                  color={colors.white}
                />
              </View>
              
            </View>
          </View> 
        </ScrollView>
        
      </View>
      <View style={{marginHorizontal: 15, marginVertical: 15,}}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    backgroundColor: '#8F62FF',
                    padding: 10,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}   
                  onPress={() => {
                    setLoading(true);
                    navigation.navigate(screenName.ViewAllBankAcc as never);
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      animating={true}
                      size="small"
                      color="#fff"
                    />
                  ) : (
                    <Text
                      style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
                      View All Accounts
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
    </View>
  );
};

export default Createbankaccount;
