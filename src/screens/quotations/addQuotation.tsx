import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TopHeader, CustomTextInputField, CustomNavigateBox, MultiLineTextBox, MultiSelectOption, RadioBtn } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { SmallCard, H12redTwo600, H12Primary400, H12blackTwo600, H14Danger400, H14blackOne600, H14blackTwo400, H18BlackOne700, H14blackTwo600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mt10, mh10, mv10, flexRow, justifyBetween, alignItemCenter, justifyCenter, mb5, mh15, mt5, alignSelfCenter, justifyStart, ml10, ml15, mr5 } from '../../utils/theme/commonStyles';
import { useForm } from 'react-hook-form';
import DashedLine from '../../components/dashedLine';
import { addedProductData } from '../../utils/data/invoiceData';
import CustomIcon from '../../utils/icons';
import { screenName } from '../../utils/screenNames';
import { useNavigation } from '@react-navigation/native';
import { OnboardingButton } from '../../components/commonButton';
import { DevWidth } from '../../utils/device';
import { ModalTopText } from '../inventory/stockDetails';
import CustomModal from '../../components/commonModal';
import { AddBankDetails } from '../settings/settingsComponent';

export type addQuotationProps = {

}


const AddQuotationScreen = ({ route }: any) => {
    const { isAddedProductAvailable } = route.params;
    const navigation = useNavigation();

    const [notes, setNotes] = useState('');
    const [termsCondition, setTermsCondition] = useState('');
    const [selectedSignature, setSelectedSignature] = useState<string | null>(null);
    const [checkBox, setCheckBox] = useState(false);
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);
    const [addBankDetailsModal, setAddBankDetailsModal] = useState(false);

    const openModal = () => {
        setAddBankDetailsModal(true);
    };

    const handleSignatureSelect = (status: string) => {
        setSelectedSignature(status);
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
        navigation.navigate(screenName.QuotationDetails as never)
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
    };

    const handleCheckBox = () => {
        setCheckBox(!checkBox);
    }

    const openEditProductModal = () => {
        setEditProductModal(true);
    };

    const formKeys = {
        referenceNumber: 'referenceNumber',
        invoiceDate: 'invoiceDate',
        dueDate: 'dueDate',
        customerName: 'customerName',
        selectBank: 'selectBank',
        paymentMethod: 'paymentMethod',
        selectSignature: 'selectSignature',
    }

    const {
        control,
    } = useForm();

    const signature = [
        {
            id: 1,
            name: 'Manual Signature',
        },
        {
            id: 2,
            name: 'E-Signature',
        },
    ]

    const closeModal = () => {
        setAddBankDetailsModal(false);
        setEditProductModal(false);
    };

