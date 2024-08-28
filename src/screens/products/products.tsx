import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Modal, TextInput, Button, Pressable } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomIcon from '../../utils/icons';
import { colors } from '../../utils/theme/colors';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../envfile/api';

interface Product {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string; // Assuming image is a base64 string
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newSellingPrice, setNewSellingPrice] = useState('');
  const [newPurchasePrice, setNewPurchasePrice] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<{ data: Product[] }>(api + '/auth/product/getProduct');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(api + `/auth/product/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = (product: Product) => {
    setSelectedProduct(product);
    setNewSellingPrice(product.sellingPrice);
    setNewPurchasePrice(product.purchasePrice);
    setModalVisible(true);
  };


  const [errMsg, setErrMsg] = useState("");

  const saveProduct = async () => {
    setErrMsg(""); // Clear any previous error messages
    
    // Check if either field is empty
    if (newPurchasePrice === "" || newSellingPrice === "") {
      setErrMsg("* All fields are mandatory");
      return; // Exit the function to prevent further execution
    }
  
    if (selectedProduct) {
      try {
        // Make the API call to update the product
        await axios.post(api + `/auth/product/${selectedProduct._id}`, { 
          newPurchasePrice,
          newSellingPrice 
        });
  
        // Only close the modal if the API call is successful
        setModalVisible(false);
        await fetchProducts(); // Refresh the product list after update
  
      } catch (error) {
        // Handle any errors during the update process
        console.error('Error updating product:', error);
        setErrMsg("Failed to update product. Please try again.");
      }
    }
  };
  
  
  
  
  

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon color={colors.primarTwo} size={24} name="arrow-back" type="Ionicons" />
        </TouchableOpacity>
        <Text style={styles.headerText}>View all Products</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon color={colors.primarTwo} size={24} name="plussquareo" type="AntDesign" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{gap:10}}>
        {products.map(item => (
          <Pressable
            key={item._id}
            style={styles.productContainer}
            onPress={() => console.log(item._id, "product id")}
          >
            {/* <View style={styles.imageContainer}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                style={styles.image}
              />
            </View> */}
            <View style={styles.productInfoContainer}>
              <View style={{gap:5}}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>Selling Price: {item.sellingPrice}</Text>
                <Text style={styles.productPrice}>Purchased Price: {item.purchasePrice}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Pressable onPress={() => editProduct(item)}>
                  <CustomIcon color="#4d4d4d" size={20} name="edit" type="Feather" />
                </Pressable>
                <Pressable onPress={() => deleteProduct(item._id)}>
                  <CustomIcon color="#4d4d4d" size={20} name="delete" type="MaterialIcons" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
        </View>
      </ScrollView>

      {selectedProduct && (
        <Modal visible={isModalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <Image source={{ uri: `data:image/jpeg;base64,${selectedProduct.image}` }} style={styles.modalImage} /> */}
              <Text style={styles.modalProductName}>{selectedProduct.productName}</Text>
              <TextInput
                            placeholderTextColor="#000"

                style={styles.input}
                placeholder="Enter New Selling Price"
                value={newSellingPrice}
                onChangeText={setNewSellingPrice}
              />
              <TextInput
              placeholderTextColor="#000"
                style={styles.input}
                placeholder="Enter New Purchase Price"
                value={newPurchasePrice}
                onChangeText={setNewPurchasePrice}
              />
              <View style={{flexDirection:"row",justifyContent:"flex-start",width:"100%",gap:10}}><Text style={{textAlign:"left",color:"#f27"}}>{errMsg}</Text></View>
            
              <View style={{flexDirection:"row",width:"100%",justifyContent:"space-around"}}>
              <Pressable style={{width:100,backgroundColor:"#00cc44",padding:4,borderRadius:5}} onPress={saveProduct}>
              <Text style={{textAlign:"center",color:"#fff"}}>Save</Text>
                </Pressable>
                <Pressable style={{width:100,backgroundColor:"#ff3333",padding:4,borderRadius:5}} onPress={() => setModalVisible(false)}>
                 <Text style={{textAlign:"center",color:"#fff"}}>Cancel</Text>
                </Pressable>
             
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  scrollView: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: '100%',
  },
  productContainer: {
    backgroundColor: '#f7f7f7',
    width: '100%',
    padding: 3,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
  },
  imageContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
   
  },
  productName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    color: '#4d4d4d',
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width:"100%",
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width:"80%",
    gap:5
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalProductName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color:"#000"

  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color:"#000"
  },
});

export default Products;
