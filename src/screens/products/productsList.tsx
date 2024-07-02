import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DashedLine from '../../components/dashedLine';
import { productsListData } from '../../utils/data/productsListData';
import CustomIcon from '../../utils/icons';
import { H10primary600, H12danger600, H12redTwo600, H14blackOne600, H14blackTwo400, H15blackOne600, MainListCard, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flexRow, mh10 } from '../../utils/theme/commonStyles';

export type ProductsListProps = {
    searchValue: string;
};

const ProductsList = ({ searchValue }: ProductsListProps) => {
    const filteredProducts = productsListData.filter((product) =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log('Search Value:', searchValue);
    console.log('Filtered Products:', filteredProducts);
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: '70%' }}>
                {filteredProducts.length === 0 ? (
                    <Text style={{color:'red'}}>No items found</Text>
                ) : (
                    filteredProducts.map((data, index) => {
                        return (
                            <MainListCard key={data.id} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: colors.whiteOne, height: 48, width: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={data.productImg} resizeMode='contain' style={{ height: 30, width: 30 }} />
                                    </View>
                                    <View style={{ alignSelf: 'center', marginHorizontal: 8 }}>
                                        <H10primary600>{data.code}</H10primary600>
                                        <H15blackOne600>{data.productName}</H15blackOne600>
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
                                    <SmallCard>
                                        <H12redTwo600 style={[mh10]}>{data.productType}</H12redTwo600>
                                    </SmallCard>
                                    <View style={{ borderStartWidth: 1, borderStartColor: colors.greyTwo, marginHorizontal: 5, height: 15, alignSelf: 'center' }}></View>
                                    <H14blackTwo400 style={{ alignSelf: 'center' }}>{data.quantityInStock}</H14blackTwo400>
                                </View>
                                <View style={[flexRow]}>
                                    <H12danger600 style={{ textDecorationLine: 'line-through', marginHorizontal: 8, alignSelf: 'center' }}>{data.discountName}</H12danger600>
                                    <H14blackOne600 style={{ alignSelf: 'center' }}>{data.price}</H14blackOne600>
                                </View>
                            </View>
                        </MainListCard>

                        );
                    })
                )}
            </View>
        </ScrollView>
    );
};

export default ProductsList;
