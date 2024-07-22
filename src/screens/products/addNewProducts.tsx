import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {OnboardingButton} from '../../components/commonButton';
import {TopHeader} from '../../components/commonComponents';
import {labels} from '../../utils/labels';
import {screenName} from '../../utils/screenNames';
import {colors} from '../../utils/theme/colors';
import {
  bg_color_white,
  flex1,
  flexRow,
  justifyBetween,
  mh15,
  mv15,
} from '../../utils/theme/commonStyles';
import {UploadImageCard} from './uploadImageCard';
import axios from 'axios';

export type AddNewProductsProps = {};

const AddNewProducts = (props: AddNewProductsProps) => {
  const [formValues, setFormValues] = useState({
    productName: '',
    sellingPrice: '',
    purchasePrice: '',
    image: '',
  });
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();

  const handleInputChange = (name: string, value: string) => {
    setFormValues({...formValues, [name]: value});
  };

  const handleSaveBtnClick = async () => {
    if (
      !formValues.productName ||
      !formValues.sellingPrice ||
      !formValues.purchasePrice
    ) {
      
      setErrorMsg('All input fields are required.');
    } else {
        try {
            const response = await axios.post(
              'http://192.168.0.119:5000/auth/product/postproduct',
              { productName: formValues.productName,
                sellingPrice: formValues.sellingPrice,
                purchasePrice: formValues.purchasePrice,
                image: formValues.image,},
            );
    
            console.log(response.data);
            setFormValues({
              productName: '',
              sellingPrice: '',
              purchasePrice: '',
              image: '',
            });
          } catch (error) {
            console.error('Product post failed', error);
          }
      setErrorMsg('');
   
    }
  };

  const handleCancelBtnClick = () => {
    setIsActiveBtn(false);
    setFormValues({
      productName: '',
      sellingPrice: '',
      purchasePrice: '',
      image: '',
    });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, []),
  );

  return (
    <View style={{flex:1,height:"100%",width:"100%",flexDirection:"column",justifyContent:"space-between"}}>
      <View style={{marginHorizontal: 15, marginVertical: 15,height:"85%",}}>
        <TopHeader headerText={labels.addNewProduct} />
        <ScrollView>
          <View style={{paddingBottom: '5%'}}>
            <View style={[mv15]}>
              <UploadImageCard
                title={labels.customerImage}
                sizeInfo={labels.sizeOfImg1}
                onImageSelect={(base64: string) =>
                  handleInputChange('image', base64)
                }
              />
            </View>
            <View>
              <Text style={{marginVertical: 8, color: '#000'}}>
                {labels.productName}
              </Text>
              <TextInput
                placeholder={labels.enterProductName}
                placeholderTextColor="#000" 
                value={formValues.productName}
                onChangeText={text => handleInputChange('productName', text)}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 8,
                  borderRadius: 8,
                  color: '#000',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <View style={{flex: 1, marginRight: 8}}>
                  <Text style={{marginVertical: 8, color: '#000'}}>
                    {labels.sellingPrice}
                  </Text>
                  <TextInput
                  keyboardType='number-pad'
                    placeholder={labels.addSellingPrice}
                    placeholderTextColor="#000" 
                    value={formValues.sellingPrice}
                    onChangeText={text =>
                      handleInputChange('sellingPrice', text)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 8,
                      borderRadius: 8,
                      color: '#000',
                    }}
                  />
                </View>
                <View style={{flex: 1, marginLeft: 8}}>
                  <Text style={{marginVertical: 8, color: '#000'}}>
                    {labels.purchasePrice}
                  </Text>
                  <TextInput
                  keyboardType='number-pad'
                    placeholder={labels.enterPurchasePrice}
                    placeholderTextColor="#000" 
                    value={formValues.purchasePrice}
                    onChangeText={text =>
                      handleInputChange('purchasePrice', text)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 8,
                      borderRadius: 8,
                      color: '#000',
                    }}
                  />
                </View>
              </View>
              {errorMsg ? (
                <Text style={{color: 'red', marginVertical: 10}}>
                  {errorMsg}
                </Text>
              ) : null}
              <View style={[flexRow, justifyBetween, {marginVertical: 20}]}>
                <OnboardingButton
                  width={160}
                  title={labels.reset}
                  onChange={handleCancelBtnClick}
                  backgroundColor={
                     colors.greySeven
                  }
                  color={ colors.blackOne}
                />
                <OnboardingButton
                  width={160}
                  title={labels.addtoproducts}
                  onChange={handleSaveBtnClick}
                  backgroundColor={
                    colors.primary                  }
                  color={colors.white}
                />
              </View>
              
            </View>
          </View> 
        </ScrollView>
        
      </View>
      <View style={{marginHorizontal: 15, marginVertical: 15,}}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    backgroundColor: '#8F62FF',
                    padding: 10,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}   
                  onPress={() => {
                    setLoading(true);
                    navigation.navigate(screenName.Products as never);
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      animating={true}
                      size="small"
                      color="#fff"
                    />
                  ) : (
                    <Text
                      style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
                      View All Products
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
    </View>
  );
};

export default AddNewProducts;
