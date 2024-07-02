import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { paymentSummaryData } from '../../utils/data/paymentsData';
import { labels } from '../../utils/labels';
import { H12BlackTwo600, H12blackOne400, H14400, H14blackOne600, H15blackOne600, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, flexRow, justifyBetween, mh15, mv15 } from '../../utils/theme/commonStyles';
import { PaymentSummaryFilter } from './paymentSummaryFilter';

export type paymentSummaryProps = {

}


const PaymentSummary = (props: paymentSummaryProps) => {
    const [openReportFilterModal, setOpenReportFilterModal] = useState(false);
    const openFilterModal = () => {
        setOpenReportFilterModal(true);
    };
    const closeModal = () => {
        setOpenReportFilterModal(false);
    };
    const addSaveBtn = () => {
        closeModal()
    }
    return (

        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={[mh15]}>
                <View style={[mv15]}>
                    <TopHeader headerText={labels.paymentSummary} searchIcon={true} searchName={labels.paymentSummary} searchText={labels.paymentSummary} />
                </View>
             <ScrollView showsVerticalScrollIndicator={false}>
             <View style={{ paddingBottom: '50%' }}>
                    <ListSubHeader listName={labels.stocks} totalNumber={'21'} onFilterPress={openFilterModal} />
                    {paymentSummaryData.map((data) => {
                        return (
                            <View key={data.id}>
                                <MainListCard>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.imageContainer}>
                                                <Image source={data.image} style={styles.image} />
                                            </View>
                                            <View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
                                                <H12blackOne400>{labels.customer}</H12blackOne400>
                                                <H15blackOne600>{data.name}</H15blackOne600>
                                            </View>
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <H14blackOne600>{data.totalAmnt}</H14blackOne600>
                                        </View>
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                    </View>
                                    <View style={{ backgroundColor: colors.white4, padding: 10, borderRadius: 10 }}>
                                        <View style={[flexRow, justifyBetween]}>
                                            <View>
                                                <H12BlackTwo600>{'Invoice No'}</H12BlackTwo600>
                                                <H14400 style={{ color: colors.primary }}>{data.profileId}</H14400>

                                            </View>
                                            <View>
                                                <H12BlackTwo600>{labels.date}</H12BlackTwo600>
                                                <H14blackOne600>{data.date}</H14blackOne600>
                                            </View>

                                            <View>
                                                <H12BlackTwo600>{labels.modeOfPayment}</H12BlackTwo600>
                                                <H14blackOne600>{data.payment}</H14blackOne600>
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

            <CustomModal children={<PaymentSummaryFilter onSave={addSaveBtn} onCancel={closeModal} />} visible={openReportFilterModal} onClose={closeModal} height={'80%'} />
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

export default PaymentSummary