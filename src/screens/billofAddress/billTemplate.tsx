import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';

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
  console.log(Customername, 'dsf');
  const [currentDate, setCurrentDate] = useState<String>('');
  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
  }, []);


  const FetchCustomerFromBill = useSelector((state: RootState) => state.billing.fetchCustomerFromBill);
  // console.log(FetchCustomerFromBill, 'FetchCustomerFromBill');

  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);

  useEffect(() => {
    // Calculate total product price
    const totalPrice = FetchCustomerFromBill.reduce((total, item) => {
      return total + (item.quantity * item.sellingPrice);
    }, 0);
    setTotalProductPrice(totalPrice);
    console.log(totalProductPrice,"totalProductPrice");
    
  }, [FetchCustomerFromBill]);
  return (
    <View
      style={{
        width: wp('100%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
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
              098947 54308
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
              090420 66533
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
          top: 40,
        }}>
        <View
          style={{
            width: wp('87%'),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../../assets/images/Logo.png')}
            style={{height: hp(6), width: wp(25)}}
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
            SK VEGETABLES
          </Text>
          <Text
            style={{color: '#1D6B39', fontWeight: 'bold', textAlign: 'center'}}>
            Wholesale of CURRY LEAF, MALLY, PUTHINA ORDER SUPPLIERS
          </Text>
          <Text style={{color: '#1D6B39', fontWeight: 'bold'}}>
            No.10 Transport Market, Karamadai, Coimbatore Dist.
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
            <Text style={{color: '#1D6B39'}}>1600</Text>
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
          {FetchCustomerFromBill.map((item,id)=>{
            const productprice = item.quantity * item.sellingPrice;
            const ttprice = productprice + productprice

            return( <View style={styles.row}>
              <View style={[styles.cell, styles.rateCell, styles.cellBorder]}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>{item.sellingPrice}</Text>
              </View>
              <View style={[styles.cell, styles.particularsCell, styles.cellBorder]}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>{item.productName}</Text>
              </View>
              <View style={[styles.cell, styles.qtyCell, styles.cellBorder]}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                {item.quantity}
                </Text>
              </View>
              <View style={[styles.cell, styles.bagCell, styles.cellBorder]}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>{item.bag}</Text>
              </View>
              <View style={[styles.cell, styles.amountCell]}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                {productprice}
                </Text>
              </View>
            </View>)
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
            }}>
            <Text style={{fontWeight: 'bold', color: '#1D6B39', fontSize: 16}}>
              Pending Amount : ₹
            </Text>
            <Text
              style={{
                width: '19%',
                fontWeight: 'bold',
                color: '#1D6B39',
                fontSize: 16,
              }}>
              {totalProductPrice}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text style={{fontWeight: 'bold', color: '#1D6B39', fontSize: 16}}>
              Total Price : ₹
            </Text>
            <Text
              style={{
                width: '19%',
                fontWeight: 'bold',
                color: '#1D6B39',
                fontSize: 16,
              }}>
              7000
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

      <Pressable
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
