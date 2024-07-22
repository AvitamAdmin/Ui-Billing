import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {screenName} from '../../utils/screenNames';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import CustomIcon from '../../utils/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCustomerNameToBill,
  addCustomerToBill,
  GetPendingAmount,
  removeCustomerFromBill,
  restCustomerBill,
} from '../../redux/Slice';
import {AppDispatch, RootState} from '../../redux/Store';

type Customer = {
  _id: string;
  customerName: string;
  address: string;
  mobileNumber: string;
  creator: string;
  creationTime: string;
  lastModified: string;
  __v: number;
  pendingAmount : string
};

type Product = {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string; // Assuming image is now a base64 string
  count: number; // Add count property
  quantity: string; // Change to string to handle TextInput value
  bag: string;
};

const CreateBill = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(
    undefined,
  );
  const [checkbox, setCheckbox] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const Customerfrombill = useSelector(
    (state: RootState) => state.billing.fetchCustomerFromBill,
  );

  console.log(Customerfrombill, 'asdfghjkl');
  console.log(selectedCustomer,"selectedCustomer");
  

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.119:5000/api/customer/getcustomerdetails',
      );
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get<{data: Product[]}>(
        'http://192.168.0.119:5000/auth/product/getProduct',
      );
      const productsWithCount = response.data.data.map(product => ({
        ...product,
        count: 0, // Initialize count property
        quantity: '', // Initialize quantity property
        bag: '',
      }));
      setProducts(productsWithCount);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCustomerChange = (value: string) => {
    setSelectedCustomer(value);
    setErrmsg('');
  };

  const [errmsg, setErrmsg] = useState<string | undefined>(undefined);
  const handlePress = () => {
    if (selectedCustomer) {
      setErrmsg('');
      dispatch(addCustomerNameToBill(selectedCustomer));
      console.log('Selected Customer ID:', selectedCustomer);
      navigation.navigate(screenName.BillTemplate as never);
    } else {
      setErrmsg(' *Please select customer');
    }
  };
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);

  const FetchCustomerFromBill = useSelector(
    (state: RootState) => state.billing.fetchCustomerFromBill,
  );
  useEffect(() => {
    // Calculate total product price
    const totalPrice = FetchCustomerFromBill.reduce((total, item) => {
      return total + item.quantity * item.sellingPrice;
    }, 0);
    setTotalProductPrice(totalPrice);
  }, [FetchCustomerFromBill]);

  const handleQuantityChange = (productId: string, quantity: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === productId ? {...product, quantity} : product,
      ),
    );
  };

  const handleBagChange = (productId: string, bag: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === productId ? {...product, bag} : product,
      ),
    );
  };

  const [errmsg2, setErrmsg2] = useState<string | undefined>(undefined);
  const [billAmount, setBillAmount] = useState<number >();
  const [pendingAmt, setPendingAmt] = useState<string>()

  const handleInputChange = (value: number) => {
    setBillAmount(value);
  };

  const handlePay = async () => {
    const amount = parseFloat(billAmount || "0");
    let pendingamount = totalProductPrice - amount;
  
    console.log(pendingamount, "pendingamount");
    
    if (amount > totalProductPrice) {
      setErrmsg("Entered amount is greater than the total purchased price");
    } else {
      setErrmsg("");
      try {
        console.log({ pendingamount, selectedCustomer }, "Data being sent to backend");
        const response = await axios.post('http://192.168.0.119:5000/api/customer/updatePendingAmt', { pendingamount, selectedCustomer });
        console.log(response.data);
      } catch (error) {
        console.log(error, "error from createbill screen");
      }
    }
  };
  

  const filteredcustomer = customers.filter((item) => item.customerName === selectedCustomer);
  console.log(filteredcustomer,"filteredcustomer");
  


  const fetchPendingAmount = useSelector(
    (state: RootState) => state.billing.fetchPendingAmount,
  );
  const fetchPendingAmountNum = parseFloat(fetchPendingAmount.toString());
  const totalProductPriceNum = parseFloat(totalProductPrice.toString());
  const totalamount  = fetchPendingAmountNum + totalProductPriceNum

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <CustomIcon
            color="#000"
            size={20}
            name="arrow-back"
            type="Ionicons"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Bill</Text>
        <CustomIcon
          color="#fff"
          size={20}
          name="checkbox-blank-outline"
          type="MaterialCommunityIcons"
        />
      </View>
     <ScrollView>
     <View style={styles.pickerContainer}>
        <View>
          <Text style={styles.label}>Select Customer</Text>
          <Picker
            selectedValue={selectedCustomer}
            onValueChange={handleCustomerChange}
            style={styles.picker}>
            <Picker.Item label="Select a customer..." value={undefined} />
            {customers.map((customer, index) => (
              <Picker.Item
                key={customer._id}
                label={customer.customerName}
                value={customer.customerName}
                style={{backgroundColor: index % 2 === 0 ? '#fff' : '#e6e6e6',color:"#000"}}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.label}>Select Product</Text>
          {
            <ScrollView  style={{height: '50%', gap: 10}}>
           
             <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                {products.map(item => {
                  const backgroundColor = Customerfrombill.some(
                    p => p._id === item._id,
                  )
                    ? '#e0ccff'
                    : '#f7f7f7';
                  return (
                    <Pressable
                      onPress={() => {}}
                      key={item._id}
                      style={{
                        backgroundColor,
                        width: '100%',
                        padding: 3,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        borderRadius: 8,
                      }}>
                      <View
                        style={{
                          width: '15%',
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
                          width: '40%',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#000',
                              fontWeight: '500',
                            }}>
                            {item.productName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#4d4d4d',
                              fontWeight: '500',
                            }}>
                            Selling Price : {item.sellingPrice}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#4d4d4d',
                              fontWeight: '500',
                            }}>
                            Purchased Price : {item.purchasePrice}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          alignItems: 'flex-start',
                          width: '30%',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 7,
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#4d4d4d',
                              fontWeight: '500',
                              alignItems: 'center',
                            }}>
                            Bag :
                          </Text>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '64%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 8,
                            }}>
                            <TextInput
                            keyboardType='numeric'
                              style={{
                                paddingRight: 10,
                                paddingLeft: 10,
                                borderRadius: 8,
                                color: '#000',
                                width: '80%',
                                padding: 0,
                              }}
                              value={item.bag}
                              onChangeText={text =>
                                handleBagChange(item._id, text)
                              }
                            />
                            <Text style={{color:"#333333"}}> bags</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 7,
                            alignItems: 'center',
                            height: 30,
                            justifyContent: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#4d4d4d',
                              fontWeight: '500',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            QTY :
                          </Text>
                          <View
                            style={{
                              width: '60%',
                              paddingTop: 0,
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <TextInput
                            keyboardType='numeric'
                              style={{
                                paddingRight: 10,
                                paddingLeft: 10,
                                borderRadius: 8,
                                color: '#000',
                                width: '80%',
                                padding: 0,
                              }}
                              value={item.quantity}
                              onChangeText={text =>
                                handleQuantityChange(item._id, text)
                              }
                            />
                            <Text style={{color:"#333333"}}> kg</Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          gap: 20,
                          padding: 5,
                          width: '15%',
                        }}>
                        {Customerfrombill.some(p => p._id === item._id) ? (
                          <TouchableOpacity
                            onPress={() => {
                              setCheckbox(true);
                              dispatch(removeCustomerFromBill(item._id)); // Fix the payload type
                              console.log(item._id, 'removed');
                            }}>
                            <CustomIcon
                              color={
                                Customerfrombill.some(p => p._id === item._id)
                                  ? '#196'
                                  : '#4d4d4d'
                              }
                              size={20}
                              name="checkbox"
                              type="Ionicons"
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              if (item.quantity && item.bag) {
                                setCheckbox(false);
                                console.log(item._id, 'added');
                                dispatch(addCustomerToBill(item)); // Fix the payload type
                                setErrmsg('');
                              } else {
                                setErrmsg(
                                  '*Please fill in both bag and quantity fields.',
                                );
                              }
                            }}>
                            <CustomIcon
                              color={
                                Customerfrombill.some(p => p._id === item._id)
                                  ? '#196'
                                  : '#4d4d4d'
                              }
                              size={20}
                              name="checkbox-blank-outline"
                              type="MaterialCommunityIcons"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
           
            </ScrollView>
          }
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(restCustomerBill());
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            padding: 10,
          }}>
          <Text style={{fontSize: 16, color: '#000'}}>Reset</Text>
        </TouchableOpacity>
        <View style={{gap:5}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          {filteredcustomer.map((item,id) =>{
            dispatch(GetPendingAmount(item.pendingAmount))
            return ( <Text style={{fontSize: 16, color: '#000'}}>
              Pending Amount: {item.pendingAmount}
            </Text>)
          })}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            }}>
          <Text style={{fontSize: 16, color: '#000'}}>
            Gross Amount: {totalProductPrice}
          </Text>
        </View>
        </View>
        <View style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center"}}>
          <TextInput
            placeholder="Enter bill amount to pay"
            keyboardType="numeric"
            style={{
              fontSize: 16,
              color: '#000',
              fontWeight: '500',
              width: '75%',
              padding: 5,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft:5
            }}
            value={billAmount}
            onChangeText={handleInputChange} // Ensure handleInputChange receives a string
          />
        </View>
        <TouchableOpacity onPress={handlePay} style={{justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#196',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,}}>
          <Text style={styles.buttonText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
        {errmsg ? (
          <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
            {errmsg}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Bill Preview</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBill;

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  pickerContainer: {
    marginTop: 20,
    height: '85%',
    gap: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 18,
    color: '#000',
  },
  productListContainer: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#8F62FF',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
