// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { screenName } from '../../utils/screenNames';
// import { api } from '../../../envfile/api';

// type productData = {
//   _id: string;
//   totalPurchase: string;
//   currentStock: string;
//   productName: string;
//   totalSales: string;
// };


// const Viewallstocks = () => {
//   const [editIndex, setEditIndex] = useState<number | null>(null); // Track which product is being edited
//   const [productData, setProductData] = useState<productData[]>([]);
// // console.log(productData,"hhhhh");

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch all products
//         const productResponse = await fetch(api+'/auth/product/getProduct');
//         const productData = await productResponse.json();
//         const formattedProductData = productData.data;

//         // Fetch stock data for each product
//         const stockPromises = formattedProductData.map(async (product) => {
//           const stockResponse = await fetch(api+`/stock/getStockData/${product._id}`);
//           const stockData = await stockResponse.json();
//           return {
//             ...product,
//             ...stockData.data,
//             productName: product.productName
//           };
//         });

//         const productsWithStock = await Promise.all(stockPromises);
//         setProductData(productsWithStock);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleUpdate = async (productId: string) => {
//     try {
//       console.log(productId,"productId");
      
//       const product = productData[editIndex!];
//       const response = await fetch(`http://192.168.0.119:5000/stock/updateStockData/${productId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           currentStock: product.currentStock,
//           totalPurchase: product.totalPurchase,
//           totalSales: product.totalSales,
//         }),
//       });

//       if (response.ok) {
//         Alert.alert('Success', 'Stock data updated successfully.');
//         setEditIndex(null);
//       } else {
//         Alert.alert('Error', 'Failed to update stock data.');
//       }
//     } catch (error) {
//       console.error("Failed to update stock data:", error);
//       Alert.alert('Error', 'An error occurred while updating stock data.');
//     }
//   };

//   const handleChange = (text: string, field: string, index: number) => {
//     const updatedProductData = [...productData];
//     updatedProductData[index] = { ...updatedProductData[index], [field]: parseInt(text) };
//     setProductData(updatedProductData);
//   };

//   const handleEditPress = (index: number) => {
//     setEditIndex(editIndex === index ? null : index);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//        showsVerticalScrollIndicator={false}
//        showsHorizontalScrollIndicator={false}
//       >
//         {productData.map((product, index) => {
//                     // console.log(product._id,"product._id");

//           return(
//             <View key={product._id} style={styles.stockInfo}>
//             <Text style={styles.productName}>Product: {product.productName}</Text>
//             <View style={styles.stockRow}>
//               <Text style={styles.label}>Stock:</Text>
//               {editIndex === index ? (
//                 <TextInput
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={String(product.currentStock)}
//                   onChangeText={(text) => handleChange(text, 'currentStock', index)}
//                 />
//               ) : (
//                 <Text style={styles.value}>{product.currentStock} kg</Text>
//               )}
//             </View>

//             <View style={styles.stockRow}>
//               <Text style={styles.label}>Purchase:</Text>
//               {editIndex === index ? (
//                 <TextInput
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={String(product.totalPurchase)}
//                   onChangeText={(text) => handleChange(text, 'totalPurchase', index)}
//                 />
//               ) : (
//                 <Text style={styles.value}>{product.totalPurchase}</Text>
//               )}
//             </View>

//             <View style={styles.stockRow}>
//               <Text style={styles.label}>Sales:</Text>
//               {editIndex === index ? (
//                 <TextInput
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={String(product.totalSales)}
//                   onChangeText={(text) => handleChange(text, 'totalSales', index)}
//                 />
//               ) : (
//                 <Text style={styles.value}>{product.totalSales}</Text>
//               )}
//             </View>

//             {/* <Pressable onPress={() => handleEditPress(index)} style={styles.editButtonContainer}>
//               <Text style={styles.editButton}>
//                 {editIndex === index ? 'Cancel' : editIndex === null ? 'Edit' : 'More'}
//               </Text>
//             </Pressable> */}

//             {editIndex === index && (
//               <Button title="Update" onPress={() => handleUpdate(product._id)} />
//             )}
//           </View>
//           )
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
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
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color:"#000"
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
//     fontSize: 16,
//   },
//   editButtonContainer: {
//     alignItems: 'center',
//   },
//   editButton: {
//     color: 'blue',
//     fontSize: 16,
//     marginTop: 10,
//   },
// });

// export default Viewallstocks;


import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { api } from '../../../envfile/api';

type productData = {
  _id: string;
  totalPurchase: string;
  currentStock: string;
  productName: string;
  totalSales: string;
};

const Viewallstocks = () => {
    const [editIndex, setEditIndex] = useState<number | null>(null); // Track which product is being edited
  const [productData, setProductData] = useState<productData[]>([]);
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
    <View style={{padding:20}}>
      <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      >
        {productData.map((product, index) => {
                    // console.log(product._id,"product._id");

          return(
           <View key={index} style={{width:wp("90%"),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",paddingBottom:20}}>
             
            <View key={product._id} style={{paddingTop: 20,width:wp("90%"),display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"#fff",borderRadius:10,padding:10}}>

               <View style={{flexDirection:"row",gap:20,width:wp("80%"),display:"flex",justifyContent:"space-between"}}>

               <Text style={{ fontSize: hp(2.1),fontWeight: 'bold',paddingBottom: 10,color:"#000"}}>Product:</Text>
               <Text style={{fontSize: hp(2.1),fontWeight:"bold",color:"#9542f5"}}>{product.productName}</Text>

               </View>


            <View style={{flexDirection: 'row',width:wp("80%"),display:"flex",justifyContent: 'space-between',paddingBottom: 10}}>

             <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",}}>
             <Text style={{fontSize: hp(2),fontWeight: 'bold',color:"#000"}}>Stock:</Text> 
             </View>
               <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",}}>
              
                <Text style={{fontSize: hp(2),color: "#000",}}>{product.currentStock} kg</Text>
              
               </View>

            </View>


            <View style={{flexDirection: 'row',width:wp("80%"),display:"flex",justifyContent: 'space-between',paddingBottom: 10,}}>

              <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
              <Text  style={{fontSize: hp(2),fontWeight: 'bold',color:"#000"}}>Purchase:</Text>
              </View>

              <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
              
                <Text style={{fontSize: hp(2),color: "#000",}}>{product.totalPurchase}</Text>
              </View>
            </View>

             <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingBottom: 10,width:wp("80%"),display:"flex"}}>

              <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
              <Text style={{fontSize: hp(2),fontWeight: 'bold',color:"#000"}}>Sales:</Text>

              </View>
              <View style={{display:"flex",flexDirection:"row"}}>
            
                <Text style={{fontSize: hp(2),color: "#000",}}>{product.totalSales}</Text>
              
              </View>
            </View>

          
          </View> 

           </View>
          )
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default Viewallstocks;