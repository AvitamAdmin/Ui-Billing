import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {api} from '../../../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../utils/theme/colors';
import { screenName } from '../../utils/screenNames';
import { useNavigation } from '@react-navigation/native';
interface BankAccount {
  _id: string;
  accountholder: string;
  accountnumber: number;
  mobileno: number;
  accountbalance: number;
  nickname?: string;
  status: boolean;
}
const AddIncome = () => {
  const [holderName, setHolderName] = useState('');
  const [expenceDetails, setExpenceDetails] = useState('');
  const [expenceAmount, setExpenceAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [creatore, setCreatore] = useState<string | undefined>(undefined);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setCreatore(email ?? undefined); // Handle null case
        console.log(creatore, 'current user');

        console.log('Retrieved email:', email);
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    };

    fetchEmail();
  }, []);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handlePaymentMethodChange = method => {
    setPaymentMethod(method);
  };

  const [bankDetails, setBankDetails] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [choosingDefault, setChoosingDefault] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchBankDetails();
    fetchDefaultBankAccount();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(api + '/api/bank/getbankdetails');
      setBankDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  const [defaultBankAcc, setDefaultBankAcc] = useState<BankAccount | null>(
    null,
  );
  const fetchDefaultBankAccount = async () => {
    try {
      const response = await axios.get(api + '/api/bank/getbankdetails');
      const allAccounts = response.data.data;
      const defaultAccount = allAccounts.find(
        bank => bank.accounttype === 'default',
      );
      setDefaultBankAcc(defaultAccount || null);
      console.log(defaultAccount, 'default bank account');
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const setDefaultAccount = async selectedAccountId => {
    try {
      const response = await axios.post(api + '/api/bank/setdefaultaccount', {
        accountId: selectedAccountId,
      });
      fetchDefaultBankAccount(); // Refresh the default account after setting
      console.log('Default account set successfully:', response.data);
    } catch (error) {
      console.error(
        'Failed to set default account:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const [errMsg, seterrMsg] = useState('');

  const handleAddIncome = async () => {
    if (!defaultBankAcc) {
      seterrMsg('Bank account not found');
      return;
    }

    const expenseAmount = parseFloat(expenceAmount);
    const afterexpence = defaultBankAcc.accountbalance + expenseAmount;
    const ownerAccount = defaultBankAcc.accountholder;
    try {
      const response = await axios.post(api + '/api/addincome/addIncome', {
        holderName,
        ownerAccount,
        expenceDetails,
        expenceAmount: expenseAmount,
        paymentMethod,
        creatore,
        afterexpence,
      });
      setHolderName("");
      setExpenceAmount("");
      setExpenceDetails("");

      console.log('Income added successfully:', response.data);
    } catch (error) {
      console.error(
        'Failed to add income:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const handlepaytoextstingacc = async () => {
    seterrMsg('');
    if (!defaultBankAcc) {
      seterrMsg('Default bank account not found');
      return;
    }

    if (!selectedAccount) {
      seterrMsg('No account selected');
      return;
    }

    const expenseAmount = parseFloat(expenceAmount);

    if (defaultBankAcc.accountbalance < expenseAmount) {
      seterrMsg('Insufficient balance');
      return;
    }

    const afterexpence = defaultBankAcc.accountbalance - expenseAmount; // Deduct from default account
    const selectedAccId = selectedAccount; // ID of the selected account

    console.log(selectedAccId, 'selectedAccId');

    try {
      const response = await axios.post(
        api + '/api/addincome/addexistingaccount',
        {
          holderName,
          selectedAccId,
          expenceAmount: expenseAmount,
          paymentMethod,
          creatore,
          afterexpence,
        },
      );

      console.log('Income added successfully:', response.data);
    } catch (error) {
      console.error(
        'Failed to add income:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const updateBankType = async (id: string) => {
    try {
      await axios.post(api + '/api/bank/updateaccounttype', {id});
      const updatedBank = bankDetails.find(bank => bank._id === id);
      if (updatedBank) {
        setDefaultBankAcc(updatedBank);
      }
      await fetchBankDetails();
    } catch (error) {
      console.error('Error updating bank account type:', error);
    }
  };

  const socket = new WebSocket(api);
  useEffect(() => {
    socket.onmessage = message => {
      const {type, data} = JSON.parse(message.data);
      if (type === 'defaultAccountUpdated') {
        fetchBankDetails(); // Refetch bank details to update the default account
      }
    };

    return () => {
      socket.close(); // Close WebSocket connection when the component unmounts
    };
  }, []);

  const navigation = useNavigation();
  return (
    <View style={{flexDirection:"column",justifyContent:"space-between",    padding: 16,width:"100%",height:"100%"
    }}>

<View style={styles.container}>
<View>
        <View>{defaultBankAcc ? (
        <Text style={{ fontSize: 16 }}>Default Account: {defaultBankAcc.accountholder}</Text>
      ) : (
        <Text>No default account found.</Text>
      )}</View>
      <View>{defaultBankAcc ? (
        <Text style={{ fontSize: 16 }}>Account Balance: {defaultBankAcc.accountbalance}</Text>
      ) : (
        <Text>No default account found.</Text>
      )}</View>
      </View>
  <Dropdown
    style={[styles.dropdown]}
    placeholderStyle={[styles.placeholderStyle]}
    selectedTextStyle={[styles.selectedTextStyle]}
    inputSearchStyle={[styles.inputSearchStyle]}
    iconStyle={[styles.iconStyle]}
    data={bankDetails.map(bank => ({
      label: bank.accountholder,
      value: bank._id,
    }))}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder="Select a bank account"
    searchPlaceholder="Search..."
    value={defaultBankAcc?._id}
    onChange={item => updateBankType(item.value)}
  />

  {!isChecked && (
    <>
      <View style={{gap: 5}}>
        <Text>Customer name</Text>
        <TextInput
          style={styles.input}
          value={holderName}
          onChangeText={setHolderName}
        />
      </View>
      <View style={{gap: 5}}>
        <Text>Description </Text>
        <TextInput
          style={styles.input}
          value={expenceDetails}
          onChangeText={setExpenceDetails}
        />
      </View>
    </>
  )}

  <View style={styles.checkboxContainer}>
    <Pressable onPress={toggleCheckbox}>
      <Icon
        name={isChecked ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color="#000"
      />
    </Pressable>
    <Text>{isChecked ? 'Select Account' : 'Pay to Existing Account'}</Text>
  </View>

  {isChecked && (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
      placeholderStyle={[styles.placeholderStyle, {color: '#000'}]}
      selectedTextStyle={[styles.selectedTextStyle, {color: '#000'}]}
      inputSearchStyle={[styles.inputSearchStyle, {color: '#000'}]}
      iconStyle={[styles.iconStyle]}
      data={bankDetails.map(bank => ({
        label: bank.accountholder,
        value: bank._id, // Use ID for unique identification
      }))}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select a bank account"
      searchPlaceholder="Search..."
      value={selectedAccount}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setSelectedAccount(item.value);
        console.log(item.value, 'Selected account ID');
        setIsFocus(false);
      }}
    />
  )}

  <View style={{gap: 5}}>
    <Text>Payment Method</Text>
    <View style={styles.radioContainer}>
      {['UPI', 'Netbanking', 'Cash'].map(method => (
        <Pressable
          key={method}
          style={styles.radioButton}
          onPress={() => handlePaymentMethodChange(method)}>
          <Icon
            name={
              paymentMethod === method
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={20}
            color="#000"
          />
          <Text style={styles.radioText}>{method}</Text>
        </Pressable>
      ))}
    </View>
  </View>

  <View style={{gap: 5}}>
    <Text>Enter Amount</Text>
    <TextInput
      style={styles.input}
      value={expenceAmount}
      onChangeText={setExpenceAmount}
      keyboardType="numeric"
    />
  </View>

  <View
    style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    }}>
    <Text
      style={{
        color: 'red',
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%',
      }}>
      {errMsg}
    </Text>
    {isChecked ? (
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          borderRadius: 8,
        }}
        onPress={handlepaytoextstingacc}>
        <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
          Pay to Existing Account
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          borderRadius: 8,
        }}
        onPress={handleAddIncome}>
        <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
          Add Income
        </Text>
      </TouchableOpacity>
    )}
  </View>


</View>
{/* <Pressable onPress={()=>{
            navigation.navigate(screenName.Incomehistory as never)
          }} style={{width:"100%",backgroundColor:"#ababab",padding:7,justifyContent:"center",bottom:0,flexDirection:"column",borderRadius:8}}><Text style={{color:"#000",fontSize:16,textAlign:"center"}}>View all income history</Text></Pressable> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioText: {
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: 150,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    width: '100%',
    color: '#000',
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default AddIncome;
