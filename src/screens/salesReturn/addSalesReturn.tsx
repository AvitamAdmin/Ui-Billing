import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomNavigateBox, CustomTextInputField, MultiLineTextBox, MultiSelectOption, RadioBtn, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { addedProductData } from '../../utils/data/invoiceData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H12Primary400, H12blackTwo600, H12redTwo600, H14Danger400, H14blackOne600, H14blackTwo400, H14blackTwo600, H18BlackOne700, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, flex1, flexRow, justifyBetween, justifyCenter, justifyStart, mb5, mh10, mh15, ml10, ml15, mr5, mt10, mt5, mv10, mv15 } from '../../utils/theme/commonStyles';
import { AddBankDetails, AddTax } from '../settings/settingsComponent';

export type addSalesReturnProps = {
    
    }


const AddSalesReturn = ({route}:any) => {
    
    const { isAddedProductAvailable } = route.params;

    const [termsCondition, setTermsCondition] = useState('');
    const [selectedSignature, setSelectedSignature] = useState<string | null>('');
    const [checkBox, setCheckBox] = useState(false);
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const [notes, setNotes] = useState('');
    const [addBankDetailsModal, setAddBankDetailsModal] = useState(false);
    const [addTaxModal, setAddTaxModal] = useState(false);

    const navigation=useNavigation()

    const {
        control,
    } = useForm();


    const handleSignatureSelect = (status: string) => {
        setSelectedSignature(status);
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
        navigation.navigate(screenName.SalesReturnDetails as never)
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
    };

    const handleCheckBox = () => {
        setCheckBox(!checkBox);
    }

    const openModal = () => {
        setAddBankDetailsModal(true);
    };
    const openTaxModal = () => {
        setAddTaxModal(true);
    };

    const closeModal = () => {
        setAddBankDetailsModal(false);
        setAddTaxModal(false);
    };

    const addSaveBtn =()=>{
        closeModal()
    }

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
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[flex1, mt10, mh10]}>
            <View style={mv15}>
                <TopHeader headerText={labels.addSalesReturn} />
                <SmallCard style={mv10}>
                        <H12redTwo600 style={[mh10]}>Sales Return ID :  #CN-000030</H12redTwo600>
                    </SmallCard>
            </View>
                   
                    <CustomTextInputField name={labels.customer} control={control} placeholder={"Select " + labels.customer} label={labels.customer} showIcon={true} subHead='Add New' color={colors.primary} />
                    <CustomTextInputField name={labels.salesReturnDate} control={control} placeholder={labels.selectDate} label={labels.salesReturnDate} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
                    <CustomTextInputField name={labels.dueDate} control={control} placeholder={labels.selectDate} label={labels.dueDate} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
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
                                                        <TouchableOpacity style={[mt10, mh10]} onPress={openTaxModal}>
                                                                <CustomIcon color={colors.blackTwo} name='edit' size={14} type='Feather'/>
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
                        <CustomNavigateBox name='Add Product' label={labels.products} onNavigate={() => navigation.navigate(screenName.ProductScreen, {fromScreen : labels.salesReturn} as never)} color={colors.primary} />
                    )
                }
                <CustomTextInputField name={labels.selectBank} control={control} placeholder={labels.select} label={labels.selectBank} showIcon={true} subHead='Add New' color={colors.primary} subHeadOnPress={openModal} />

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
                <CustomTextInputField name={labels.selectSignature} control={control} placeholder={labels.select} label={labels.selectSignature} showIcon={true} />
                <View style={[flexRow, justifyBetween, mt10, ]}>
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
        </ScrollView>
        <CustomModal children={<AddBankDetails onSave={addSaveBtn} onCancel={closeModal}   />} visible={addBankDetailsModal} onClose={closeModal} height={'80%'} />
        <CustomModal children={<AddTax onSave={addSaveBtn} onCancel={closeModal}   />} visible={addTaxModal} onClose={closeModal} height={'80%'} />

    </View>
    )
}

export default AddSalesReturn