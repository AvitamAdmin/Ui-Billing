import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import DashedLine from '../../components/dashedLine';
import { ledgersListData } from '../../utils/data/vendorsData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H12BlackTwo600, H12Primary400, H12redTwo600, H12white600, H14blackOne600, H14blackTwo600, H15blackOne600, MainListCard, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh10, mh15, mv10, mv15 } from '../../utils/theme/commonStyles';

export type ledgersScreenProps = {

}


const LedgersScreen = (props: ledgersScreenProps) => {
    const navigation = useNavigation()

    const addPress=()=>{
        navigation.navigate(screenName.AddLedger as never)
    }
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.ledgers} searchIcon={true} searchName={'Search' + labels.ledgers} searchText={labels.ledgers} />
                    <BottomWidth style={[mv10]} />
                    <ScrollView>
                        <View style={{ paddingBottom: '50%' }}>
                            <ListSubHeader listName={labels.ledgers} totalNumber={'21'} onAddPress={addPress} addIcon={true} />
                            {ledgersListData.map((data) => {
                                let backgroundColor;
                                if (data.status === 'Credit') {
                                    backgroundColor = colors.green;
                                } else if (data.status === 'Debit') {
                                    backgroundColor = colors.danger;
                                }
                                else {
                                    backgroundColor = colors.white;
                                }
                                return (
                                    <View key={data.id}>
                                        <MainListCard>
                                            <View style={[flexRow, justifyBetween]}>
                                                <View>
                                                    <H12Primary400>{data.itemCode}</H12Primary400>
                                                    <H15blackOne600>{data.type}</H15blackOne600>
                                                </View>
                                                <View>
                                                    <H12BlackTwo600>{labels.createdOn}</H12BlackTwo600>
                                                    <H14blackOne600>{data.createdOn}</H14blackOne600>
                                                </View>
                                                <View style={{ backgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4, marginHorizontal: 5, height: 27 }}>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: colors.white, }} />
                                                    <H12white600 style={{ marginHorizontal: 4 }}>{data.status}</H12white600>
                                                </View>
                                            </View>
                                            <View style={{ marginVertical: 10 }}>
                                                <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                            </View>
                                            <View style={[flexRow, justifyBetween]}>
                                                <H14blackTwo600 style={[alignSelfCenter]}>{labels.amount + ' : ' + data.amount}</H14blackTwo600>
                                                <SmallCard >
                                                    <H12redTwo600 style={[mh10]}>{'Closing Bal : ' + data.closingBal}</H12redTwo600>
                                                </SmallCard>
                                            </View>
                                        </MainListCard>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
            <BottomNavBar />
        </View>

    )
}

export default LedgersScreen