const EditProduct = () => {
    return (
        <View style={[flex1]}>
            <ScrollView>
                <View style={{ paddingBottom: 80 }}>
                    <ModalTopText title='Edit Product' iconPress={() => setEditProductModal(false)} />
                    <View style={[mv10]}>
                        <CustomTextInputField name={labels.bankName} control={control} placeholder={''} label={labels.quantity} />
                        <CustomTextInputField name={labels.accountNumber1} control={control} placeholder={''} label={labels.rate} />
                        <CustomTextInputField name={labels.accountHolderName} control={control} placeholder={''} label={labels.discountAmnt} />
                        <CustomTextInputField name={labels.ifsc} control={control} placeholder={''} label={labels.tax} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomButtonsContainer}>
                <OnboardingButton
                    width={DevWidth / 2.3}
                    title={labels.cancel}
                    onChange={() => setEditProductModal(false)}
                    backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                    color={isActiveBtn ? colors.white : colors.blackOne}
                />
                <OnboardingButton
                    width={DevWidth / 2.3}
                    title={labels.saveChanges}
                    onChange={() => setEditProductModal(false)}
                    backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                    color={isActiveBtn ? colors.blackOne : colors.white}
                />
            </View>
        </View>
    )
}

    return (
        <View style={[flex1, { backgroundColor: colors.white }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[flex1, mt10, mh10]}>
                    <TopHeader headerText={labels.addQuotations} searchIcon={false} />
                    <SmallCard style={mv10}>
                        <H12redTwo600 style={[mh10]}>Quotation Id : #QUO - 000016</H12redTwo600>
                    </SmallCard>
                    <CustomTextInputField name={formKeys.customerName} control={control} placeholder={labels.enterCustomerName} label={labels.customerName} showIcon={true} subHead='Add New' color={colors.primary} />
                    <View style={[flexRow, justifyBetween]}>
                        <CustomTextInputField width={165} name={formKeys.invoiceDate} control={control} placeholder={''} label={labels.quotationDate} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
                        <CustomTextInputField width={165} name={formKeys.dueDate} control={control} placeholder={''} label={labels.dueDate} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
                    </View>
                    {
                        isAddedProductAvailable ? (
                            <View>
                                <View style={flexRow}>
                                    <H14blackOne600 style={{ marginVertical: 5 }}>{labels.products}</H14blackOne600>
                                    <H14Danger400>*</H14Danger400>
                                </View>
                                <View style={[{ height: 300, width: '100%', borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 8 }]}>
                                    <View style={[flexRow, justifyBetween, alignItemCenter, mv10, mh10]}>
                                        <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                            <CustomIcon color={colors.blackTwo} name='chevron-small-up' size={14} type='Entypo' />
                                            <H14blackTwo400>{labels.products}(2)</H14blackTwo400>
                                        </View>
                                        <H12Primary400>Add Item</H12Primary400>
                                    </View>
                                    <View style={[alignItemCenter, justifyCenter]}>
                                        {
                                            addedProductData.map((item) => {
                                                return (
                                                    <View style={[{ height: 100, width: '95%', backgroundColor: colors.greyOne, borderRadius: 8 }, mb5]} key={item.id}>
                                                        <View style={[flexRow, justifyBetween, mh10, mv10]}>
                                                            <H18BlackOne700>{item.name}</H18BlackOne700>
                                                            <H18BlackOne700>{item.amount}</H18BlackOne700>
                                                        </View>
                                                        <View style={[alignItemCenter]}>
                                                            <DashedLine height={300} color={colors.greyTwo} dashLength={10} dashGap={0} />
                                                        </View>
                                                        <View style={[flexRow, alignItemCenter, justifyBetween]}>
                                                            <View style={[flexRow, alignItemCenter, justifyBetween]}>
                                                                <View style={[mt10, mh10]}>
                                                                    <H12blackTwo600>Qty*Rate</H12blackTwo600>
                                                                    <H12blackTwo600 style={mt5}>Discount & Tax</H12blackTwo600>
                                                                </View>
                                                                <View style={[mt10, mh10]}>
                                                                    <H12blackTwo600>{item.qty}</H12blackTwo600>
                                                                    <H12blackTwo600 style={mt5}>{item.dicount}</H12blackTwo600>
                                                                </View>
                                                            </View>
                                                            <View style={[flexRow, alignItemCenter, justifyBetween]}>
                                                                <TouchableOpacity style={[mt10, mh10]} onPress={openEditProductModal}>
                                                                    <CustomIcon color={colors.blackTwo} name='edit' size={14} type='Feather' />
                                                                </TouchableOpacity>
                                                                <View style={[mt10, mh10]}>
                                                                    <CustomIcon color={colors.blackTwo} name='delete-forever-outline' size={18} type='MaterialCommunityIcons' />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={[alignItemCenter, mv10]}>
                                        <DashedLine height={320} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                    </View>
                                    <View style={[flexRow, justifyBetween, mh15]}>
                                        <H18BlackOne700>Total</H18BlackOne700>
                                        <H18BlackOne700>$21457</H18BlackOne700>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <CustomNavigateBox name='Add Product' label={labels.products} onNavigate={() => navigation.navigate(screenName.ProductScreen, {fromScreen : labels.quotation} as never)} color={colors.primary} />
                        )
                    }
                    <CustomTextInputField name={formKeys.selectBank} control={control} placeholder={labels.select} label={labels.selectBank} showIcon={true} subHead='Add New' color={colors.primary} subHeadOnPress={openModal} />
                    <MultiLineTextBox
                        placeHolder={labels.notes}
                        label={labels.notes}
                        value={notes}
                        onChangeValue={() => setNotes(notes)}
                        multiline={true}
                        keyboardType="default"
                        height={100}
                        maxLength={200}
                        disable={false}
                    />
                    <MultiLineTextBox
                        placeHolder={labels.terms}
                        label={labels.termsConditions}
                        value={termsCondition}
                        onChangeValue={() => setTermsCondition(termsCondition)}
                        multiline={true}
                        keyboardType="default"
                        height={100}
                        maxLength={200}
                        disable={false}
                    />
                    <View style={mv10}>
                        <H14blackOne600 style={{}}>Invoice Summary</H14blackOne600>
                        <View style={[{ height: 165, width: '100%', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 8 }, mv10]}>
                            <View style={[mh10, mv10]}>
                                <View style={[flexRow, justifyBetween]}>
                                    <H14blackTwo600>Amount</H14blackTwo600>
                                    <H14blackTwo600>$0</H14blackTwo600>
                                </View>
                                <View style={[flexRow, justifyBetween, mt10]}>
                                    <H14blackTwo600>Discount</H14blackTwo600>
                                    <H14blackTwo600>$0</H14blackTwo600>
                                </View>
                                <View style={[flexRow, justifyBetween, mt10]}>
                                    <H14blackTwo600>Tax</H14blackTwo600>
                                    <H14blackTwo600>$0</H14blackTwo600>
                                </View>
                                <View style={[flexRow, justifyBetween, alignItemCenter, mt5]}>
                                    <View style={[flexRow, justifyCenter, mt10]}>
                                        <H14blackTwo600 style={mr5}>Round Off</H14blackTwo600>
                                        <MultiSelectOption selectedColor={colors.primary} unselectedColor={colors.danger} isSelected={checkBox} onSelect={handleCheckBox} />
                                    </View>
                                    <H14blackTwo600>$0</H14blackTwo600>
                                </View>
                                <View style={[alignSelfCenter, mv10]}>
                                    <DashedLine height={300} color={colors.greyEight} dashGap={4} />
                                </View>
                                <View style={[flexRow, justifyBetween]}>
                                    <H18BlackOne700>Total</H18BlackOne700>
                                    <H18BlackOne700>$0</H18BlackOne700>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={mv10}>
                        <H14blackOne600 style={{}}>Signature</H14blackOne600>
                        <View style={[flexRow, justifyBetween, alignItemCenter]}>
                            {
                                signature.map((item) => {
                                    return (
                                        <View style={[flexRow, mv10, { height: 40, width: '48%', borderWidth: 1, borderColor: selectedSignature === item.name ? colors.primary : colors.grey, borderRadius: 8 }, alignItemCenter, justifyStart]} key={item.id}>
                                            <View style={ml15}>
                                                <RadioBtn
                                                    key={item.id}
                                                    selected={selectedSignature === item.name}
                                                    onPress={() => handleSignatureSelect(item.name)}
                                                />
                                            </View>
                                            <Text style={[ml10, { color: selectedSignature === item.name ? colors.primary : colors.grey }]}>{item.name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <CustomTextInputField name={formKeys.selectSignature} control={control} placeholder={labels.select} label={labels.selectSignature} showIcon={true} />
                </View>
                <View style={[flexRow, justifyBetween, mt10, mh10]}>
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
            </ScrollView>
            <CustomModal children={<AddBankDetails onSave={closeModal} onCancel={closeModal} />} visible={addBankDetailsModal} onClose={closeModal} height={'80%'} />
            <CustomModal children={<EditProduct />} visible={editProductModal} onClose={closeModal} height={'80%'} />
        </View>
    )
}

const styles = StyleSheet.create({
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AddQuotationScreen;