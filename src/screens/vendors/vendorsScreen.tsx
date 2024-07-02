import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { vendorsData } from '../../utils/data/vendorsData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H12BlackTwo600, H12blackTwo400, H12white600, H14blackOne600, H15blackOne600, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, flexRow, justifyBetween, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import { VendorFilter } from './vendorFilter';

export type vendorsScreenProps = {

}


const VendorsScreen = (props: vendorsScreenProps) => {
    const [vendorFilter, setVendorFilter] = useState(false);


const navigation = useNavigation();

const addPress=()=>{
    navigation.navigate(screenName.AddVendor as never)
}

const ledgerPress=()=>{
    navigation.navigate(screenName.LedgersScreen as never)
}

const cardPress=()=>{
    navigation.navigate(screenName.VendorDetails as never)
}
const openFilterModal = () => {
    setVendorFilter(true);
};
const closeModal = () => {
    setVendorFilter(false);

};
const addSaveBtn =()=>{
    closeModal()
}
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.vendors} searchIcon={true} searchName={'Search' + labels.vendors} searchText={labels.vendors} />
                    <BottomWidth style={[mv5]} />
                    <ScrollView>
                        <View style={{ paddingBottom: '50%' }}>
                            <ListSubHeader listName={labels.expense} totalNumber={'21'} onAddPress={addPress} addIcon={true} onFilterPress={openFilterModal}/>
                            {vendorsData.map((data) => {
                                return (
                                    <View key={data.id}>
                                    <TouchableOpacity onPress={cardPress}>
                                    <MainListCard>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ backgroundColor: colors.whiteOne, height: 48, width: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={data.image} resizeMode='contain' style={{ height: 48, width: 48, borderRadius: 10 }} />
                                                    </View>
                                                    <View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
                                                        <H15blackOne600>{data.name}</H15blackOne600>
                                                        <H12blackTwo400>{data.email}</H12blackTwo400>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                <TouchableOpacity style={{ backgroundColor:colors.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 5 ,width:75,height:26}}
                                                onPress={ledgerPress}
                                                >
                                                <CustomIcon name={'eye'} size={10} color={colors.white} type={'Feather'} />
                                                    <H12white600 style={{ marginHorizontal: 4 }}>{labels.ledger}</H12white600>
                                                </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                                        <CustomIcon name={'edit'} size={16} color={colors.blackTwo} type={'Feather'} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                        <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ marginVertical: 10 }}>
                                                <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                            </View>
                                            <View style={{ backgroundColor: colors.white4, padding: 10, borderRadius: 10 }}>
                                                <View style={[flexRow, justifyBetween]}>
                                                    <View>
                                                        <H12BlackTwo600>{labels.phone}</H12BlackTwo600>
                                                        <H14blackOne600>{data.phone}</H14blackOne600>
                                                    </View>
                                                <View>
                                                        <H12BlackTwo600>{labels.createdOn}</H12BlackTwo600>
                                                        <H14blackOne600>{data.createdOn}</H14blackOne600>
                                                    </View>
                                                    <View>
                                                        <H12BlackTwo600>{labels.closingBalance}</H12BlackTwo600>
                                                        <H14blackOne600>{data.balance}</H14blackOne600>
                                                    </View>
                                                </View>
                                            </View>
                                        </MainListCard>
                                    </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
            <BottomNavBar />
            <CustomModal children={<VendorFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={vendorFilter} onClose={closeModal} height={'80%'} />
        </View>
    )
}

export default VendorsScreen