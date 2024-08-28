import React, {useEffect, useState ,useRef} from 'react';
import {Image} from 'react-native';
import {View, Text, StyleSheet, FlatList, Pressable,Button} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';


import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import axios from 'axios';
import { api } from '../../../envfile/api';

interface Item {
  item: string;
  quantity: number;
  price: number;
  bag: number;
  sellingPrice: number;
  productName: string;
}



const BillTemplate: React.FC = () => {
  const Customername = useSelector((state: RootState) => state.billing.name);
  const [currentDate, setCurrentDate] = useState<String>('');
  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
  }, []);

  const FetchCustomerFromBill = useSelector(
    (state: RootState) => state.billing.fetchCustomerFromBill,
  );

  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);

  useEffect(() => {
    // Calculate total product price
    const totalPrice = FetchCustomerFromBill.reduce((total, item) => {
      return total + (item.quantity1 * item.bag1* item.sellingPrice) + (item.quantity2 * item.bag2* item.sellingPrice) 
    }, 0);
    setTotalProductPrice(totalPrice);
  }, [FetchCustomerFromBill]);

  const viewShotRef = useRef();

  const captureAndPrint = async () => {
    try {
      // Capture the screen
      const uri = await viewShotRef.current.capture();
      console.log('Screenshot URI:', uri);

      // Convert the image to base64
      const base64Image = await RNFS.readFile(uri, 'base64');

      // Prepare the HTML content with the captured image
      const htmlContent = `
        <html>
          <body>
            <img src="data:image/png;base64,${base64Image}" style="width: 100%;" />
          </body>
        </html>
      `;

      // Generate PDF from HTML content
      const options = {
        html: htmlContent,
        fileName: Customername,
        directory: 'Documents',
      };
 
      const pdf = await RNHTMLtoPDF.convert(options);
      console.log('PDF Path:', pdf.filePath);

      // Print the generated PDF
      await RNPrint.print({ filePath: pdf.filePath });
    } catch (error) {
      console.error('Error capturing and printing:', error);
    }
  };
  const captureScreenshot = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      console.log('Screenshot URI:', uri);

      // Save the screenshot to a file
      const filePath = `${RNFS.DocumentDirectoryPath}/screenshot.png`;
      await RNFS.moveFile(uri, filePath);

      // Share the screenshot file
      const shareOptions = {
        title: 'Share Screenshot',
        url: `file://${filePath}`,
        type: 'image/png',
      };
      Share.open(shareOptions);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };


  const fetchPendingAmount = useSelector(
    (state: RootState) => state.billing.fetchPendingAmount,
);

const [invoiceCount, setInvoiceCount] = useState(null); // Set initial state to null

const fetchInvoiceCount = async () => {
  try {
    const response = await axios.get(api + "/api/invoice/getInvoicecount");
    console.log(response.data, "invoiceCount"); // Log the response to verify
    setInvoiceCount(response.data.data); // Access the data property
  } catch (error) {
    console.log(error, "fetch invoice count error");
  }
};

