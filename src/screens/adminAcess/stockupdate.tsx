import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';
import { api } from '../../../envfile/api';

const StockUpdate = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [productData, setProductData] = useState([]);
  const [stockData, setStockData] = useState({ productName: "", currentStock: 0, totalPurchase: 0, totalSales: 0 });

  const [editStock, setEditStock] = useState(false);
  const [editPurchase, setEditPurchase] = useState(false);
  const [editSales, setEditSales] = useState(false);
console.log(value,"hfdg");

  const navgation = useNavigation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(api+'/auth/product/getProduct');
        const data = await response.json();
        const formattedData = data.data.map((product) => ({
          label: product.productName,
          value: product._id,
        }));
        setProductData(formattedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (value) {
      const fetchStockData = async () => {
        try {
          const response = await fetch(api+`/stock/getStockData/${value}`);
          const data = await response.json();
          console.log('Stock Data fetched:', data); // Log the full stock data
          if (data.status === 'ok' && data.data) {
            const selectedProduct = productData.find((product) => product.value === value);
            const productName = selectedProduct ? selectedProduct.label : "";
            setStockData({ ...data.data, productName }); // Update to use the nested 'data' object and set product name
          } else {
            setStockData({ productName: "", currentStock: 0, totalPurchase: 0, totalSales: 0 });
          }
        } catch (error) {
          console.error("Failed to fetch stock data:", error);
        }
      };

      fetchStockData();
    }
  }, [value, productData]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(api+`/stock/updateStockData/${value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Stock data updated successfully.');
        setEditStock(false);
        setEditPurchase(false);
        setEditSales(false);
      } else {
        Alert.alert('Error', 'Failed to update stock data.');
      }
    } catch (error) {
      console.error("Failed to update stock data:", error);
      Alert.alert('Error', 'An error occurred while updating stock data.');
    }
  };

  return (
    <View>
      <ScrollView>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={productData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />

        <View style={styles.stockInfo}>
          <Text style={styles.productName}>Product: {stockData.productName}</Text>
          <View style={styles.stockRow}>
            <Text style={styles.label}>Stock:</Text>
            {editStock ? (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(stockData.currentStock)}
                onChangeText={(text) => setStockData({ ...stockData, currentStock: parseInt(text) })}
              />
            ) : (
              <Text style={styles.value}>{stockData.currentStock} kg</Text>
            )}
            <Pressable onPress={() => setEditStock(!editStock)}>
              <Text style={styles.editButton}>{editStock ? 'Save' : 'Edit'}</Text>
            </Pressable>
          </View>

          <View style={styles.stockRow}>
            <Text style={styles.label}>Purchase:</Text>
            {editPurchase ? (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(stockData.totalPurchase)}
                onChangeText={(text) => setStockData({ ...stockData, totalPurchase: parseInt(text) })}
              />
            ) : (
              <Text style={styles.value}>{stockData.totalPurchase}</Text>
            )}
            <Pressable onPress={() => setEditPurchase(!editPurchase)}>
              <Text style={styles.editButton}>{editPurchase ? 'Save' : 'Edit'}</Text>
            </Pressable>
          </View>

          <View style={styles.stockRow}>
            <Text style={styles.label}>Sales:</Text>
            {editSales ? (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(stockData.totalSales)}
                onChangeText={(text) => setStockData({ ...stockData, totalSales: parseInt(text) })}
              />
            ) : (
              <Text style={styles.value}>{stockData.totalSales}</Text>
            )}
            <Pressable onPress={() => setEditSales(!editSales)}>
              <Text style={styles.editButton}>{editSales ? 'Save' : 'Edit'}</Text>
            </Pressable>
          </View>

          <Button title="Update All" onPress={handleUpdate} />
        </View>
      </View>
    </ScrollView>
    <View style={{marginHorizontal: 15, marginVertical: 15,}}>
                <TouchableOpacity
                onPress={()=>{
                  navgation.navigate(screenName.Viewallstocks);
                }}
                  style={{
                    width: '100%',
                    backgroundColor: '#8F62FF',
                    padding: 10,
                    borderRadius: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}   
                 >
                 
                    <Text
                      style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
                      View All Products
                    </Text>
                 
                </TouchableOpacity>
              </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
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
  editButton: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default StockUpdate;