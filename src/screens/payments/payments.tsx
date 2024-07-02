import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { OnboardingButton } from '../../components/commonButton';
import { CustomerSearchExpanded, ExpandableSection, ExpandedByStatusComponent, ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { paymentsData } from '../../utils/data/paymentsData';
import { labels } from '../../utils/labels';
import { H12blackTwo400, H12blackTwo600, H14blackOne600, H16BlackOne700 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, flex1, flexRow, justifyBetween, mb10, mh10, ml10, mr10, mt10 } from '../../utils/theme/commonStyles';
import { ModalTopText } from '../inventory/stockDetails';

export type paymentsProps = {

}


const PaymentsScreen = (props: paymentsProps) => {
    const navigation = useNavigation();
    const [fliterScreenModal, setFilterScreenModal] = useState(Boolean);
    const data = ['Cash', 'Bank'];
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

    const FilterModal = () => {
        return (
            <View style={[justifyBetween, flex1]}>
                <View>
                    <ModalTopText iconPress={onCloseAdjustPress} title='Filter' />
                    <ExpandableSection
                        text="Customer"
                        renderingComponent={<CustomerSearchExpanded isCheckBoxNeeded={true} placeholder="Search Customer" data={data} />}
                    />
                    <ExpandableSection
                        text="By Status"
                        renderingComponent={<ExpandedByStatusComponent data={data} />}
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
                <TopHeader headerText={labels.payments} searchIcon={true} searchName={labels.searchPayments} searchText={labels.searchPayments} />
                <ListSubHeader listName='Total Payments' totalNumber={45} onFilterPress={onAdjustPress} />
                <View style={[flex1, { marginBottom: 70 }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            paymentsData.map((item) => {
                                return (
                                    <View key={item.id} style={{ height: 130, width: '100%', marginTop: 15, alignSelf: 'center', backgroundColor: colors.white, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2 }}>
                                        <View style={[{ marginHorizontal: 10, marginVertical: 10 }, flexRow, justifyBetween, alignItemCenter]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={item.img} />
                                                </View>
                                                <View style={{ marginLeft: 10 }}>
                                                    <H16BlackOne700>{item.companyName}</H16BlackOne700>
                                                    <H12blackTwo400 style={{}}>Phone : {item.phoneNo}</H12blackTwo400>
                                                </View>
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <H16BlackOne700>{item.amount}</H16BlackOne700>
                                                <H12blackTwo400 style={{}}>{item.createdOn}</H12blackTwo400>
                                            </View>
                                        </View>
                                        <View style={[alignItemCenter, mb10]}>
                                            <DashedLine height={330} color={colors.greyTwo} dashLength={5} dashGap={5} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, padding: 5, height: 40, width: '95%', backgroundColor: colors.greyOne, borderRadius: 8 }}>
                                            <View style={ml10}>
                                                <H12blackTwo600>Payment ID</H12blackTwo600>
                                                <H14blackOne600>{item.paymentId}</H14blackOne600>
                                            </View>
                                            <View style={mr10}>
                                                <H12blackTwo600>{labels.modeOfPayment}</H12blackTwo600>
                                                <H14blackOne600>{item.modeOfPayment}</H14blackOne600>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <BottomNavBar navigationPlusButton={() => { }} />
            <CustomModal children={<FilterModal />} visible={fliterScreenModal} onClose={onCloseAdjustPress} height={'80%'} />
        </View>
    )
}

export default PaymentsScreen;