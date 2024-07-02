import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { purchasesData } from '../../utils/data/purchaseData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H12BlackTwo600, H12Primary400, H12white600, H14blackOne600, H16BlackOne500, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh10, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import { PurchaseOrderFilter } from '../purchaseOrder/purchaseOrderFilter';

export type purchasesProps = {

}


const Purchases = (props: purchasesProps) => {
    const navigation = useNavigation();
    const [purchaseOrderFilter, setPurchaseOrderFilter] = useState(false);


    const addPress = () => {
        navigation.navigate(screenName.AddPurchases, { isAddedProductAvailable: false } as never)
    }
    const openFilterModal = () => {
        setPurchaseOrderFilter(true);
    };
    const closeModal = () => {
        setPurchaseOrderFilter(false);
    };
    const addSaveBtn =()=>{
        closeModal()
    }

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.purchases} searchIcon={true} searchName={'Search' + labels.purchases} searchText={labels.purchases} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <ListSubHeader listName={labels.purchases} totalNumber={'21'} addIcon={true} onAddPress={addPress} onFilterPress={openFilterModal}/>
                        {purchasesData.map((data) => {
                            let backgroundColor;
                            if (data.status === 'Paid') {
                                backgroundColor = colors.green;
                            } else if (data.status === 'Pending') {
                                backgroundColor = colors.blue;
                            } else if (data.status === 'Cancelled') {
                                backgroundColor = colors.danger;
                            }
                            else {
                                backgroundColor = colors.white;
                            }
                            return (
                                <View key={data.id}>
                                    <MainListCard>
                                        <View style={[flexRow, justifyBetween]}>
                                            <View style={[flexRow]}>
                                                <View style={{ backgroundColor: colors.whiteOne, height: 48, width: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={data.image} resizeMode='contain' style={{ height: 48, width: 48, borderRadius: 10 }} />
                                                </View>
                                                <View style={[alignSelfCenter, mh10]}>
                                                    <H12Primary400>{data.purchaseOrderId}</H12Primary400>

                                                    <H16BlackOne500>{data.name}</H16BlackOne500>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ backgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4, marginHorizontal: 5 }}>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: colors.white, }} />
                                                    <H12white600 style={{ marginHorizontal: 4 }}>{data.status}</H12white600>
                                                </View>
                                                <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                    <CustomIcon name={'dots-three-vertical'} size={10} color={colors.blackTwo} type={'Entypo'} />
                                                </TouchableOpacity>
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
                                                    <H12BlackTwo600>{labels.amount}</H12BlackTwo600>
                                                    <H14blackOne600>{data.amount}</H14blackOne600>
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
            <CustomModal children={<PurchaseOrderFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={purchaseOrderFilter} onClose={closeModal} height={'80%'} />
        </View>
    )
}

export default Purchases