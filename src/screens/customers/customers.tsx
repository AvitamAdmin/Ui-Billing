import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { OnboardingButton } from '../../components/commonButton';
import { CustomerSearchExpanded, ExpandableSection, ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import PopupCardModal from '../../components/popupCardModal';
import { customerData } from '../../utils/data/customerData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H12blackTwo600, H12redFour600, H12white600, H15blackOne600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, flex1, flexRow, justifyBetween, justifyCenter, mb5, mh10, ml10, ml5, mt10, mv10 } from '../../utils/theme/commonStyles';
import { ModalTopText } from '../inventory/stockDetails';

export type customersProps = {

}


const CustomersScreen = (props: customersProps) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fliterScreenModal, setFilterScreenModal] = useState(Boolean);
    const data = ['FedEx', 'Google', 'BNC', 'Whirlpool', 'Palotte'];
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

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
            <View style = {[justifyBetween, flex1]}>
                <View>
                    <ModalTopText iconPress={onCloseAdjustPress} title='Filter' />
                    <ExpandableSection
                        text="Customer"
                        renderingComponent={<CustomerSearchExpanded isCheckBoxNeeded={true} placeholder="Search Customer" data={data} />}
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
        <View style={[flex1, { backgroundColor: colors.whiteThree }]}>
            <View style={[flex1, mt10, mh10]}>
                <TopHeader headerText={labels.customers} searchIcon={true} searchName={labels.searchCustomer} searchText={labels.searchCustomer} />
                <View style={[alignItemCenter, mv10]}>
                    <DashedLine height={320} color={colors.greyTwo} dashLength={10} dashGap={0} />
                </View>
                <ListSubHeader addIcon={true} listName={'Total Customers'} totalNumber={'45'} onAddPress={() => { navigation.navigate(screenName.AddCustomersScreen as never) }} onFilterPress={onAdjustPress} />
                <View style={[flex1, { marginBottom: 60 }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            customerData.map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate(screenName.CustomerDetails as never)} style={[{ height: 110, width: '100%', backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, borderRadius: 8 }, mb5]} key={item.id}>
                                        <View style={[flexRow, justifyBetween, alignItemCenter, mv10, mh10]}>
                                            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                                <View style={[{ height: 45, width: 45, borderWidth: 1, borderColor: colors.grey, borderRadius: 8 }, alignItemCenter]}>
                                                    <Image source={item.img} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                                </View>
                                                <View style={[ml10]}>
                                                    <H15blackOne600>{item.name}</H15blackOne600>
                                                    <H12blackTwo600>Invoiced : {item.count}</H12blackTwo600>
                                                </View>
                                            </View>
                                            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                                <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter]}>
                                                    <CustomIcon name={'edit'} size={15} color={colors.blackTwo} type={'Feather'} />
                                                </View>
                                                <TouchableOpacity onPress={openModal} style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml5]}>
                                                    <CustomIcon name={'delete-forever-outline'} size={17} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                </TouchableOpacity>
                                                <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml5]}>
                                                    <CustomIcon name={'user-check'} size={15} color={colors.blackTwo} type={'Feather'} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[alignItemCenter]}>
                                            <DashedLine height={330} color={colors.greyTwo} dashLength={5} dashGap={5} />
                                        </View>
                                        <View style={[flexRow, justifyBetween, alignItemCenter, mh10, mv10]}>
                                            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                                <View style={[{ height: 25, width: 80, backgroundColor: colors.redOne, borderRadius: 5 }, alignItemCenter, justifyCenter]}>
                                                    <H12redFour600>Balance : {item.amount}</H12redFour600>
                                                </View>
                                                <View style={[flexRow, justifyBetween, alignItemCenter, ml10]}>
                                                    <View style={[{ height: 16, width: 16, backgroundColor: colors.blackOne, borderRadius: 5 }, alignItemCenter, justifyCenter]}>
                                                        <CustomIcon color={colors.white} name='plus' size={12} type='Entypo' />
                                                    </View>
                                                    <H15blackOne600 style={[ml5]}>{labels.addInvoice}</H15blackOne600>
                                                </View>
                                            </View>
                                            <View style={[{ height: 25, width: 65, backgroundColor: item.isActive ? colors.green : colors.danger, borderRadius: 8 }, alignItemCenter, justifyCenter, flexRow]}>
                                                <View style={{ height: 8, width: 8, borderRadius: 10, backgroundColor: colors.white }} />
                                                <H12white600 style={[ml5]}>{item.isActive ? 'Active' : 'Inactive'}</H12white600>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <BottomNavBar navigationPlusButton={() => navigation.navigate(screenName.AddCustomersScreen as never)} />
            {showModal && <PopupCardModal handleYesBtn={() => { }} text='Do you want to change Customer Status to inactive' visible={showModal} onClose={() => setShowModal(false)} />}
            <CustomModal children={<FilterModal />} visible={fliterScreenModal} onClose={onCloseAdjustPress} height={'80%'} />
        </View>
    )
}

export default CustomersScreen