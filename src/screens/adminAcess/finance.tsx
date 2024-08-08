import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert, Button, Platform } from 'react-native';
import axios from 'axios';
import { api } from '../../../envfile/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

const Finance = () => {
  const [outgoingCash, setOutgoingCash] = useState(0);
  const [borrowingCash, setBorrowingCash] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [closingAmount, setClosingAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [outgoingCashInput, setOutgoingCashInput] = useState('');
  const [borrowingCashInput, setBorrowingCashInput] = useState('');
  const [todayIncomeInput, setTodayIncomeInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState(''); // State to hold error messages
  const [isToday, setIsToday] = useState(true); // State to check if selected date is today

  useEffect(() => {
    const currentDate = new Date();
    const isSelectedDateToday =
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear();
    setIsToday(isSelectedDateToday);
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date) => {
    setError(''); // Reset error state before fetching data
    try {
      // Ensure date is in the format YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split('T')[0];
      
      const response = await axios.get(api + `/api/cashflow/getHistoricalData`, {
        params: { date: formattedDate }
      });
  
      if (response.data.status === "ok") {
        const fetchedCashFlow = response.data.cashFlow;
        setOutgoingCash(fetchedCashFlow.outgoingCash || 0);
        setBorrowingCash(fetchedCashFlow.borrowingCash || 0);
        setTodayIncome(fetchedCashFlow.todaysIncome || 0);
        setClosingAmount(fetchedCashFlow.closingAmount || 0);
  
        const newGrandTotal = (fetchedCashFlow.todaysIncome || 0) +
                              (fetchedCashFlow.closingAmount || 0) +
                              (fetchedCashFlow.totalBorrowing || 0) -
                              (fetchedCashFlow.totalOutgoing || 0);
        setGrandTotal(newGrandTotal);
        
      } else {
        // Handle case where no data is found
        setOutgoingCash(0);
        setBorrowingCash(0);
        setTodayIncome(0);
        setClosingAmount(0);
        setGrandTotal(0);
        setError("No cash flow data available for the selected date.");
      }
    } catch (error) {
      setError("No data Found for This Date.");
      // Ensure state is set to zero if there's an error
      setOutgoingCash(0);
      setBorrowingCash(0);
      setTodayIncome(0);
      setClosingAmount(0);
      setGrandTotal(0);
    }
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
  };

  const handleCashSubmit = async (type) => {
    const numericValue = parseFloat(
      type === "outgoing" ? outgoingCashInput : borrowingCashInput
    );

    if (!isNaN(numericValue) && numericValue > 0) {
      try {
        const response = await axios.post(api + "/api/cashflow/updateCashFlow", {
          amount: numericValue,
          type: type,
          date: selectedDate
        });

        if (response.data.status === "ok") {
          const updatedCashFlow = response.data.cashFlow;
          setOutgoingCash(updatedCashFlow.totalOutgoing);
          setBorrowingCash(updatedCashFlow.totalBorrowing);

          const newGrandTotal = todayIncome +
                                closingAmount +
                                updatedCashFlow.totalBorrowing -
                                updatedCashFlow.totalOutgoing;
          setGrandTotal(newGrandTotal);

          if (type === "outgoing") {
            setOutgoingCashInput("");
          } else {
            setBorrowingCashInput("");
          }
        } else {
          setError("Failed to update cash flow on server.");
        }
      } catch (error) {
        setError("Error submitting cash flow.");
      }
    } else {
      setError("Invalid input. Please enter a positive number.");
    }
  };

  const handleIncomeSubmit = async () => {
    const incomeValue = parseFloat(todayIncomeInput);

    if (!isNaN(incomeValue) && incomeValue >= 0) {
      try {
        const response = await axios.post(api + "/api/cashflow/updateIncome", {
          todayIncome: incomeValue,
          date: selectedDate
        });

        if (response.data.status === "ok") {
          const updatedIncome = response.data.todaysIncome;
          setTodayIncome(updatedIncome);

          const newGrandTotal = updatedIncome + closingAmount + borrowingCash - outgoingCash;
          setGrandTotal(newGrandTotal);

          setTodayIncomeInput('');
        } else {
          setError("Failed to update today's income on server.");
        }
      } catch (error) {
        setError("Error submitting today's income.");
      }
    } else {
      setError("Invalid income. Please enter a valid number.");
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.datePickerContainer}>
        <Button onPress={() => setShowDatePicker(true)} title="Select Date" />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Closing Amount</Text>
          <Text style={styles.cardValue}>{closingAmount}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Income</Text>
          <Text style={styles.cardValue}>{todayIncome}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Grand Total</Text>
          <Text style={styles.cardValue}>{grandTotal}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Outgoing Amount</Text>
          <Text style={styles.cardValue}>{outgoingCash}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Borrowing Cash</Text>
          <Text style={styles.cardValue}>{borrowingCash}</Text>
        </View>
      </View>

      {isToday && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Update Outgoing Cash</Text>
            <TextInput
              placeholder="Enter Outgoing Cash"
              keyboardType="numeric"
              value={outgoingCashInput}
              onChangeText={handleInputChange(setOutgoingCashInput)}
              style={styles.input}
            />
            <Pressable onPress={() => handleCashSubmit('outgoing')} style={styles.button}>
              <Text style={styles.buttonText}>Submit Outgoing Cash</Text>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Update Borrowing Cash</Text>
            <TextInput
              placeholder="Enter Borrowing Cash"
              keyboardType="numeric"
              value={borrowingCashInput}
              onChangeText={handleInputChange(setBorrowingCashInput)}
              style={styles.input}
            />
            <Pressable onPress={() => handleCashSubmit('borrowing')} style={styles.button}>
              <Text style={styles.buttonText}>Submit Borrowing Cash</Text>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Update Today's Income</Text>
            <TextInput
              placeholder="Enter Today's Income"
              keyboardType="numeric"
              value={todayIncomeInput}
              onChangeText={handleInputChange(setTodayIncomeInput)}
              style={styles.input}
              />
              <Pressable onPress={handleIncomeSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit Today's Income</Text>
              </Pressable>
              </View>
              </>
              )}
              </ScrollView>
              );
              };
              
              const styles = StyleSheet.create({
              container: {
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              },
              datePickerContainer: {
              marginBottom: 20,
              },
              cardContainer: {
              width: wp('90%'),
              marginBottom: 20,
              },
              card: {
              width: wp('90%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: '#fff',
              elevation: 5,
              padding: 10,
              marginBottom: 10,
              },
              cardTitle: {
              color: '#807d82',
              fontWeight: 'bold',
              fontSize: hp(1.9),
              },
              cardValue: {
              color: 'green',
              fontWeight: 'bold',
              fontSize: hp(1.9),
              },
              inputContainer: {
              width: wp('100%'),
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
              },
              inputLabel: {
              color: '#8F62FF',
              fontWeight: 'bold',
              fontSize: hp(2.2),
              },
              input: {
              borderColor: '#c8d2d5',
              backgroundColor: '#e6e9e9',
              borderWidth: 2,
              width: '90%',
              height: 50,
              borderRadius: 10,
              paddingHorizontal: 20,
              color: '#000',
              },
              button: {
              backgroundColor: '#8F62FF',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              },
              buttonText: {
              color: '#fff',
              },
              errorText: {
              color: 'red',
              fontWeight: 'bold',
              fontSize: hp(2),
              textAlign: 'center',
              marginBottom: 20,
              },
              });
              
              export default Finance;
