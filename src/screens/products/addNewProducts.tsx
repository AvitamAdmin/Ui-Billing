import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, RoundCheckBox, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H14blackOne600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { bg_color_white, flex1, flexRow, justifyBetween, mh15, mv15 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from './uploadImageCard';

export type AddNewProductsProps = {}



const AddNewProducts = (props: AddNewProductsProps) => {
    const [isChecked, setIsChecked] = useState(true);
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const navigation =useNavigation()

    const handleProductClick = () => {
        setIsChecked(true);
    };

    const handleServiceClick = () => {
        setIsChecked(false);
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
        navigation.navigate(screenName.Products as never)

    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
    };
    const {
        control,
    } = useForm();
    const formKeys = {
        productName: 'product name',
        productCode: 'productCode',
        productCategory: 'productCategory',
        sellingPrice: 'SellingPrice',
        purchasePrice: 'purchasePrice',
        units: 'units',
        discountType: 'discountType',
        discountValue: 'discountValue',
        barcode: 'barcode',
        alertquantity: 'alertQuantity',
        tax: 'tax',

    };

    return (
        <View style={[flex1, bg_color_white]}>
            <View style={[mh15, mv15]}>
                <TopHeader headerText={labels.addNewProduct} />
                <ScrollView>
                    <View style={{ paddingBottom: '5%' }}>
                        <View style={[mv15]}>
                            <UploadImageCard title={labels.customerImage} sizeInfo={labels.sizeOfImg1} onUpload={() => { }} onDelete={() => { }} />
                        </View>
                        <H14blackOne600>Item Type</H14blackOne600>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                            <RoundCheckBox
                                title={labels.products}
                                onChange={handleProductClick}
                                borderColor={isChecked ? colors.primary : colors.greyFour}
                                backgroundColor={isChecked ? colors.primary : 'transparent'}
                                textColor={isChecked ? colors.primary : colors.blackTwo} />
                            <RoundCheckBox
                                title={labels.services}
                                onChange={handleServiceClick}
                                borderColor={isChecked ? colors.greyFour : colors.primary}
                                backgroundColor={isChecked ? 'transparent' : colors.primary}
                                textColor={isChecked ? colors.blackTwo : colors.primary} />
                        </View>
                        <View>
                            <CustomTextInputField name={formKeys.productName} control={control} placeholder={labels.enterProductName} label={labels.productName} />
                            <CustomTextInputField name={formKeys.productCode} control={control} placeholder={labels.enterProductCode} label={labels.productCode} showOtp={true} />
                            <CustomTextInputField name={formKeys.productCategory} control={control} placeholder={labels.productCategory} label={labels.productCategory} showIcon={true} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CustomTextInputField name={formKeys.sellingPrice} control={control} placeholder={labels.addSellingPrice} label={labels.sellingPrice} width={158} />
                                <CustomTextInputField name={formKeys.purchasePrice} control={control} placeholder={labels.enterPurchasePrice} label={labels.purchasePrice} width={158} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CustomTextInputField name={formKeys.units} control={control} placeholder={labels.select} label={labels.units} width={158} showIcon={true} />
                                <CustomTextInputField name={formKeys.purchasePrice} control={control} placeholder={labels.select} label={labels.discountType} width={158} showIcon={true} />
                            </View>
                            <CustomTextInputField name={formKeys.discountValue} control={control} placeholder={labels.enterDiscountValue} label={labels.discountValue} />
                            <CustomTextInputField name={formKeys.barcode} control={control} placeholder={labels.enterBarcode} label={labels.barCode} showOtp />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CustomTextInputField name={formKeys.alertquantity} control={control} placeholder={labels.enterAlertQuantity} label={labels.alertQuantity} width={158} />
                                <CustomTextInputField name={formKeys.tax} control={control} placeholder={labels.selectItemsTax} label={labels.tax} width={158} />
                            </View>
                            <View style={[flexRow, justifyBetween, { marginVertical: 20 }]}>
                                <OnboardingButton
                                    width={160}
                                    title={labels.reset}
                                    onChange={handleCancelBtnClick}
                                    backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                                    color={isActiveBtn ? colors.white : colors.blackOne}
                                />
                                <OnboardingButton
                                    width={160}
                                    title={labels.saveChanges}
                                    onChange={handleSaveBtnClick}
                                    backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                                    color={isActiveBtn ? colors.blackOne : colors.white}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default AddNewProducts;
