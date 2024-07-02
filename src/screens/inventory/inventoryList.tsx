import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import DashedLine from '../../components/dashedLine';
import { inventoryListData } from '../../utils/data/inventoryListData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H10primary600, H12danger600, H12redTwo600, H14blackOne600, H14blackTwo400, H15blackOne600, MainListCard, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, bg_color_white, flex1, flexRow, justifyCenter, mh10, mh15, mh5, mv15 } from '../../utils/theme/commonStyles';
import { StockAdd, StockRemove } from './stockDetails';

export type InventoryListProps = {}

const InventoryList = (props: InventoryListProps) => {
    const navigation = useNavigation();
    const [stockAddShowModal, setStockAddShowModal] = useState<boolean>(false);
    const [stockRemoveShowModal, setStockRemoveShowModal] = useState<boolean>(false);

    const openModal = (modalType: string) => {
        if (modalType === 'stockAdd') setStockAddShowModal(true);
        else if (modalType === 'stockRemove') setStockRemoveShowModal(true);
    };

    const closeModal = () => {
        setStockAddShowModal(false);
        setStockRemoveShowModal(false);
    };

    const stockBtnAction = (type: string) => {
        closeModal();
        navigation.navigate(type === 'stockAdd' ? screenName.InventoryAdded as never : screenName.InventoryRemoved as never);
    };

    const renderStockButton = (label: string, color: string, textColor: string, type: string) => (
        <SmallCard style={[mh10, { backgroundColor: color }]}>
            <TouchableOpacity style={[mh5, flexRow, justifyCenter, alignItemCenter]} onPress={() => openModal(type)}>
                <View style={{ backgroundColor: textColor, height: 11, width: 11, justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginHorizontal: 5 }}>
                    <CustomIcon name={'plus'} size={8} color={colors.white} type={'Entypo'} />
                </View>
                <H12redTwo600 color={textColor}>{label}</H12redTwo600>
            </TouchableOpacity>
        </SmallCard>
    );

    return (
        <View style={[flex1, bg_color_white]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.inventory} searchIcon={true} searchName={labels.searchInventory} searchText={labels.searchInventory} />
                </View>
                <BottomWidth />
                <ListSubHeader listName={'Inventory'} totalNumber={'45'} onAddPress={() => { }} />
                <ScrollView>
                    <View style={{ paddingBottom: '70%' }}>
                        {inventoryListData.map((data, index) => (
                            <MainListCard key={data.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                        <H12danger600 style={{ textDecorationLine: 'line-through', marginHorizontal: 8, alignSelf: 'center' }}>{data.discountName}</H12danger600>
                                        <H14blackOne600 style={{ alignSelf: 'center' }}>{data.price}</H14blackOne600>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <DashedLine height={310} color={colors.greyTwo} dashLength={10} dashGap={5} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <H14blackTwo400 style={{ alignSelf: 'center' }}>{data.quantityInStock}</H14blackTwo400>
                                    </View>
                                    <View style={[flexRow]}>
                                        {renderStockButton(labels.stockIn, colors.cardColor1, colors.blueTwo, 'stockAdd')}
                                        {renderStockButton(labels.stockOut, colors.redOne, colors.danger, 'stockRemove')}
                                    </View>
                                </View>
                            </MainListCard>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <CustomModal children={<StockAdd onSave={() => stockBtnAction('stockAdd')} onCancel={closeModal} />} visible={stockAddShowModal} onClose={closeModal} height={'80%'} />
            <CustomModal children={<StockRemove onSave={() => stockBtnAction('stockRemove')} onCancel={closeModal} />} visible={stockRemoveShowModal} onClose={closeModal} height={'80%'} />
            <BottomNavBar />
        </View>
    );
};

export default InventoryList;
