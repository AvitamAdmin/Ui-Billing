import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import { api } from '../../../envfile/api';

const Finance = () => {
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [incomingCashPerDay, setIncomingCashPerDay] = useState(0);
  const [outgoingCash, setOutgoingCash] = useState(0);
  const [borrowingCash, setBorrowingCash] = useState(0);
  const [outgoingCashInput, setOutgoingCashInput] = useState('');
  const [borrowingCashInput, setBorrowingCashInput] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const [incomingCashInput, setIncomingCashInput] = useState('');

  const fetchTotalPaidAmount = async () => {
    try {
      const response = await axios.get(api+"/api/invoice/totalPaidAmount");
      if (response.data.status === "ok") {
        const totalAmount = parseFloat(response.data.totalPaidAmount) || 0;
        console.log("Total Paid Amount:", totalAmount);

        const todayResponse = await axios.get(api+"/api/invoice/getIncomingCashPerDay");
        const todayAmount = parseFloat(todayResponse.data.incomingCashPerDay) || 0;
        console.log("Incoming Cash Per Day:", todayAmount);

        setIncomingCashPerDay(todayAmount);
        setTotalPaidAmount(totalAmount - todayAmount);
      } else {
        console.error("Failed to fetch total paid amount:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch total paid amount:", error);
    }
  };

  const fetchGrandTotal = async () => {
    try {
      const response = await axios.get(api+"/api/cashflow/grandTotal");
      if (response.data.status === "ok") {
        const fetchedGrandTotal = parseFloat(response.data.grandTotal) || 0;
        console.log("Grand Total from API:", fetchedGrandTotal);
        setGrandTotal(fetchedGrandTotal);
      } else {
        console.error("Failed to fetch grand total:", response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch grand total:", error);
    }
  };

  useEffect(() => {
    fetchTotalPaidAmount();
    fetchGrandTotal();
  }, []);

  useEffect(() => {
    // Recalculate grand total based on incoming and total paid amounts
    const calculatedGrandTotal = incomingCashPerDay + totalPaidAmount;
    console.log("Calculated Grand Total:", calculatedGrandTotal);
    setGrandTotal(calculatedGrandTotal);
  }, [incomingCashPerDay, totalPaidAmount]);

  const handleInputChange = (setter) => (value) => {
    setter(value);
  };

  const handleSubmit = async (type) => {
    const numericValue = parseFloat(
      type === "incoming"
        ? incomingCashInput
        : type === "outgoing"
        ? outgoingCashInput
        : borrowingCashInput
    );
  
    if (!isNaN(numericValue) && numericValue > 0) {
      try {
        console.log(`Submitting ${type} cash with value: ${numericValue}`);
        const response = await axios.post(api+
          "/api/cashflow/updateCashFlow",
          {
            amount: numericValue,
            type: type,
          }
        );
  
        console.log("Response from API:", response.data);
  
        if (response.data.status === "ok") {
          const updatedCashFlow = response.data.cashFlow;
          setTotalPaidAmount(updatedCashFlow.totalIncoming);
          setOutgoingCash(updatedCashFlow.totalOutgoing);
          setBorrowingCash(updatedCashFlow.totalBorrowing);
          setIncomingCashPerDay(updatedCashFlow.incomingCashPerDay);
  
          // Update grand total using the latest cash flow data
          setGrandTotal(
            updatedCashFlow.totalIncoming - 
            updatedCashFlow.totalOutgoing +
            updatedCashFlow.totalBorrowing
          );
  
          // Clear inputs
          setIncomingCashInput("");
          setOutgoingCashInput("");
          setBorrowingCashInput("");
        } else {
          console.error(
            "Failed to update cash flow on server:",
            response.data.error
          );
        }
      } catch (error) {
        console.error(
          "Error submitting cash flow:",
          error.response?.data || error.message
        );
      }
    } else {
      console.error("Invalid input. Please enter a positive number.");
    }
  };
  

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.title}>Incoming Cash per Day</Text>
              <Text style={styles.amount}>{incomingCashPerDay}</Text>
              <Image source={require('../../../assets/images/IncomingCash.png')} style={styles.image} />
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.title}>Outgoing Cash</Text>
              <Text style={styles.amount}>{outgoingCash}</Text>
              <Image source={require('../../../assets/images/OutgoingCash.png')} style={styles.image} />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.title}>Borrowing Cash</Text>
              <Text style={styles.amount}>{borrowingCash}</Text>
              <Image source={require('../../../assets/images/BorrowingCash.png')} style={styles.image} />
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.title}>Total Incoming Cash</Text>
              <Text style={styles.amount}>{totalPaidAmount}</Text>
              <Image source={require('../../../assets/images/IncomingCash.png')} style={styles.image} />
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxContent}>
            <Text style={styles.title}>Grand Total</Text>
            <Text style={styles.amount}>{grandTotal}</Text>
            <Image source={require('../../../assets/images/IncomingCash.png')} style={styles.image} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Outgoing Cash"
            keyboardType="numeric"
            value={outgoingCashInput}
            onChangeText={handleInputChange(setOutgoingCashInput)}
            style={styles.input}
          />
          <Pressable onPress={() => handleSubmit('outgoing')} style={styles.submitButton}>
            <Text>Submit Outgoing</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Borrowing Cash"
            keyboardType="numeric"
            value={borrowingCashInput}
            onChangeText={handleInputChange(setBorrowingCashInput)}
            style={styles.input}
          />
          <Pressable onPress={() => handleSubmit('borrowing')} style={styles.submitButton}>
            <Text>Submit Borrowing</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Finance;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#8a42f5",
    flex: 1,
    gap: 10,
    alignItems: "center"
  },
  row: {
    width: "90%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  box: {
    width: "40%",
    flexDirection: "row",
    display: "flex",
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center"
  },
  boxContent: {
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  amount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333"
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10
  },
  inputContainer: {
    marginTop: 20,
    width: "90%",
    alignItems: "center"
  },
  input: {
    width: "80%",
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5
  }
});