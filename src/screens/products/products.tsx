import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomIcon from '../../utils/icons';
import {colors} from '../../utils/theme/colors';
import {useNavigation} from '@react-navigation/native';
import { api } from '../../../envfile/api';

interface Product {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string; // Assuming image is now a base64 string
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<{data: Product[]}>(api+
        '/auth/product/getProduct',
      );
      setProducts(response.data.data); // Assuming response.data.data is an array of products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(api+`/auth/product/${id}`);
      // Update the state by filtering out the deleted product
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <View>
      <View style={{padding: 10,flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"center",paddingLeft:10,paddingRight:10}}>
      <View >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcon
              color={colors.primarTwo}
              size={24}
              name="arrow-back"
              type="Ionicons"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
            View all Products
          </Text>
        </View>
        <View >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcon
              color={colors.primarTwo}
              size={24}
              name="plussquareo"
              type="AntDesign"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View
          style={{
            gap: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
          }}>
          {products.map(item => (
            <TouchableOpacity 
            onPress={()=>{
              // console.log(item._id,"product id");
              
            }}
              key={item._id}
              style={{
                backgroundColor: '#f7f7f7',
                width: '100%',
                padding: 3,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius:8
              }}>
              <View
                style={{
                  width: '25%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: `data:image/jpeg;base64,${item.image}`}} // Use base64 directly
                  style={styles.image}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  width: '70%',
                }}>
                <View>
                  <Text
                    style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
                    {item.productName}
                  </Text>
                  <Text
                    style={{fontSize: 14, color: '#4d4d4d', fontWeight: '500'}}>
                    Selling Price : {item.sellingPrice}
                  </Text>
                  <Text
                    style={{fontSize: 14, color: '#4d4d4d', fontWeight: '500'}}>
                    Purchased Price : {item.purchasePrice}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    gap: 20,
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={() => {
console.log("edit button triged");

                  }}>
                    <CustomIcon
                      color="#4d4d4d"
                      size={20}
                      name="edit"
                      type="Feather"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    console.log(item._id,"delete btn id");
                    deleteProduct(item._id);
                  }}>
                    <CustomIcon
                      color="#4d4d4d"
                      size={20}
                      name="delete"
                      type="MaterialIcons"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight:"100%"
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,

  },
});

export default Products;
