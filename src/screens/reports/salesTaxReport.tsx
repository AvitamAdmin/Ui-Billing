import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ListSubHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { salesTaxData } from '../../utils/data/reportsData';
import { labels } from '../../utils/labels';
import { H10primary600, H12BlackTwo600, H12blackOne400, H14blackOne600, H15blackOne600, H16BlackOne700, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, flexRow, justifyBetween } from '../../utils/theme/commonStyles';
import { SalesTaxReportFilter } from './reportsFilter';

export type SalesTaxReportProps = {

}


const SalesTaxReport = (props: SalesTaxReportProps) => {
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
            <View style={{ paddingBottom: '50%' }}>
                <H16BlackOne700>{labels.stocksbyLast30Days}</H16BlackOne700>
                <ListSubHeader listName={labels.stocks} totalNumber={'21'} onFilterPress={openFilterModal}/>
                {salesTaxData.map((data) => {
                    return (
                        <View key={data.id}>
                            <MainListCard>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.imageContainer}>
                                                    <Image source={data.image} style={styles.image} />
                                                </View>
                                        <View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
                                            <H15blackOne600>{data.name}</H15blackOne600>
                                            <H10primary600>{data.profileId}</H10primary600>
                                        </View>
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <H12blackOne400>{labels.totalAmnt}</H12blackOne400>
                                        <H14blackOne600>{data.totalAmnt}</H14blackOne600>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                </View>
                                <View style={{ backgroundColor: colors.white4, padding: 10, borderRadius: 10 }}>
                                    <View style={[flexRow, justifyBetween]}>
                                        <View>
                                            <H12BlackTwo600>{labels.date}</H12BlackTwo600>
                                            <H14blackOne600>{data.date}</H14blackOne600>
                                        </View>
                                        <View>
                                            <H12BlackTwo600>{labels.discount}</H12BlackTwo600>
                                            <H14blackOne600>{data.discount}</H14blackOne600>
                                        </View>
                                        <View>
                                            <H12BlackTwo600>{labels.taxAmount}</H12BlackTwo600>
                                            <H14blackOne600>{data.taxAmount}</H14blackOne600>
                                        </View>
                                        <View>
                                            <H12BlackTwo600>{labels.payments}</H12BlackTwo600>
                                            <H14blackOne600>{data.payment}</H14blackOne600>
                                        </View>
                                    </View>
                                </View>
                            </MainListCard>
                        </View>
                    )
                })}
            </View>
            <CustomModal children={<SalesTaxReportFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={openReportFilterModal} onClose={closeModal} height={'80%'} />

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

export default SalesTaxReport