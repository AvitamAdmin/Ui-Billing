import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import DashedLine from '../../components/dashedLine';
import { salesReturnData } from '../../utils/data/salesReturnData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H12BlackTwo600, H12Primary400, H12white600, H14blackOne600, H16BlackOne500, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flex1, flexRow, justifyBetween, mh10, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';

export type salesReturnProps = {
    
    }


const SalesReturn = (props: salesReturnProps) => {
    const navigation = useNavigation();

    const addPress = () => {
        navigation.navigate(screenName.AddSalesReturn, { isAddedProductAvailable: false } as never)
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
                    <ListSubHeader listName={labels.purchases} totalNumber={'21'} addIcon={true} onAddPress={addPress} />
                    {salesReturnData.map((data) => {
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
                                        <View style={styles.imageContainer}>
                                                    <Image source={data.image} style={styles.image} />
                                                </View>
                                            <View style={[alignSelfCenter, mh10]}>
                                                <H12Primary400>{data.productCode}</H12Primary400>

                                                <H16BlackOne500>{data.name}</H16BlackOne500>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ backgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4, marginHorizontal: 5 }}>
                                                <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: colors.white, }} />
                                                <H12white600 style={{ marginHorizontal: 4 }}>{data.status}</H12white600>
                                            </View>
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
                                                <H12BlackTwo600>{labels.amount}</H12BlackTwo600>
                                                <H14blackOne600>{data.amount}</H14blackOne600>
                                            </View>
                                            <View>
                                                <H12BlackTwo600>{labels.modeOfPayment}</H12BlackTwo600>
                                                <H14blackOne600>{data.payment}</H14blackOne600>
                                            </View>
                                            <View>
                                                <H12BlackTwo600>{labels.date}</H12BlackTwo600>
                                                <H14blackOne600>{data.date}</H14blackOne600>

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

export default SalesReturn