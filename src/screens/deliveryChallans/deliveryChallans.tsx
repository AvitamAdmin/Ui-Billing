import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { TopHeader, ListSubHeader, CustomTextInputField, CustomerSearchExpanded, ExpandableSection, ExpandedByStatusComponent } from '../../components/commonComponents';
import DashedLine from '../../components/dashedLine';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H16BlackOne700, H12blackTwo400, H12blackTwo600, H14blackOne600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mt10, mh10, mt5, flexRow, justifyBetween, alignItemCenter, justifyCenter, ml5, mb10, ml10, mr10 } from '../../utils/theme/commonStyles';
import { useNavigation } from '@react-navigation/native';
import { deliveryChallanData } from '../../utils/data/deliveryChallanScreenData';
import { useForm } from 'react-hook-form';
import { OnboardingButton } from '../../components/commonButton';
import { ModalTopText } from '../inventory/stockDetails';
import QuotationDetailsScreen from '../quotations/quotationDetails';
import CustomModal from '../../components/commonModal';

export type deliveryChallansProps = {

}


const DeliveryChallansScreen = (props: deliveryChallansProps) => {
    const navigation = useNavigation();
    const [fliterScreenModal, setFilterScreenModal] = useState(Boolean);
    const data = ['FedEx', 'Google', 'BNC', 'Whirlpool', 'Palotte'];
    const byStatusData = ['Paid', 'Overdue', 'Partially Paid', 'Draft', 'Sent']
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const onAdjustPress = () => {
        setFilterScreenModal(true);
    }

    const onCloseAdjustPress = () => {
        setFilterScreenModal(false);
    }

    const handlePrevBtnClick = () => {
        setIsActiveBtn(true);
    };

    const handleNextBtnClick = () => {
        setIsActiveBtn(false);
    };

    const formKeys = {
        dueDate: 'dueDate',
    }

    const {
        control,
    } = useForm();
    
    const ExpandedDateComponent = () => {
        return (
            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                <CustomTextInputField width={150} name={formKeys.dueDate} control={control} placeholder={labels.selectDate} label={labels.from} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
                <CustomTextInputField width={150} name={formKeys.dueDate} control={control} placeholder={labels.selectDate} label={labels.to} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
            </View>
        )
    }

    const FilterModal = () => {
        return (
            <View style = {[justifyBetween, flex1]}>
                <View>
                    <ModalTopText iconPress={onCloseAdjustPress} title='Filter' />
                    <ExpandableSection
                        text="Customer"
                        renderingComponent={<CustomerSearchExpanded isCheckBoxNeeded={true} placeholder="Search Customer" data={data} />}
                    />
                    <ExpandableSection
                        text="Challan ID"
                        renderingComponent={<CustomerSearchExpanded isCheckBoxNeeded={true} placeholder="Search Challan ID" data={data} />}
                    />
                    <ExpandableSection
                        text="Due Date"
                        renderingComponent={<ExpandedDateComponent />}
                    />
                    <ExpandableSection
                        text="By Status"
                        renderingComponent={<ExpandedByStatusComponent data={byStatusData} />}
                    />
                </View>
                <View style={[flexRow, justifyBetween, alignItemCenter]}>
                    <OnboardingButton
                        width={150}
                        title={labels.reset}
                        onChange={handlePrevBtnClick}
                        backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                        color={isActiveBtn ? colors.white : colors.blackOne}
                    />
                    <OnboardingButton
                        width={150}
                        title={labels.apply}
                        onChange={handleNextBtnClick}
                        backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                        color={isActiveBtn ? colors.blackOne : colors.white}
                    />
                </View>
            </View>
        )
    }
    
    return (
        <View style={[flex1, { backgroundColor: colors.white }]}>
            <View style={[flex1, mt10, mh10]}>
                <TopHeader headerText={labels.deliveryChallan} searchIcon={true} searchName={labels.searchDeliveryChallan} searchText={labels.searchDeliveryChallan} />
                <ListSubHeader addIcon={true} listName='Total Delivery Challans' totalNumber={5} onAddPress={() => { }} onAdjustPress={onAdjustPress} />
                <View style={[flex1, { marginBottom: 60 }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            deliveryChallanData.map((item) => {
                                return (
                                    <TouchableOpacity onPress={()=> navigation.navigate(QuotationDetailsScreen as never)} key={item.id} style={{ height: 130, width: '100%', marginTop: 15, alignSelf: 'center', backgroundColor: colors.white, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={item.img} />
                                                </View>
                                                <View style={{ marginLeft: 10 }}>
                                                    <H16BlackOne700>{item.companyName}</H16BlackOne700>
                                                    <H12blackTwo400 style={mt5}>Phone : {item.phoneNo}</H12blackTwo400>
                                                </View>
                                            </View>
                                            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                                <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter]}>
                                                    <CustomIcon name={'edit'} size={15} color={colors.blackTwo} type={'Feather'} />
                                                </View>
                                                <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml5]}>
                                                    <CustomIcon name={'delete-forever-outline'} size={17} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                </View>
                                                <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml5]}>
                                                    <CustomIcon name={'copy'} size={15} color={colors.blackTwo} type={'Feather'} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[alignItemCenter, mb10]}>
                                            <DashedLine height={330} color={colors.greyTwo} dashLength={5} dashGap={5} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, padding: 5, height: 40, width: '95%', backgroundColor: colors.greyOne, borderRadius: 8 }}>
                                            <View style={ml10}>
                                                <H12blackTwo600>Challan ID</H12blackTwo600>
                                                <H14blackOne600>{item.quotationId}</H14blackOne600>
                                            </View>
                                            <View style={mr10}>
                                                <H12blackTwo600>Created On</H12blackTwo600>
                                                <H14blackOne600>{item.createdOn}</H14blackOne600>
                                            </View>
                                            <View style={mr10}>
                                                <H12blackTwo600>Amount</H12blackTwo600>
                                                <H14blackOne600>{item.amount}</H14blackOne600>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <BottomNavBar navigationPlusButton={() => navigation.navigate(screenName.AddDeliveryScreen, { isAddedProductAvailable: false } as never)} />
            <CustomModal children={<FilterModal />} visible={fliterScreenModal} onClose={onCloseAdjustPress} height={'80%'} />
        </View>
    )
}

export default DeliveryChallansScreen