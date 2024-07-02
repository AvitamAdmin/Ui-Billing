import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { expensesData } from '../../utils/data/expensesData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H12BlackTwo600, H12white600, H14blackOne600, H16BlackOne500, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import { ExpenseFilter } from './expenseFilter';

export type expensesScreenProps = {

}


const ExpensesScreen = (props: expensesScreenProps) => {
    const [expenseFilter, setExpenseFilter] = useState(false);


    const navigation = useNavigation()

    const addPress = () => {
        navigation.navigate(screenName.AddExpenses as never)
    }
    const openFilterModal = () => {
        setExpenseFilter(true);
    };
    const closeModal = () => {
        setExpenseFilter(false);
    
    };
    const addSaveBtn =()=>{
        closeModal()
    }
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.expenses} searchIcon={true} searchName={'Search' + labels.inventory} searchText={labels.expenses} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <ListSubHeader listName={labels.payments} totalNumber={'21'} addIcon={true} onAddPress={addPress} onFilterPress={openFilterModal}/>
                        {expensesData.map((data) => {
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
                                    <TouchableNativeFeedback onPress={() => navigation.navigate(screenName.ViewExpenses as never)}>
                                        <MainListCard >
                                            <View style={[flexRow, justifyBetween]}>
                                                <H16BlackOne500 style={[alignSelfCenter]}>{data.expId}</H16BlackOne500>
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
                                                        <H12BlackTwo600>{labels.reference}</H12BlackTwo600>
                                                        <H14blackOne600>{data.reference}</H14blackOne600>
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
                                    </TouchableNativeFeedback>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar />
            <CustomModal children={<ExpenseFilter onSave={addSaveBtn} onCancel={closeModal}   />} visible={expenseFilter} onClose={closeModal} height={'80%'} />
        </View>
    )
}

export default ExpensesScreen