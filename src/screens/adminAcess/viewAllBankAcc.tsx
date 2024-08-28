import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { api } from '../../../envfile/api';
import CustomIcon from '../../utils/icons';
import { colors } from '../../utils/theme/colors';

interface BankAccount {
  _id: string;
  accountholder: string;
  accountnumber: number;
  mobileno: number;
  accountbalance: number;
  nickname?: string;
  status: boolean;
}

const ViewAllBankAcc = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bankDetails, setBankDetails] = useState<BankAccount[]>([]);
  const [defaultBank, setDefaultBank] = useState<BankAccount | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(api + '/api/bank/getbankdetails');
      const bankData: BankAccount[] = response.data.data;
      setBankDetails(bankData);

      const defaultAccount = bankData.find(bank => bank.accounttype === 'default');
      if (defaultAccount) {
        setDefaultBank(defaultAccount);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bank details:', error);
      setLoading(false);
    }
  };

  const updateBankType = async (id: string) => {
    try {
      await axios.post(api + '/api/bank/updateaccounttype', { id });
      const updatedBank = bankDetails.find(bank => bank._id === id);
      if (updatedBank) {
        setDefaultBank(updatedBank);
      }
      await fetchBankDetails();
    } catch (error) {
      console.error('Error updating bank account type:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <CustomIcon
                      color={colors.blackOne}
                      name="arrow-back"
                      size={24}
                      type="Ionicons"
                    />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Accounts</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {bankDetails.length > 0 ? (
          bankDetails.map((bank) => (
            <View key={bank._id} style={styles.bankCard}>
              <Text style={styles.title}>Bank Account Details:</Text>
              <Text>Account Holder: {bank.accountholder}</Text>
              <Text>Account Number: {bank.accountnumber}</Text>
              <Text>Mobile Number: {bank.mobileno}</Text>
              <Text>Account Balance: {bank.accountbalance}</Text>
              <Text>Nickname: {bank.nickname || 'N/A'}</Text>
              <Text>Status: {bank.status ? 'Active' : 'Inactive'}</Text>
              
              {defaultBank && defaultBank._id === bank._id ? (
                <Text style={styles.defaultText}>Default Account</Text>
              ) : (
                <TouchableOpacity 
                  style={styles.defaultButton}
                  onPress={() => updateBankType(bank._id)}
                >
                  <Text style={styles.buttonText}>Set as Default</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text>No bank details available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewAllBankAcc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bankCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  defaultText: {
    color: 'green',
    marginTop: 5,
  },
  defaultButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#8F62FF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
