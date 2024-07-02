import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { expenseReportData } from '../../utils/data/reportsData';
import { labels } from '../../utils/labels';
import { BottomWidth, H12BlackTwo600, H12white600, H14blackOne600, H15blackOne600, H16BlackOne700, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh15, mh5, mv15, mv5 } from '../../utils/theme/commonStyles';
import { ExpensesReportFilter } from './reportsFilter';

export type ExpenseReportProps = {}

const ExpenseReport = (props: ExpenseReportProps) => {
    const [openReportFilterModal,setOpenReportFilterModal] = useState(false);
    const openFilterModal = () => {
        setOpenReportFilterModal(true);
    };
    const closeModal = () => {
        setOpenReportFilterModal(false);
    };
    const addSaveBtn =()=>{
        closeModal()
    }
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.expenseReport} searchIcon={true} searchName={'Search' + labels.inventory} searchText={labels.expenseReport} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <H16BlackOne700>{labels.expensesByLast30Days}</H16BlackOne700>
                        <ListSubHeader listName={labels.expense} totalNumber={'21'} onAddPress={()=>{}} onFilterPress={openFilterModal} />
                        {expenseReportData.map((data) => {
                            let backgroundColor;
                            if (data.status === 'Paid') {
                                backgroundColor = colors.green;
                            } else if (data.status === 'Pending') {
                                backgroundColor = colors.yellow;
                            } else {
                                backgroundColor = colors.white;
                            }
                            return (
                                <View key={data.id}>
                                    <MainListCard >
                                        <View style={[flexRow, justifyBetween]}>
                                            <View style={[flexRow]}>
                                                <View style={styles.imageContainer}>
                                                    <Image source={data.image} style={styles.image} />
                                                </View>
                                                <View style={[alignSelfCenter, mh5]}>
                                                    <H15blackOne600>{data.name}</H15blackOne600>
                                                    <H12BlackTwo600>{data.email}</H12BlackTwo600>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ backgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: colors.white, }} />
                                                    <H12white600 style={{ marginHorizontal: 4 }}>{data.status}</H12white600>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                        </View>
                                        <View style={{ backgroundColor: colors.white4, padding: 10, borderRadius: 10 }}>
                                            <View style={[flexRow, justifyBetween]}>
                                                <View>
                                                    <H12BlackTwo600>{labels.amount}</H12BlackTwo600>
                                                    <H14blackOne600>{data.amount}</H14blackOne600>
                                                </View>
                                                <View>
                                                    <H12BlackTwo600>{labels.category}</H12BlackTwo600>
                                                    <H14blackOne600>{data.category}</H14blackOne600>
                                                </View>
                                                <View>
                                                    <H12BlackTwo600>{labels.createdOn}</H12BlackTwo600>
                                                    <H14blackOne600>{data.createdOn}</H14blackOne600>
                                                </View>
                                            </View>
                                        </View>
                                    </MainListCard>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar />
            <CustomModal children={<ExpensesReportFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={openReportFilterModal} onClose={closeModal} height={'80%'} />

        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.greyTwo
    },
    image: {
        resizeMode: 'contain',
        height: 40,
        width: 40,
    },
});

export default ExpenseReport;