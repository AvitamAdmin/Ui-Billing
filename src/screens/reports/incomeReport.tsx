import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { paymentReportData } from '../../utils/data/reportsData';
import { labels } from '../../utils/labels';
import { BottomWidth, H12BlackTwo600, H12blackOne400, H14blackOne600, H14blackTwo400, H15blackOne600, H16BlackOne700, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh15, mh5, mv15, mv5 } from '../../utils/theme/commonStyles';
import { IncomeReportFilter } from './reportsFilter';

export type IncomeReportProps = {
    
    }


const IncomeReport = (props: IncomeReportProps) => {

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
                    <TopHeader headerText={labels.incomeReport} searchIcon={true} searchName={'Search' + labels.inventory} searchText={labels.incomeReport} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <H16BlackOne700>{labels.incomebyLast30Days}</H16BlackOne700>
                        <ListSubHeader listName={labels.income} totalNumber={'21'} onFilterPress={openFilterModal} />
                        {paymentReportData.map((data) => {
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
                                            <View style={{justifyContent:'center',alignItems:'center' }}>
                                                <H12blackOne400>{labels.incomeAmount}</H12blackOne400>
                                                <H14blackOne600>{data.incomeAmount}</H14blackOne600>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                        </View>
                                        <View style={[flexRow, justifyBetween]}>
                                            <View style={[flexRow]}>
                                                <H14blackTwo400 style={{ alignSelf: 'center' }}>{labels.date + ' : '}</H14blackTwo400>
                                                <H14blackTwo400 style={{ alignSelf: 'center' }}>{data.date}</H14blackTwo400>
                                            </View>
                                            <View style={[flexRow]}>
                                                <H14blackTwo400 style={{ alignSelf: 'center' }}>{labels.modeOfPayment + ' : '}</H14blackTwo400>
                                                <H14blackTwo400 style={{ alignSelf: 'center' }}>{data.modeOfPayement}</H14blackTwo400>
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
            <CustomModal children={<IncomeReportFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={openReportFilterModal} onClose={closeModal} height={'80%'} />

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

export default IncomeReport