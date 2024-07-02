import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DashedLine from '../../components/dashedLine';
import { unitsListData } from '../../utils/data/productsListData';

import CustomIcon from '../../utils/icons';
import { H12redTwo600, H15blackOne600, MainListCard, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flexRow } from '../../utils/theme/commonStyles';

export type UnitsListProps = {}

const UnitsList = (props: UnitsListProps) => {
    const renderUnitCards = () => {
        const unitCards = [];
        for (let i = 0; i < unitsListData.length; i += 2) {
            const firstUnit = unitsListData[i];
            const secondUnit = unitsListData[i + 1];
            unitCards.push(
                <View key={i} style={{ flexDirection: 'row' }}>
                    <UnitCard data={firstUnit} />
                    {secondUnit && <UnitCard data={secondUnit} />}
                </View>
            );
        }
        return unitCards;
    };

    const UnitCard = ({ data  } : any) => {
        return (
            <View style={{ flex: 1,  }}>
                <MainListCard  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[flexRow]}>
                            <View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
                                <H15blackOne600>{data.productType}</H15blackOne600>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <SmallCard>
                            <H12redTwo600 style={{ marginHorizontal: 10 }}>{data.symbol}</H12redTwo600>
                        </SmallCard>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <DashedLine height={145} color={colors.greyTwo} dashLength={10} dashGap={5} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                            <CustomIcon name={'edit'} size={16} color={colors.blackTwo} type={'Feather'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                        </TouchableOpacity>
                    </View>
                </MainListCard>
            </View>
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: '80%' }}>
                {renderUnitCards()}
            </View>
        </ScrollView>
    );
};

export default UnitsList;
