import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { ListSubHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { purchaseTaxData } from '../../utils/data/reportsData';
import { labels } from '../../utils/labels';
import { H10primary600, H12BlackTwo600, H12blackOne400, H14blackOne600, H15blackOne600, H16BlackOne700, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, flexRow, justifyBetween } from '../../utils/theme/commonStyles';
import { PurchaseTaxReportFilter } from './reportsFilter';

export type PurchaseTaxReportProps = {
    
    }


const PurchaseTaxReport = (props: PurchaseTaxReportProps) => {
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
                        {purchaseTaxData.map((data) => {
                            return (
                                <View key={data.id}>
                                    <MainListCard>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ backgroundColor: colors.whiteOne, height: 48, width: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={data.image} resizeMode='contain' style={{ height: 48, width: 48 ,borderRadius:10}} />
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
            <CustomModal children={<PurchaseTaxReportFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={openReportFilterModal} onClose={closeModal} height={'80%'} />

        </View>
    )
}

export default PurchaseTaxReport