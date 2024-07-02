import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, RoundCheckBox } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import { productsData } from '../../utils/data/invoiceData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H10blackTwo600, H12BlackTwo500, H12Primary600, H12white600, H14blackOne600, H15blackOne600, H18BlackOne700, H18blackOne700 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, flexRow, justifyBetween, justifyCenter, mb10, mh10, ml10, ml5, mr10, mr5, mt10, mt15, mv10, mv5 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type productsProps = {

}


const ProductScreen = ({route} : any) => {
    const { fromScreen } = route.params;
    console.log('bbb', fromScreen)
    const { control } = useForm();
    const [showCreateNewProductModal, setShowCreateNewProductModal] = useState<boolean>(false);
    const [showSearchProductModal, setShowSearchProductModal] = useState<boolean>(false);
    const [selectedItemType, setSelectedItemType] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(true);
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const [productCounts, setProductCounts] = useState<number[]>(Array(productsData.length).fill(1));

    const navigation = useNavigation();

    const handleProductClick = () => {
        setIsChecked(true);
    };

    const handleServiceClick = () => {
        setIsChecked(false);
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
        if(fromScreen === labels.invoice) {
            navigation.navigate(screenName.AddInvoiceScreen, { isAddedProductAvailable: true } as never);
        } else if( fromScreen === labels.quotation) {
            navigation.navigate(screenName.AddQuotationScreen, { isAddedProductAvailable: true } as never);
        } else if(fromScreen === labels.deliveryChallan) {
            navigation.navigate(screenName.AddDeliveryScreen, { isAddedProductAvailable: true } as never);
        }else if(fromScreen === labels.creditNote) {
            navigation.navigate(screenName.AddCreditNotesScreen, { isAddedProductAvailable: true } as never);
        } else if(fromScreen === labels.purchaseOrder) {
            navigation.navigate(screenName.AddPurchaseOrderScreen, { isAddedProductAvailable: true } as never);
        }else if(fromScreen === labels.purchaseReturn) {
            navigation.navigate(screenName.AddPurchaseReturn, { isAddedProductAvailable: true } as never);
        }else if(fromScreen === labels.purchases) {
            navigation.navigate(screenName.AddPurchases, { isAddedProductAvailable: true } as never);
        }else if(fromScreen === labels.salesReturn) {
            navigation.navigate(screenName.AddSalesReturn, { isAddedProductAvailable: true } as never);
        }
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
    };

    const formKeys = {
        productName: 'productName',
        productCode: 'productCode',
        productCategory: 'productCategory',
        sellingPrice: 'sellingPrice',
        purchasePrice: 'purchasePrice',
        units: 'units',
        discountType: 'discountType',
        discountValue: 'discountValue',
        barCode: 'barCode',
        alertQuantity: 'alertQuantity',
        tax: 'tax'
    }

    const handleItemTypeSelect = (status: string) => {
        setSelectedItemType(status);
    };

    const openCreateNewProductModal = () => {
        setShowCreateNewProductModal(true);
    };

    const closeCreateNewProductModal = () => {
        setShowCreateNewProductModal(false);
    };

    const openSearchProductModal = () => {
        setShowSearchProductModal(true);
    };

    const closeSearchProductModal = () => {
        setShowSearchProductModal(false);
    };

    const incrementCount = (index: number) => {
        const newCounts = [...productCounts];
        newCounts[index]++;
        setProductCounts(newCounts);
    };

    const decrementCount = (index: number) => {
        const newCounts = [...productCounts];
        if (newCounts[index] > 1) {
            newCounts[index]--;
            setProductCounts(newCounts);
        }
    };

    const searchProduct = () => {
        return (
            <View>
                <View style={[flexRow, justifyBetween]}>
                    <H18BlackOne700>{labels.searchProducts}</H18BlackOne700>
                    <TouchableOpacity onPress={closeSearchProductModal} style={[{ backgroundColor: colors.greyOne, height: 25, width: 25, borderRadius: 100, }, alignItemCenter, justifyCenter]}>
                        <CustomIcon name="close" size={16} color={colors.blackOne} type='Ionicons' />
                    </TouchableOpacity>
                </View>
                <View style={mv10}>
                    <CustomTextInputField name={""} control={control} placeholder={labels.searchProducts} showIcon={true} />
                </View>
                {
                    productsData.map(({ id, name, Img, unit, price }) => {
                        return (
                            <View style={[{ height: 70, width: '100%', backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, borderRadius: 8 }, mv5, flexRow, justifyBetween, alignItemCenter]} key={id}>
                                <View style={[flexRow, alignItemCenter, ml10]}>
                                    <View style={[[{ height: 40, width: 40, backgroundColor: colors.whiteOne, borderRadius: 8 }, alignItemCenter, justifyCenter]]}>
                                        <Img height={25} width={25} />
                                    </View>
                                    <View style={[ml5]}>
                                        <H15blackOne600>{name}</H15blackOne600>
                                        <View style={[flexRow, alignItemCenter]}>
                                            <H12Primary600>Unit : {unit}</H12Primary600>
                                            <Text style={{ color: colors.greyTwo }}> | </Text>
                                            <H10blackTwo600>Price : {price}</H10blackTwo600>
                                        </View>
                                    </View>
                                </View>
                                <View style={[flexRow, alignItemCenter, mr10]} >
                                    <TouchableOpacity style={[ml10, alignItemCenter, justifyCenter, { height: 25, width: 45, borderRadius: 5, backgroundColor: colors.primary }]}>
                                        <H12white600>Add</H12white600>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    const createNewProduct = () => {
        const itemType = [
            {
                id: 1,
                name: 'Product',
            },
            {
                id: 2,
                name: 'Services',
            },
        ]

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <View style={[flexRow, justifyBetween]}>
                        <H18BlackOne700>{labels.createNewProduct}</H18BlackOne700>
                        <TouchableOpacity onPress={closeCreateNewProductModal} style={[{ backgroundColor: colors.greyOne, height: 25, width: 25, borderRadius: 100, }, alignItemCenter, justifyCenter]}>
                            <CustomIcon name="close" size={16} color={colors.blackOne} type='Ionicons' />
                        </TouchableOpacity>
                    </View>
                    <View style={[mt15, mb10]}>
                        <UploadImageCard title={labels.customerImage} sizeInfo={'Size should be below 4 MB'} onUpload={() => { }} onDelete={() => { }} />
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
                            <CustomTextInputField name={formKeys.sellingPrice} control={control} placeholder={labels.addSellingPrice} label={labels.sellingPrice} width={150} />
                            <CustomTextInputField name={formKeys.purchasePrice} control={control} placeholder={labels.enterPurchasePrice} label={labels.purchasePrice} width={150} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CustomTextInputField name={formKeys.units} control={control} placeholder={labels.select} label={labels.units} width={150} showIcon={true} />
                            <CustomTextInputField name={formKeys.purchasePrice} control={control} placeholder={labels.select} label={labels.discountType} width={150} showIcon={true} />
                        </View>
                        <CustomTextInputField name={formKeys.discountValue} control={control} placeholder={labels.enterDiscountValue} label={labels.discountValue} />
                        <CustomTextInputField name={formKeys.barCode} control={control} placeholder={labels.enterBarcode} label={labels.barCode} showOtp />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CustomTextInputField name={formKeys.alertQuantity} control={control} placeholder={labels.enterAlertQuantity} label={labels.alertQuantity} width={150} />
                            <CustomTextInputField name={formKeys.tax} control={control} placeholder={labels.selectItemsTax} label={labels.tax} width={150} />
                        </View>
                        <View style={[flexRow, justifyBetween, { marginVertical: 20 }]}>
                            <OnboardingButton
                                width={150}
                                title={labels.reset}
                                onChange={handleCancelBtnClick}
                                backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                                color={isActiveBtn ? colors.white : colors.blackOne}
                            />
                            <OnboardingButton
                                width={150}
                                title={labels.saveChanges}
                                onChange={handleSaveBtnClick}
                                backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                                color={isActiveBtn ? colors.blackOne : colors.white}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView >
        )
    }

    return (
        <View style={[mv10, mh10, { backgroundColor: colors.greyOne }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={[{ backgroundColor: colors.greyTwo, height: 36, width: 36, borderRadius: 10, }, alignItemCenter, justifyCenter]}>
                    <CustomIcon name={"chevron-left"} size={16} color={colors.blackOne} type={"Entypo"} />
                </View>
                <H18blackOne700 style={[]}>{labels.products}</H18blackOne700>
                <TouchableOpacity style={[{ backgroundColor: colors.greyTwo, height: 36, width: 36, borderRadius: 10, }, alignItemCenter, justifyCenter]} onPress={openSearchProductModal}>
                    <CustomIcon name='search' size={16} color={colors.blackTwo} type='Feather' />
                </TouchableOpacity>
            </View>
            <View style={mt10}>
                {
                    productsData.map(({ id, name, Img, unit, price }) => {
                        const index = productsData.findIndex(product => product.id === id);
                        const count = productCounts[index];
                        return (
                            <View style={[{ height: 70, width: '100%', backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, borderRadius: 8 }, mv5, flexRow, justifyBetween, alignItemCenter]} key={id}>
                                <View style={[flexRow, alignItemCenter, ml10]}>
                                    <View style={[[{ height: 40, width: 40, backgroundColor: colors.whiteOne, borderRadius: 8 }, alignItemCenter, justifyCenter]]}>
                                        <Img height={25} width={25} />
                                    </View>
                                    <View style={[ml5]}>
                                        <H15blackOne600>{name}</H15blackOne600>
                                        <View style={[flexRow, alignItemCenter]}>
                                            <H12Primary600>Unit : {unit}</H12Primary600>
                                            <Text style={{ color: colors.greyTwo }}> | </Text>
                                            <H10blackTwo600>Price : {price}</H10blackTwo600>
                                        </View>
                                    </View>
                                </View>
                                <View style={[flexRow, alignItemCenter, mr10]} >
                                    <View style={[flexRow, alignItemCenter, justifyCenter, { height: 35, width: 80, borderRadius: 5, borderColor: colors.greyTwo, borderWidth: 1 }]}>
                                        <TouchableOpacity onPress={() => decrementCount(index)} style={[{ backgroundColor: colors.greyTwo, height: 25, width: 25, borderRadius: 5, }, alignItemCenter, justifyCenter]}>
                                            <CustomIcon name="minus" size={12} color={colors.blackOne} type='Feather' />
                                        </TouchableOpacity>
                                        <H12BlackTwo500 style={[mr5, ml5]}>{count}</H12BlackTwo500>
                                        <TouchableOpacity onPress={() => incrementCount(index)} style={[{ backgroundColor: colors.greyTwo, height: 25, width: 25, borderRadius: 5, }, alignItemCenter, justifyCenter]}>
                                            <CustomIcon name="plus" size={12} color={colors.blackOne} type='Feather' />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={[ml10, alignItemCenter, justifyCenter, { height: 25, width: 45, borderRadius: 5, backgroundColor: colors.primary }]}>
                                        <H12white600>Add</H12white600>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            <View style={{ marginTop: 120 }}>
                <TouchableOpacity onPress={openCreateNewProductModal} style={[flexRow, justifyCenter, alignItemCenter, alignSelfCenter, { height: 40, width: '50%', backgroundColor: colors.white, borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, }]}>
                    <View style={[alignItemCenter, justifyCenter, { height: 16, width: 16, borderRadius: 5, backgroundColor: colors.primary }]}>
                        <CustomIcon color={colors.white} name='plus' size={12} type='Entypo' />
                    </View>
                    <Text style={[{ color: colors.primary }, ml5]}>Create New Product</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 60 }}>
                <OnboardingButton
                    width='100%'
                    title={labels.continue}
                    onChange={() => { }}
                    backgroundColor={colors.primary}
                    color={colors.white}
                />
            </View>
            <CustomModal children={createNewProduct()} visible={showCreateNewProductModal} onClose={closeCreateNewProductModal} height={'85%'} />
            <CustomModal children={searchProduct()} visible={showSearchProductModal} onClose={closeSearchProductModal} height={'80%'} />
        </View>
    )
}

export default ProductScreen;