// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Dropdown } from 'react-native-element-dropdown';
// import { ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { screenName } from '../../utils/screenNames';
// import { color } from '@rneui/themed/dist/config';
// import { bg_color_primary } from '../../utils/theme/commonStyles';
// import { api } from '../../../envfile/api';

// const StockUpdate = () => {
//   const [value, setValue] = useState<string | null>(null);
//   const [isFocus, setIsFocus] = useState(false);
//   const [productData, setProductData] = useState([]);
//   const [stockData, setStockData] = useState({ productName: "", currentStock: 0, totalPurchase: 0, totalSales: 0 });

//   const [editStock, setEditStock] = useState(false);
//   const [editPurchase, setEditPurchase] = useState(false);
//   const [editSales, setEditSales] = useState(false);
// console.log(value,"hfdg");

//   const navgation = useNavigation()

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(api+'/auth/product/getProduct');
//         const data = await response.json();
//         const formattedData = data.data.map((product) => ({
//           label: product.productName,
//           value: product._id,
//         }));
//         setProductData(formattedData);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (value) {
//       const fetchStockData = async () => {
//         try {
//           const response = await fetch(api+"/stock/getStockData/${value}");
//           const data = await response.json();
//           console.log('Stock Data fetched:', data); // Log the full stock data
//           if (data.status === 'ok' && data.data) {
//             const selectedProduct = productData.find((product) => product.value === value);
//             const productName = selectedProduct ? selectedProduct.label : "";
//             setStockData({ ...data.data, productName }); // Update to use the nested 'data' object and set product name
//           } else {
//             setStockData({ productName: "", currentStock: 0, totalPurchase: 0, totalSales: 0 });
//           }
//         } catch (error) {
//           console.error("Failed to fetch stock data:", error);
//         }
//       };

