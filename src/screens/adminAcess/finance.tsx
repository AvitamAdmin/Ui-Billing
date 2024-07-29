import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import axios from 'axios';

const Finance = () => {
  const [totalGrossAmount, setTotalGrossAmount] = useState(0);
  const [outgoingCash, setOutgoingCash] = useState(100); 
  const [inputValue, setInputValue] = useState('');

  const [initialOutgoingCash] = useState(100);


  useEffect(() => {
    const fetchTotalGrossAmount = async () => {
      try {
        const response = await axios.get("http://192.168.0.160:5000/api/invoice/totalgrossamount");
        console.log(response, "dfsdf");

        if (response.data.status === "ok") {
          setTotalGrossAmount(response.data.totalGrossAmount);
          console.log(totalGrossAmount, "dfsdf");
        }
      } catch (error) {
        console.error("Failed to fetch total gross amount:", error);
      }
    };

    fetchTotalGrossAmount();
  }, []);

  
  const handleInputChange = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setInputValue(value);
      setOutgoingCash(numericValue);
    } else {
      setInputValue('');
      setOutgoingCash(initialOutgoingCash); 
    }
  };

  return (
    <View style={{ width: "100%", flexDirection: "column", display: "flex", justifyContent: "center", backgroundColor: "#8a42f5", flex: 1, gap: 10, alignItems: "center" }}>
      <View style={{ width: "90%", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <View style={{ width: "40%", flexDirection: "row", display: "flex", borderRadius: 20, backgroundColor: "#fff", padding: 10, alignItems: "center" }}>
          <View style={{ flexDirection: "column", display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>Incoming Cash</Text>
            <Text style={{ color: "#000" }}>{totalGrossAmount}</Text>
            <Image source={require('../../../assets/images/IncomingCash.png')} style={{ height: 40, width: 40 }} />
          </View>
        </View>
        <View style={{ width: "40%", flexDirection: "row", display: "flex", borderRadius: 20, backgroundColor: "#fff", padding: 10, alignItems: "center" }}>
          <View style={{ flexDirection: "column", display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>Outgoing Cash</Text>
            <Text style={{ color: "#000" }}>{outgoingCash}</Text>
            <Image source={require('../../../assets/images/OutgoingCash.png')} style={{ height: 40, width: 40 }} />
          </View>
        </View>
      </View>
      <View style={{ width: "90%", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <View style={{ width: "40%", flexDirection: "row", display: "flex", borderRadius: 20, backgroundColor: "#fff", padding: 10, alignItems: "center" }}>
          <View style={{ flexDirection: "column", display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>Borrowing Cash</Text>
            <Text style={{ color: "#000" }}>1000</Text>
            <Image source={require('../../../assets/images/BorrowingCash.png')} style={{ height: 40, width: 40 }} />
          </View>
        </View>
      </View>
      <View style={{backgroundColor: "#8a4",width:"95%"}}>
      <TextInput
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
         
        />
      </View>

      <View style={{width:"95%",}}>
         <Pressable style={{backgroundColor: "#c0c0c0",alignItems: "center",padding:10}}>
            <Text>submit</Text>
         </Pressable>
      </View>
    </View>
  );
}

export default Finance;

const styles = StyleSheet.create({});