import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { labels } from '../../utils/labels';
import { BottomWidth, H14blackOne500, H14blackOne600, H15blackOne500, H15blackOne600, MainListCard } from '../../utils/styledComponents';
import { AdjustmentIcon } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import { ProfitOrLossReportFilter } from './reportsFilter';

export type profitorLossProps = {

}

const ProfitorLoss = (props: profitorLossProps) => {
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
                    <TopHeader headerText={labels.profitorLoss} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <View style={[flexRow, justifyBetween]}>
                            <H14blackOne600 style={[alignSelfCenter]}>Info</H14blackOne600>
                            <TouchableOpacity onPress={openFilterModal} style={{ height: 36, width: 36, borderRadius: 40, padding: 10, marginHorizontal: 10, borderWidth: 1, borderColor: colors.greyTwo }}>
                                <AdjustmentIcon width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                        <MainListCard>
                            <View style={[flexRow, justifyBetween]}>
                                <H15blackOne500>{labels.income}</H15blackOne500>
                                <H15blackOne500>$12,000.00</H15blackOne500>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <DashedLine height={310} color={colors.greyTwo} dashLength={5} dashGap={3} />
                            </View>
                            <View style={[flexRow, justifyBetween]}>
                                <H14blackOne500>{labels.stripeSales}</H14blackOne500>
                                <H14blackOne500>$12,000.00</H14blackOne500>
                            </View>
                        </MainListCard>

                        <MainListCard>
                            <View style={[flexRow, justifyBetween]}>
                                <H15blackOne500>{labels.expense}</H15blackOne500>
                                <H15blackOne600>$2000.00</H15blackOne600>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <DashedLine height={310} color={colors.greyTwo} dashLength={5} dashGap={3} />
                            </View>
                            <View style={[flexRow, justifyBetween]}>
                                <H14blackOne500>{labels.exchangeGainorLoss}</H14blackOne500>
                                <H14blackOne500>$0.00</H14blackOne500>
                            </View>
                            <View style={[flexRow, justifyBetween, mv5]}>
                                <H14blackOne500>{labels.stripeFees}</H14blackOne500>
                                <H14blackOne500>$10,000.00</H14blackOne500>
                            </View>
                        </MainListCard>
                        <MainListCard style={{ backgroundColor: colors.white4 }}>
                            <View style={[flexRow,justifyBetween,mv5]}>
                                <H15blackOne600>Net Income</H15blackOne600>
                                <H14blackOne600>$10,000.00</H14blackOne600>
                            </View>
                        </MainListCard>
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar />
            <CustomModal children={<ProfitOrLossReportFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={openReportFilterModal} onClose={closeModal} height={'80%'} />
        </View>
    )
}

export default ProfitorLoss