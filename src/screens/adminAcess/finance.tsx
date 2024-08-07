import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import { api } from '../../../envfile/api';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Finance = () => {
  const [outgoingCash, setOutgoingCash] = useState(0);
  const [borrowingCash, setBorrowingCash] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [closingAmount, setClosingAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [outgoingCashInput, setOutgoingCashInput] = useState('');
  const [borrowingCashInput, setBorrowingCashInput] = useState('');
  const [todayIncomeInput, setTodayIncomeInput] = useState('');
  const [closingAmountInput, setClosingAmountInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(api + "/api/cashflow/getTotalCashFlow");
  
      if (response.data.status === "ok") {
        const fetchedCashFlow = response.data.cashFlow;
        setOutgoingCash(fetchedCashFlow.totalOutgoing || 0);
        setBorrowingCash(fetchedCashFlow.totalBorrowing || 0);
        setTodayIncome(fetchedCashFlow.todaysIncome || 0);
        setClosingAmount(fetchedCashFlow.closingAmount || 0);
        setGrandTotal(
          (fetchedCashFlow.todaysIncome || 0) +
          (fetchedCashFlow.closingAmount || 0) +
          (fetchedCashFlow.totalBorrowing || 0) -
          (fetchedCashFlow.totalOutgoing || 0) // Initial grand total calculation
        );
        console.log(todayIncome,"sandy");
        
      } else {
        console.error("Failed to fetch cash flow:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
        });

        if (response.data.status === "ok") {
          const updatedCashFlow = response.data.cashFlow;
          setOutgoingCash(updatedCashFlow.totalOutgoing);
          setBorrowingCash(updatedCashFlow.totalBorrowing);

          // Update grand total
          const newGrandTotal = todayIncome +
                                closingAmount +
                                updatedCashFlow.totalBorrowing - // Include updated borrowing cash
                                updatedCashFlow.totalOutgoing; // Subtract updated outgoing cash
          setGrandTotal(newGrandTotal);

          if (type === "outgoing") {
            setOutgoingCashInput("");
          } else {
            setBorrowingCashInput("");
          }
        } else {
          console.error("Failed to update cash flow on server:", response.data.error);
        }
      } catch (error) {
        console.error("Error submitting cash flow:", error.response?.data || error.message);
      }
    } else {
      console.error("Invalid input. Please enter a positive number.");
    }
  };

  const handleIncomeSubmit = async () => {
    const incomeValue = parseFloat(todayIncomeInput);

    if (!isNaN(incomeValue) && incomeValue >= 0) {
      try {
        const response = await axios.post(api + "/api/cashflow/updateIncome", {
          todayIncome: incomeValue,
        });

        if (response.data.status === "ok") {
          const updatedIncome = response.data.todaysIncome;
          setTodayIncome(updatedIncome);

          // Update grand total
          const newGrandTotal = updatedIncome + closingAmount + borrowingCash - outgoingCash;
          setGrandTotal(newGrandTotal);

          setTodayIncomeInput('');
        } else {
          console.error("Failed to update today's income on server:", response.data.error);
        }
      } catch (error) {
        console.error("Error submitting today's income:", error.response?.data || error.message);
      }
    } else {
      console.error("Invalid income. Please enter a valid number.");
    }
  };

  const handleClosingAmountSubmit = async () => {
    const closingAmountValue = parseFloat(closingAmountInput);
  
    if (!isNaN(closingAmountValue) && closingAmountValue >= 0) {
      try {
        const response = await axios.post(api + "/api/cashflow/updateClosingAmount", {
          closingAmount: closingAmountValue,
        });

        if (response.data.status === "ok") {
          const updatedClosingAmount = response.data.closingAmount;
          setClosingAmount(updatedClosingAmount);

          // Update grand total
          const newGrandTotal = todayIncome + updatedClosingAmount + borrowingCash - outgoingCash;
          setGrandTotal(newGrandTotal);

          setClosingAmountInput('');
        } else {
          console.error("Failed to update closing amount on server:", response.data.error);
        }
      } catch (error) {
        console.error("Error submitting closing amount:", error.response?.data || error.message);
      }
    } else {
      console.error("Invalid closing amount. Please enter a valid number.");
    }
  };

  return (
    <ScrollView>
      <View style={{width:wp("100%"),flexDirection: "column",display: "flex",justifyContent: "center",flex: 1,alignItems: "center",gap:25}}>
        <View style={{width:wp("90%"),flexDirection: "column",display: "flex",justifyContent: "center",alignItems: "center",gap: 20,paddingTop:30}}>
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Closing Amount</Text>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{closingAmount}</Text>
          </View>
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Today's Income</Text>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{todayIncome}</Text>
          </View>
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Grand Total</Text>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{grandTotal}</Text>
          </View>
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Outgoing Amount</Text>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{outgoingCash}</Text>
          </View>
      
          <View style={{width:wp("90%"),flexDirection: "row",display: "flex",justifyContent: "space-between",alignItems: "center",borderRadius:10,backgroundColor:"#fff",elevation:5,padding:10}}>
              <Text style={{color:"#807d82",fontWeight:"bold",fontSize:hp(1.9)}}>Borrowing Cash</Text>
              <Text style={{color:"green",fontWeight:"bold",fontSize:hp(1.9)}}>{borrowingCash}</Text>
          </View>
        </View>
           

        <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
          <Text style={{color:"#8F62FF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Outgoing Cash</Text>
          <TextInput
            placeholder="Enter Outgoing Cash"
            keyboardType="numeric"
            value={outgoingCashInput}
            onChangeText={handleInputChange(setOutgoingCashInput)}
            style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20,color:"#000"}}/>
          <Pressable onPress={() => handleCashSubmit('outgoing')} style={{backgroundColor: "#8F62FF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
            <Text>Submit Outgoing Cash</Text>
          </Pressable>
        </View> 

        <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
        <Text style={{color:"#8F62FF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Borrowing Cash</Text>
          <TextInput
            placeholder="Enter Borrowing Cash"
            keyboardType="numeric"
            value={borrowingCashInput}
            onChangeText={handleInputChange(setBorrowingCashInput)}
            style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20}}
          />
          <Pressable onPress={() => handleCashSubmit('borrowing')} style={{backgroundColor: "#8F62FF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
            <Text>Submit Borrowing Cash</Text>
          </Pressable>
        </View>

        <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
        <Text style={{color:"#8F62FF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Today's Income</Text>

          <TextInput
            placeholder="Enter Today's Income"
            keyboardType="numeric"
            value={todayIncomeInput}
            onChangeText={handleInputChange(setTodayIncomeInput)}
            style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20}}
          />
          <Pressable onPress={handleIncomeSubmit} style={{backgroundColor: "#8F62FF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
            <Text>Submit Today's Income</Text>
          </Pressable>
        </View>
    
        <View style={{width:wp("100%"),display: "flex",justifyContent:"flex-start",alignItems: "center",gap: 10,flexDirection:"column"}}>
        <Text style={{color:"#8F62FF",fontWeight:"bold",fontSize:hp(2.2)}}>Update Closing Amount</Text>

          <TextInput
            placeholder="Enter Closing Amount"
            keyboardType="numeric"
            value={closingAmountInput}
            onChangeText={handleInputChange(setClosingAmountInput)}
            style={{borderColor: "#c8d2d5",backgroundColor: "#e6e9e9",borderWidth: 2,width: "90%",height: 50,borderRadius: 10,paddingHorizontal: 20}}
          />
          <Pressable onPress={handleClosingAmountSubmit} style={{backgroundColor: "#8F62FF",borderRadius: 10,paddingVertical: 10,paddingHorizontal: 20}}>
            <Text>Submit Closing Amount</Text>
          </Pressable>
        </View>

        <View>
          
         
        
        </View>

       
        

       

       
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     flexDirection: "column",
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "#8a42f5",
//     flex: 1,
//     gap: 10,
//     alignItems: "center"
//   },
//   row: {
//     width: "90%",
//     flexDirection: "row",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10
//   },
//   box: {
//     width: "40%",
//     flexDirection: "row",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   boxContent: {
//     width: "100%",
//     height: 180,
//     backgroundColor: "#4b2386",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     gap: 20
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "#e0e0e0"
//   },
//   amount: {
//     fontSize: 25,
//     color: "#e0e0e0",
//     fontWeight: "900"
//   },
//   image: {
//     width: 80,
//     height: 80
//   },
//   inputContainer: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10
//   },
//   input: {
//     borderColor: "#c8d2d5",
//     backgroundColor: "#e6e9e9",
//     borderWidth: 2,
//     width: "90%",
//     height: 50,
//     borderRadius: 10,
//     paddingHorizontal: 20
//   },
//   submitButton: {
//     backgroundColor: "#f59f42",
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20
//   }
// });

export default Finance;