import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DashedLine from '../../components/dashedLine';
import { categoriesListData } from '../../utils/data/productsListData';
import CustomIcon from '../../utils/icons';
import { H12redTwo600, H14blackTwo400, H15blackOne600, MainListCard, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { mh10 } from '../../utils/theme/commonStyles';

export type CategoriesListProps = {
    
    }


const CategoriesList = (props: CategoriesListProps) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: '80%' }}>
                <View>
                    {categoriesListData.map((data, index) => {
                        return (
                            <MainListCard key={data.id} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
                                            <H15blackOne600>{data.productType}</H15blackOne600>
                                        <H14blackTwo400 style={{ alignSelf: 'center' }}>{data.quantityInStock}</H14blackTwo400>
                                        </View>
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
                                <View style={{ marginVertical: 10 }}>
                                    <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <SmallCard >
                                            <H12redTwo600 style={[mh10]}>{data.productType}</H12redTwo600>
                                        </SmallCard>
                                      
                                    </View>
                                    
                                </View>
                            </MainListCard>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

export default CategoriesList