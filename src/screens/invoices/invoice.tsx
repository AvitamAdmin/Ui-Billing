import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, CustomerSearchExpanded, ExpandableSection, ExpandedByStatusComponent, InvoiceCard, ListSubHeader, TabBar, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import { allInvoicesdata, draftInvoicesdata, invoiceCardData, overdueInvoicesdata, paidInvoicesdata, partiallyPaidInvoicesdata, sentInvoicesdata, unpaidInvoicesdata } from '../../utils/data/invoiceData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H12BlackOne600, H12blackTwo600, H14blackOne600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, flex1, flexRow, justifyBetween, justifyCenter, mh10, ml15, mt10, mt5, mv15 } from '../../utils/theme/commonStyles';
import { ModalTopText } from '../inventory/stockDetails';

const InvoiceScreen = () => {
    const navigation = useNavigation();

    const [selectedTab, setSelectedTab] = useState(labels.allInvoices);
    const [fliterScreenModal, setFilterScreenModal] = useState(Boolean);
    const data = ['FedEx', 'Google', 'BNC', 'Whirlpool', 'Palotte'];
    const byStatusData = ['Paid', 'Overdue', 'Partially Paid', 'Draft', 'Sent']
    const [total, setTotal] = useState('45');
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const formKeys = {
        dueDate: 'dueDate',
    }

    const {
        control,
    } = useForm();

    const tabs = [
        { label: labels.allInvoices, total: '45' },
        { label: labels.paid, total: '21' },
        { label: labels.overDue, total: '15' },
        { label: labels.partiallypaid, total: '10' },
        { label: labels.unpaid, total: '8' },
        { label: labels.sent, total: '11' },
        { label: labels.draft, total: '2' },
    ];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
        const tabData = tabs.find(item => item.label === tab);
        if (tabData) {
            setTotal(tabData.total);
        }
    };

    const handleAddPress = () => {
        navigation.navigate(screenName.AddInvoiceScreen, { isAddedProductAvailable: false } as never)
    }

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

    const invoiceTopCards = () => {
        return (
            <View style={[mt10, { height: 150, width: '100%', backgroundColor: colors.greyOne }, alignItemCenter, justifyCenter]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={[flexRow, alignItemCenter, justifyCenter]}>
                        {
                            invoiceCardData.map(({ id, Img, amount, count, color, text }) => (
                                <View key={id} style={[{ height: 120, width: 110, backgroundColor: colors.white, borderRadius: 8, marginHorizontal: 5 }]}>
                                    <View style={[mt10, ml15]}>
                                        <View style={[{ height: 25, width: 25, borderRadius: 20, backgroundColor: color }, alignItemCenter, justifyCenter]}>
                                            <Img height={14} width={14} />
                                        </View>
                                        <H14blackOne600 style={[mt10]}>{amount}</H14blackOne600>
                                        <H12BlackOne600 style={[{ color: color }, mt5]}>{text}</H12BlackOne600>
                                        <H12blackTwo600 style={mt5}>No of Invoice : {count}</H12blackTwo600>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

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
                        text="Invoice Number"
                        renderingComponent={<CustomerSearchExpanded isCheckBoxNeeded={true} placeholder="Search Invoice Number" data={data} />}
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
                <TopHeader headerText={'Invoice'} searchIcon={true} searchName={selectedTab} searchText={'Search Invoice'} />
                {invoiceTopCards()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingBottom: 70 }}>
                        <View style={[mv15,]}>
                            <TabBar tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
                        </View>
                        <View style={{ borderBottomWidth: 0.5, borderColor: colors.greyTwo }}></View>
                        <ListSubHeader addIcon listName={selectedTab} totalNumber={total} onAddPress={handleAddPress} onFilterPress={onAdjustPress} />
                        {selectedTab === labels.allInvoices && (
                            <View>
                                {
                                    allInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                        {selectedTab === labels.paid && (
                            <View>
                                {
                                    paidInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                        {selectedTab === labels.overDue && (
                            <View>
                                {
                                    overdueInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                        {selectedTab === labels.partiallypaid && (
                            <View>
                                {
                                    partiallyPaidInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                        {selectedTab === labels.unpaid && (
                            <View>
                                {
                                    unpaidInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                        {selectedTab === labels.sent && (
                            <View>
                                {
                                    sentInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                        {selectedTab === labels.draft && (
                            <View>
                                {
                                    draftInvoicesdata.map((invoice) => {
                                        return (
                                            <InvoiceCard key={invoice.id} data={invoice} />
                                        )
                                    })
                                }
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar navigationPlusButton={() => navigation.navigate(screenName.AddInvoiceScreen, { isAddedProductAvailable: false } as never)} />
            <CustomModal children={<FilterModal />} visible={fliterScreenModal} onClose={onCloseAdjustPress} height={'80%'} />
        </View>
    );
}

const styles = StyleSheet.create({
});

export default InvoiceScreen;
