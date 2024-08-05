import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';
import { api } from '../../../envfile/api';

const Viewallstocks = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which product is being edited
  const [productData, setProductData] = useState([]);
// console.log(productData,"hhhhh");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productResponse = await fetch(api+'/auth/product/getProduct');
        const productData = await productResponse.json();
        const formattedProductData = productData.data;

        // Fetch stock data for each product
        const stockPromises = formattedProductData.map(async (product) => {
          const stockResponse = await fetch(api+`/stock/getStockData/${product._id}`);
          const stockData = await stockResponse.json();
          return {
            ...product,
            ...stockData.data,
            productName: product.productName
          };
        });

        const productsWithStock = await Promise.all(stockPromises);
        setProductData(productsWithStock);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (productId: string) => {
    try {
      console.log(productId,"productId");
      
      const product = productData[editIndex!];
      const response = await fetch(`http://192.168.0.119:5000/stock/updateStockData/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentStock: product.currentStock,
          totalPurchase: product.totalPurchase,
          totalSales: product.totalSales,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Stock data updated successfully.');
        setEditIndex(null);
      } else {
        Alert.alert('Error', 'Failed to update stock data.');
      }
    } catch (error) {
      console.error("Failed to update stock data:", error);
      Alert.alert('Error', 'An error occurred while updating stock data.');
    }
  };

  const handleChange = (text: string, field: string, index: number) => {
    const updatedProductData = [...productData];
    updatedProductData[index] = { ...updatedProductData[index], [field]: parseInt(text) };
    setProductData(updatedProductData);
  };

  const handleEditPress = (index: number) => {
    setEditIndex(editIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      >
        {productData.map((product, index) => {
                    // console.log(product._id,"product._id");

          return(
            <View key={product._id} style={styles.stockInfo}>
            <Text style={styles.productName}>Product: {product.productName}</Text>
            <View style={styles.stockRow}>
              <Text style={styles.label}>Stock:</Text>
              {editIndex === index ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(product.currentStock)}
                  onChangeText={(text) => handleChange(text, 'currentStock', index)}
                />
              ) : (
                <Text style={styles.value}>{product.currentStock} kg</Text>
              )}
            </View>

            <View style={styles.stockRow}>
              <Text style={styles.label}>Purchase:</Text>
              {editIndex === index ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(product.totalPurchase)}
                  onChangeText={(text) => handleChange(text, 'totalPurchase', index)}
                />
              ) : (
                <Text style={styles.value}>{product.totalPurchase}</Text>
              )}
            </View>

            <View style={styles.stockRow}>
              <Text style={styles.label}>Sales:</Text>
              {editIndex === index ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(product.totalSales)}
                  onChangeText={(text) => handleChange(text, 'totalSales', index)}
                />
              ) : (
                <Text style={styles.value}>{product.totalSales}</Text>
              )}
            </View>

            <Pressable onPress={() => handleEditPress(index)} style={styles.editButtonContainer}>
              <Text style={styles.editButton}>
                {editIndex === index ? 'Cancel' : editIndex === null ? 'Edit' : 'More'}
              </Text>
            </Pressable>

            {editIndex === index && (
              <Button title="Update" onPress={() => handleUpdate(product._id)} />
            )}
          </View>
          )
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  stockInfo: {
    marginTop: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    width: '40%',
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    width: '40%',
    fontSize: 16,
  },
  editButtonContainer: {
    alignItems: 'center',
  },
  editButton: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Viewallstocks;