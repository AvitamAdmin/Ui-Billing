import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { taxRatesData } from '../../utils/data/settingsData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { BottomWidth, H12white600, H14blackOne500, H14blackTwo400, H15blackOne600, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, flex1, flexRow, justifyBetween, mh15, mv10, mv15, mv5 } from '../../utils/theme/commonStyles';
import { AddTaxRates } from './settingsComponent';

export type TaxRateProps = {

}

const TaxRate = (props: TaxRateProps) => {
    const [addBankDetailsModal, setAddBankDetailsModal] = React.useState(false);

    const navigation = useNavigation()

    const openModal = () => {
        setAddBankDetailsModal(true);
    };

    const closeModal = () => {
        setAddBankDetailsModal(false)
    };

    const addSaveBtn = () => {
        closeModal()
    }

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.taxRates} searchIcon={true} searchName={labels.taxRates} searchText={'Search ' + labels.taxRates} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingBottom: '50%' }}>
                        <ListSubHeader listName={labels.taxRates} totalNumber={'21'} onAddPress={openModal} addIcon={true} />
                        {taxRatesData.map((data) => {
                            let backgroundColor;
                            if (data.status === 'Active') {
                                backgroundColor = colors.green;
                            } else if (data.status === 'Inactive') {
                                backgroundColor = colors.yellow;
                            } else {
                                backgroundColor = colors.white;
                            }
                            return (
                                <View key={data.id}>
                                    <MainListCard>
                                        <View style={[flexRow, justifyBetween]}>
                                            <H15blackOne600 style={[alignSelfCenter]}>{data.tax}</H15blackOne600>
                                            <View style={[flexRow]}>
                                            <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                                    <CustomIcon name={'eye'} size={15} color={colors.blackTwo} type={'Feather'} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', }}>
                                                    
                                                    <CustomIcon name={'edit'} size={16} color={colors.blackTwo} type={'Feather'} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                                    <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={[alignItemCenter, mv10]}>
                                            <DashedLine height={310} color={colors.greyTwo} dashLength={5} dashGap={5} />
                                        </View>
                                        <View style={[justifyBetween, flexRow]}>
                                            <H14blackTwo400>{labels.taxRate}
                                                <H14blackOne500>{data.taxRate}</H14blackOne500>
                                            </H14blackTwo400>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ backgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: colors.white, }} />
                                                    <H12white600 style={{ marginHorizontal: 4 }}>{data.status}</H12white600>
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
            <CustomModal children={<AddTaxRates onSave={addSaveBtn} onCancel={closeModal} />} visible={addBankDetailsModal} onClose={closeModal} height={'80%'} />
        </View>
    )
}

export default TaxRate