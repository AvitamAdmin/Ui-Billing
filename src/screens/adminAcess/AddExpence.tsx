import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { api } from '../../../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';

interface BankAccount {
  _id: string;
  accountholder: string;
  accountnumber: number;
  mobileno: number;
  accountbalance: number;
  nickname?: string;
  status: boolean;
  accounttype: string;
}

const AddIncomeScreen = () => {
  const [holderName, setHolderName] = useState('');
  const [expenseDetails, setExpenseDetails] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [creatore, setCreatore] = useState<string | undefined>(undefined);
  const [defaultBankAcc, setDefaultBankAcc] = useState<BankAccount | null>(null);
  const [bankDetails, setBankDetails] = useState<BankAccount[]>([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setCreatore(email ?? undefined);
        console.log(email, 'current user');
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    };

    fetchEmail();
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(api + '/api/bank/getbankdetails');
      const allAccounts = response.data.data;
      setBankDetails(allAccounts);
      const defaultAccount = allAccounts.find(bank => bank.accounttype === 'default');
      setDefaultBankAcc(defaultAccount || null);
      console.log(defaultAccount, "default bank account");
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const updateBankType = async (id: string) => {
    try {
      await axios.post(api + '/api/bank/updateaccounttype', { id });
      const updatedBank = bankDetails.find(bank => bank._id === id);
      if (updatedBank) {
        setDefaultBankAcc(updatedBank);
      }
      await fetchBankDetails();
    } catch (error) {
      console.error('Error updating bank account type:', error);
    }
  };

  const handleAddIncome = async () => {
    setErrMsg("");
    if (!defaultBankAcc) {
      setErrMsg('Bank account not found');
      return;
    }

    const incomeAmountFloat = parseFloat(incomeAmount);
    const afterIncome = defaultBankAcc.accountbalance - incomeAmountFloat;
    const userAccountHolder = defaultBankAcc.accountholder;

    if (defaultBankAcc.accountbalance < incomeAmountFloat) {
      return setErrMsg('Insufficient balance');
  }

    try {
      const response = await axios.post(api + '/api/addexpence/add', {
        holderName,
        userAccountHolder,
        expenseDetails,
        expenceAmount: incomeAmountFloat,
        paymentMethod,
        creatore,
        afterIncome,
      });
      setHolderName("");
      setExpenseDetails("");
      setIncomeAmount("");
      console.log('expense added successfully:', response.data);
    } catch (error) {
      console.error('Failed to add Income:', error);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const socket = new WebSocket(api);
  useEffect(() => {
    socket.onmessage = (message) => {
      const { type, data } = JSON.parse(message.data);
      if (type === 'defaultAccountUpdated') {
        fetchBankDetails(); // Refetch bank details to update the default account
      }
    };

    return () => {
      socket.close(); // Close WebSocket connection when the component unmounts
    };
  }, []);
const navigation = useNavigation()
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
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
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
        value={defaultBankAcc?._id} // Set the default value here
        onChange={item => updateBankType(item.value)}
      />

      <View>
        <Text>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          value={holderName}
          onChangeText={setHolderName}
        />
      </View>

      <View>
        <Text>Expense Details</Text>
        <TextInput
          style={styles.input}
          value={expenseDetails}
          onChangeText={setExpenseDetails}
        />
      </View>

      <View>
        <Text>Expense Amount</Text>
        <TextInput
          style={styles.input}
          value={incomeAmount}
          onChangeText={setIncomeAmount}
          keyboardType="numeric"
        />
      </View>

      <View style={{ gap: 5 }}>
        <Text>Payment Method</Text>
        <View style={styles.radioContainer}>
          <Pressable
            style={styles.radioButton}
            onPress={() => handlePaymentMethodChange('UPI')}
          >
            <View style={paymentMethod === 'UPI' ? styles.radioSelected : styles.radioUnselected} />
            <Text style={styles.radioText}>UPI</Text>
          </Pressable>
          <Pressable
            style={styles.radioButton}
            onPress={() => handlePaymentMethodChange('Netbanking')}
          >
            <View style={paymentMethod === 'Netbanking' ? styles.radioSelected : styles.radioUnselected} />
            <Text style={styles.radioText}>Netbanking</Text>
          </Pressable>
          <Pressable
            style={styles.radioButton}
            onPress={() => handlePaymentMethodChange('Cash')}
          >
            <View style={paymentMethod === 'Cash' ? styles.radioSelected : styles.radioUnselected} />
            <Text style={styles.radioText}>Cash</Text>
          </Pressable>
        </View>
      </View>

      <Text style={{ color: "red" }}>{errMsg}</Text>
      <Button title="Add Expense" onPress={handleAddIncome} />

    </View>
          
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
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
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  radioUnselected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  radioText: {
    marginLeft: 8,
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

export default AddIncomeScreen;