useEffect(() => {
  fetchInvoiceCount();
}, []);
  return (
    <View
      style={{
        width: wp('100%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
         <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
      <View style={{backgroundColor:"#fff", height:hp("90%")}}>
      <View
        style={{
          width: wp('87%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 20,
          position: 'relative',
                   
        }}>   
        <View style={{width: '40%'}}></View>
        <View style={{width: '25%'}}>
          <View
            style={{
              borderWidth: 1,
              padding: 1,
              borderColor: '#1D6B39',
              width: wp('20%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: '#1D6B39', fontWeight: 'bold', fontSize: hp(1.5)}}>
              CASH BILL
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', gap: 2, width: wp('25%')}}>
          <View style={{flexDirection: 'row', width: wp('25%')}}>
            <Text
              style={{
                color: '#1D6B39',
                fontWeight: 'bold',
                fontSize: hp(1.9),
                width: wp('10%'),
              }}>
              Cell :
            </Text>
            <Text
              style={{
                color: '#1D6B39',
                fontWeight: 'bold',
                fontSize: hp(1.9),
                width: wp('30%'),
              }}>
              98659 21275
            </Text>
          </View>
          <View style={{flexDirection: 'row', width: wp('25%')}}>
            <Text
              style={{
                color: '#1D6B39',
                fontWeight: 'bold',
                fontSize: hp(1.9),
                width: wp('10%'),
              }}></Text>
            <Text
              style={{
                color: '#1D6B39',
                fontWeight: 'bold',
                fontSize: hp(1.9),
                width: wp('30%'),
              }}>
              98422 02175
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: wp('100%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          top: 30,
        }}>
        <View
          style={{
            width: wp('87%'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../../assets/images/murugarlogo.png')}
            style={{height: hp(9), width: wp(15)}}
          />
        </View>
      </View>

      <View
        style={{
          width: wp('100%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: 40,
        }}>
        <View
          style={{
            width: wp('87%'),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#1D6B39', fontWeight: 'bold', fontSize: hp(4)}}>
          K.M. DURAI & SONS
          </Text>
          <Text
            style={{color: '#1D6B39', fontWeight: 'bold', textAlign: 'center'}}>
            VEGETABLES TRANSPORTING MUNDY, 
          </Text>
          <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>
          Karamadai - 641104
          </Text>
        </View>
      </View>

      <View
        style={{
          width: wp('100%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 10,
        }}>
        <View
          style={{
            width: wp('80%'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', gap: 3}}>
            <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>No.</Text>
            <Text style={{color: '#1D6B39',fontWeight: 'bold'}}>{invoiceCount + 1 }</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>Date : </Text>
            <View
              style={{
                paddingLeft: 5,
                borderBottomWidth: 1,
                borderStyle: 'dotted',
              }}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
                {currentDate}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          width: wp('100%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{width: wp('80%'), display: 'flex', flexDirection: 'row'}}>
          <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>To :</Text>

          <View
            style={{
              paddingLeft: 5,
              borderBottomWidth: 1,
              width: '100%',
              borderStyle: 'dotted',
            }}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
              {Customername}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={[styles.header]}>
          <Text
            style={[styles.headerText, styles.rateHeader, styles.headerBorder]}>
            Rate
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.particularsHeader,
              styles.headerBorder,
            ]}>
            Particulars
          </Text>
          <Text
            style={[styles.headerText, styles.qtyHeader, styles.headerBorder]}>
            Qty
          </Text>
          <Text
            style={[styles.headerText, styles.bagHeader, styles.headerBorder]}>
            Bag
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.amountHeader,
              styles.headerBorder,
            ]}>
            Amount
          </Text>
        </View>
        <View
          style={{borderWidth: 2, borderColor: '#1D6B39', borderTopWidth: 1}}>
          {FetchCustomerFromBill.map((item, id) => {
            const productprice1 = (item.quantity1 * item.bag1* item.sellingPrice) 
            const productprice2 = (item.quantity2 * item.bag2* item.sellingPrice) 
            return (
              <View>
                <View style={styles.row} key={id}>
                <View style={[styles.cell, styles.rateCell, styles.cellBorder]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.sellingPrice}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    styles.particularsCell,
                    styles.cellBorder,
                  ]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.productName}
                  </Text>
                </View>
                <View style={[styles.cell, styles.qtyCell, styles.cellBorder]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.quantity1}
                  </Text>
                </View>
                <View style={[styles.cell, styles.bagCell, styles.cellBorder]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.bag1}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 8,
                    width: wp('20%'),
                  }}>
                  <Text
                    style={{
                      color: 'green',
                      fontWeight: 'bold',
                      justifyContent: 'flex-end',
                    }}>
                    {productprice1}
                  </Text>
                </View>
              </View>
              {item.bag2 == "0" ? (<View></View>) : 
             ( <View style={styles.row} key={id}>
                <View style={[styles.cell, styles.rateCell, styles.cellBorder]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.sellingPrice}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    styles.particularsCell,
                    styles.cellBorder,
                  ]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.productName}
                  </Text>
                </View>
                <View style={[styles.cell, styles.qtyCell, styles.cellBorder]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.quantity2}
                  </Text>
                </View>
                <View style={[styles.cell, styles.bagCell, styles.cellBorder]}>
                  <Text style={{color: 'green', fontWeight: 'bold'}}>
                    {item.bag2}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 8,
                    width: wp('20%'),
                  }}>
                  <Text
                    style={{
                      color: 'green',
                      fontWeight: 'bold',
                      justifyContent: 'flex-end',
                    }}>
                    {productprice2}
                  </Text>
                </View>
              </View>)}
              </View>
              
            );
          })}
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: '#1D6B39',
            borderTopWidth: 0,
            width: '100%',
            padding: 2,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#1D6B39', fontSize: 16}}>
              Gross Amount :
            </Text>
            <Text
              style={{
                width: '18%',
                fontWeight: 'bold',
                color: '#1D6B39',
                fontSize: 16,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              ₹ {totalProductPrice}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#1D6B39', fontSize: 16}}>
              Pending Amount :
            </Text>
            <Text
              style={{
                width: '18%',
                fontWeight: 'bold',
                color: '#1D6B39',
                fontSize: 16,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              ₹ {fetchPendingAmount}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#1D6B39', fontSize: 16}}>
              Total Price :
            </Text>
            <Text
              style={{
                width: '18%',
                fontWeight: 'bold',
                color: '#1D6B39',
                fontSize: 16,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              ₹ {Number(totalProductPrice) + Number(fetchPendingAmount)  }
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: wp('100%'),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: wp('95%'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>
            For UDHAYAKUMAR
          </Text>
        </View>
      </View>
      </View>

      </ViewShot>
  

      <View style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-around"}}>
      <Pressable
      onPress={captureScreenshot}
        style={{
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#1D6B39',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
          Share
        </Text>
      </Pressable><Pressable
      onPress={captureAndPrint}
        style={{
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: '#1D6B39',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
          Print
        </Text>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1D6B39',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
    color: 'green',
  },
  rateHeader: {
    width: wp('10%'),
  },
  particularsHeader: {
    width: wp('40%'),
  },
  qtyHeader: {
    width: wp('15%'),
  },
  bagHeader: {
    width: wp('10%'),
  },
  amountHeader: {
    width: wp('20%'),
  },
  headerBorder: {
    borderColor: '#1D6B39',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  rateCell: {
    width: wp('10%'),
  },
  particularsCell: {
    width: wp('40%'),
  },
  qtyCell: {
    width: wp('15%'),
  },
  bagCell: {
    width: wp('10%'),
  },
  amountCell: {
    width: wp('20%'),
  },
  cellBorder: {
    borderRightWidth: 1,
    borderColor: '#1D6B39',
  },
});

export default BillTemplate;