//       fetchStockData();
//     }
//   }, [value, productData]);

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(api+'/stock/updateStockData/${value}', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(stockData),
//       });

//       if (response.ok) {
//         Alert.alert('Success', 'Stock data updated successfully.');
//         setEditStock(false);
//         setEditPurchase(false);
//         setEditSales(false);
//       } else {
//         Alert.alert('Error', 'Failed to update stock data.');
//       }
//     } catch (error) {
//       console.error("Failed to update stock data:", error);
//       Alert.alert('Error', 'An error occurred while updating stock data.');
//     }
//   };

//   return (
//     <View>
//       <ScrollView>
//       <View style={styles.container}>
//         <Dropdown
//           style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={productData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? 'Select Product' : '...'}
//           searchPlaceholder="Search..."
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={item => {
//             setValue(item.value);
//             setIsFocus(false);
//           }}
//           // renderLeftIcon={() => (
//           //   <AntDesign
//           //     style={styles.icon}
//           //     color={isFocus ? 'blue' : 'black'}
//           //     name="Safety"
//           //     size={20}
//           //   />
//           // )}
//         />

//         <View style={styles.stockInfo}>
//           <Text style={styles.productName}>Product{stockData.productName}</Text>
//           <View style={styles.stockRow}>
//             <View style={{width:"50%"}}>
//             <Text style={styles.label}>Stock:</Text>
//             </View>
//             <View style={{width:"50%",display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
//             {editSales ? (
//               <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 value={String(stockData.currentStock)}
//                 onChangeText={(text) => setStockData({ ...stockData, currentStock: parseInt(text) })}
//               />
//             ) : (
//               <Text style={styles.value}>{stockData.currentStock} kg</Text>
//             )}
//               </View>

//             {/* <Pressable onPress={() => setEditStock(!editStock)}>
//               <Text style={styles.editButton}>{editStock ? 'Save' : 'Edit'}</Text>
//             </Pressable> */}
//           </View>

//           <View style={styles.stockRow}>
//             <View style={{width:"50%"}}>
//             <Text style={styles.label}>Purchase:</Text>

//             </View>
//             <View style={{width:"50%",display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
//             {editSales ? (
//               <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 value={String(stockData.totalPurchase)}
//                 onChangeText={(text) => setStockData({ ...stockData, totalPurchase: parseInt(text) })}
//               />
//             ) : (
//               <Text style={styles.value}>{stockData.totalPurchase}</Text>
//             )}
              
//             </View>

//             {/* <Pressable onPress={() => setEditPurchase(!editPurchase)}>
//               <Text style={styles.editButton}>{editPurchase ? 'Save' : 'Edit'}</Text>
//             </Pressable> */}
//           </View>

//           <View style={styles.stockRow}>
//                  <View style={{width:"50%"}}>   
//                    <Text style={styles.label}>Sales:</Text>
//                  </View>
//           <View style={{width:"50%",display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
//           {editSales ? (
//               <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 value={String(stockData.totalSales)}
//                 onChangeText={(text) => setStockData({ ...stockData, totalSales: parseInt(text) })}
//               />
//             ) : (
//               <Text style={styles.value}>{stockData.totalSales}</Text>
//             )}
//           </View>
//             {/* <Pressable onPress={() => setEditSales(!editSales)}>
//               <Text style={styles.editButton}>{editSales ? 'Save' : 'Edit'}</Text>
//             </Pressable> */}
//           </View>
//    <View style={{flexDirection:"row",width:"100%",display:"flex",justifyContent:"space-between",paddingTop:20}}>
           
        
//           <Pressable onPress={handleUpdate} style={{padding:10,backgroundColor:"#0996e8",borderRadius:5,width:"25%",alignItems:"center"}}>
//             <Text style={{color:"#fff"}}>Update All</Text>
//           </Pressable>
//           <Pressable onPress={() => setEditSales(!editSales)} style={{padding:10,backgroundColor:"#0996e8",borderRadius:5,width:"25%",alignItems:"center"}}>
//             <Text style={{color:"#fff"}}>Edit</Text>
//           </Pressable>
          
//    </View>
//         </View>
//       </View>
//     </ScrollView>
//     <View style={{marginHorizontal: 15, marginVertical: 15,}}>
//                 <TouchableOpacity
//                 onPress={()=>{
//                   navgation.navigate(screenName.Viewallstocks);
//                 }}
//                   style={{
//                     width: '100%',
//                     backgroundColor: '#8F62FF',
//                     padding: 10,
//                     borderRadius: 8,
//                     justifyContent: 'flex-end',
//                     alignItems: 'center',
//                   }}   
//                  >
                 
//                     <Text
//                       style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
//                       View All Products
//                     </Text>
                 
//                 </TouchableOpacity>
//               </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     width:"100%",
//     display:"flex",
//     justifyContent:"center",
//     flexDirection:"column",
//     alignItems:"center"
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     width:"93%",
//     color:"#000"
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color:"#000"
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color:"#000"
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     color:"#000"
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   stockInfo: {
//     marginTop: 20,
    
//   },
//   productName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color:"#000"
//   },
//   stockRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderRadius:5,
//     borderWidth:1,
//     padding:10,
//     borderColor:"#904dbd",
//     width:"100%"
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color:"#000",

   
    
//   },
//   value: {
//     fontSize: 18,
//     width: '40%',
//     color: "#000",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     padding: 5,
//     width: '40%',
//     // width:"auto",
//     fontSize: 16,
//     color:"#000"
//   },
//   editButton: {
//     color: 'blue',
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });

// export default StockUpdate;










import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';
import { color } from '@rneui/themed/dist/config';
import { bg_color_primary } from '../../utils/theme/commonStyles';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
          const response = await fetch(api+"/stock/getStockData/${value}");
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
      const response = await fetch(api+'/stock/updateStockData/${value}', {
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
      <View style={{ padding: 20,width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
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
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />

        <View style={{paddingTop: 20,width:wp("90%")}}>
          <Text style={{fontSize: hp(2.2),fontWeight: 'bold',paddingBottom: 10,color:"#000"}}>PRODUCT{stockData.productName}</Text>
           

        <View style={{flexDirection:"column",gap:10}}>
        <View style={{flexDirection: 'row',width:wp("90%"),justifyContent: 'space-between',alignItems: 'center',paddingBottom: 10,backgroundColor:"#FFF",elevation:5,padding:10,borderColor:"#904dbd"}}>
            <View style={{width:wp("20%")}}>
            <Text style={{fontSize: hp(2),fontWeight: 'bold',color:"#000",}}>Stock:</Text>
            </View>
            <View style={{width:wp("60%"),display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
            {editSales ? (
              <TextInput
                style={{borderWidth: 1,borderColor: 'gray',borderRadius: 5,padding: 5,width:wp("17%"),fontSize: 16,color:"#000"}}
                keyboardType="numeric"
                value={String(stockData.currentStock)}
                onChangeText={(text) => setStockData({ ...stockData, currentStock: parseInt(text) })}
              />
            ) : (
              <Text style={{fontSize: hp(2),color: "#000",}}>{stockData.currentStock} kg</Text>
            )}
              </View>

            {/* <Pressable onPress={() => setEditStock(!editStock)}>
              <Text style={styles.editButton}>{editStock ? 'Save' : 'Edit'}</Text>
            </Pressable> rvcvbnmdfghjklfghujiopoiuytrertyuiuugyyhutygtbuyvarshnih*/}
          </View>

          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingBottom: 10,borderRadius:5,backgroundColor:"#FFF",elevation:5,padding:10,width:"100%"}}>
            <View style={{width:wp("20%")}}>
            <Text style={{fontSize: hp(2),fontWeight: 'bold',color:"#000",}}>Purchase:</Text>

            </View>
            <View style={{width:wp("60%"),display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
            {editSales ? (
              <TextInput
              style={{borderWidth: 1,borderColor: 'gray',borderRadius: 5,padding: 5,width:wp("17%"),fontSize: 16,color:"#000"}}
                keyboardType="numeric"
                value={String(stockData.totalPurchase)}
                onChangeText={(text) => setStockData({ ...stockData, totalPurchase: parseInt(text) })}
              />
            ) : (
              <Text style={{fontSize: hp(2),color: "#000",}}>{stockData.totalPurchase}</Text>
            )}
              
            </View>

            {/* <Pressable onPress={() => setEditPurchase(!editPurchase)}>
              <Text style={styles.editButton}>{editPurchase ? 'Save' : 'Edit'}</Text>
            </Pressable> */}
          </View>

          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingBottom: 10,borderRadius:5,backgroundColor:"#FFF",elevation:5,padding:10,width:"100%"}}>
                 <View style={{width:wp("20%")}}>   
                   <Text style={{fontSize: hp(2),fontWeight: 'bold',color:"#000",}}>Sales:</Text>
                 </View>
          <View style={{width:wp("60%"),display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
          {editSales ? (
              <TextInput
              style={{borderWidth: 1,borderColor: 'gray',borderRadius: 5,padding: 5,width:wp("17%"),fontSize: 16,color:"#000"}}
                keyboardType="numeric"
                value={String(stockData.totalSales)}
                onChangeText={(text) => setStockData({ ...stockData, totalSales: parseInt(text) })}
              />
            ) : (
              <Text style={{fontSize: hp(2),color: "#000"}}>{stockData.totalSales}</Text>
            )}
          </View>
            {/* <Pressable onPress={() => setEditSales(!editSales)}>
              <Text style={styles.editButton}>{editSales ? 'Save' : 'Edit'}</Text>
            </Pressable> */}
          </View>
        </View>


   <View style={{flexDirection:"row",width:wp("90%"),display:"flex",justifyContent:"space-between",paddingTop:20}}>
           
        
          <Pressable onPress={handleUpdate} style={{padding:10,backgroundColor:"#8F62FF",borderRadius:5,width:wp("23%"),alignItems:"center"}}>
            <Text style={{color:"#fff",fontSize: hp(1.5), fontWeight: '600'}}>Update All</Text>
          </Pressable>
          <Pressable onPress={() => setEditSales(!editSales)} style={{padding:10,backgroundColor:"#8F62FF",borderRadius:5,width:wp("23%"),alignItems:"center"}}>
            <Text style={{color:"#fff",fontSize: hp(1.5), fontWeight: '600'}}>Edit</Text>
          </Pressable>
          
   </View>
        </View>
      </View>
    </ScrollView>
    <View style={{paddingHorizontal: 15, paddingVertical: 15,width:wp("100%"),display:"flex",flexDirection:"row",justifyContent:"center"}}>
                <TouchableOpacity
                onPress={()=>{
                  navgation.navigate(screenName.Viewallstocks); 
                }}
                  style={{
                    width:wp("90%"),
                    backgroundColor: '#8F62FF',
                    padding: 10,
                    borderRadius: 8,
                   
                    alignItems: 'center',
                  }}   
                 >
                 
                    <Text
                      style={{fontSize: hp(1.8), color: '#fff', fontWeight: '600'}}>
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
    width:"100%",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center"
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width:"93%",
    color:"#000"
  },
  placeholderStyle: {
    fontSize: 16,
    color:"#000"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"#000"
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:"#000"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    paddingRight: 5,
  },
  stockInfo: {
    paddingTop: 20,
    
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    color:"#000"
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius:5,
    borderWidth:1,
    padding:10,
    borderColor:"#904dbd",
    width:"100%"
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#000",

   
    
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
    color:"#000"
  },
  editButton: {
    color: 'blue',
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default StockUpdate;