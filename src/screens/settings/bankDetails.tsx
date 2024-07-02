import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { bankDetailsData } from '../../utils/data/settingsData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { BottomWidth, H12BlackTwo600, H14blackOne500, H14blackOne600, H14blackTwo400, H15blackOne600, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, flexRow, justifyBetween, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import { AddBankDetails } from './settingsComponent';

export type BankDetailsProps = {

}

const BankDetails = (props: BankDetailsProps) => {
    const [addBankDetailsModal, setAddBankDetailsModal] = useState(false);
    
    const navigation = useNavigation()

    const openModal = () => {
        setAddBankDetailsModal(true);
    };

    const closeModal = () => {
        setAddBankDetailsModal(false)
    };

    const addSaveBtn =()=>{
        closeModal()
    }

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.bankDetails} searchIcon={true} searchName={'Search'+ labels.inventory} searchText={labels.bankDetails} />
                </View>
                <BottomWidth style={[mv5]} />
                <ListSubHeader listName={labels.bankAccounts} totalNumber={'21'} onAddPress={openModal} addIcon={true} />
                {bankDetailsData.map((data) => {
                    return (
                        <View key={data.id}>
                            <MainListCard>
                                <View style={[flexRow, justifyBetween]}>
                                    <View>
                                        <H15blackOne600>{data.accName}</H15blackOne600>
                                        <H14blackTwo400>{labels.accountNumber}
                                            <H14blackOne500>{data.accNum}</H14blackOne500>
                                        </H14blackTwo400>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                            <CustomIcon name={'edit'} size={16} color={colors.blackTwo} type={'Feather'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 15 }}>
                                    <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                </View>
                                <View style={{ backgroundColor: colors.white4, padding: 10, borderRadius: 10 }}>
                                    <View style={[flexRow, justifyBetween]}>
                                        <View>
                                            <H12BlackTwo600>{labels.bankName}</H12BlackTwo600>
                                            <H14blackOne600>{data.bankName}</H14blackOne600>
                                        </View>
                                        <View>
                                            <H12BlackTwo600>{labels.branch}</H12BlackTwo600>
                                            <H14blackOne600>{data.branch}</H14blackOne600>
                                        </View>
                                        <View>
                                            <H12BlackTwo600>{labels.ifsc}</H12BlackTwo600>
                                            <H14blackOne600>{data.ifscode}</H14blackOne600>
                                        </View>
                                    </View>
                                </View>
                            </MainListCard>
                        </View>
                    )
                })}
            </View>
            <BottomNavBar />
            <CustomModal children={<AddBankDetails onSave={addSaveBtn} onCancel={closeModal}   />} visible={addBankDetailsModal} onClose={closeModal} height={'80%'} />
        </View>
    )
}

export default BankDetails