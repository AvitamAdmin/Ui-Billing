import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TabBar, TopHeader } from '../../components/commonComponents';
import CustomModal from '../../components/commonModal';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mv10 } from '../../utils/theme/commonStyles';
import CategoriesList from '../categories/categoriesList';
import UnitsList from '../units/unitsList';
import { CategoryFilter, ProductFilter, UnitFilter } from './filterModal';
import ProductsList from './productsList';

export type ProductsProps = {

}

const Products = (props: ProductsProps) => {
    const [selectedTab, setSelectedTab] = useState(labels.products);
    const [total, setTotal] = useState('45');
    const [productFilterModal, setProductFilterModal] = useState(false);
    const [categoryFilterModal, setCategoryFilterModal] = useState(false);
    const [unitFilterModal, setUnitFilterModal] = useState(false);


    const navigation = useNavigation();

    const tabs = [
        { label: labels.products, total: '45' },
        { label: labels.categories, total: '21' },
        { label: labels.units, total: '15' },
    ];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
        const tabData = tabs.find(item => item.label === tab);
        if (tabData) {
            setTotal(tabData.total);
        }
    };

    const handleAddPress = () => {
        if (selectedTab === labels.products) {
            navigation.navigate(screenName.AddNewProducts as never)
        } else if (selectedTab === labels.categories) {
            navigation.navigate(screenName.AddNewCategories as never)
        } else if (selectedTab === labels.units) {
            navigation.navigate(screenName.AddNewUnits as never)
        }
    }

    const openProductFilterModal = () => {
        setProductFilterModal(true);
    };

    const closeProductFilterModal = () => {
        setProductFilterModal(false);
    };

    const openCategoryFilterModal = () => {
        setCategoryFilterModal(true);
    };

    const closeCategoryFilterModal = () => {
        setCategoryFilterModal(false);
    };

    const openUnitFilterModal = () => {
        setUnitFilterModal(true);
    };

    const closeUnitFilterModal = () => {
        setUnitFilterModal(false);
    };

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                <TopHeader headerText={selectedTab} searchIcon={true} searchName={selectedTab} searchText={'Search ' + selectedTab} />
                <View style={[mv10]}>
                    <TabBar tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
                </View>
                <BottomWidth />
                <ListSubHeader listName={selectedTab} totalNumber={total} onAddPress={handleAddPress} addIcon={true} onFilterPress={selectedTab === labels.products ? openProductFilterModal : selectedTab === labels.categories ? openCategoryFilterModal : selectedTab === labels.units? openUnitFilterModal:undefined} />
                {selectedTab === labels.products && (
                    <>
                        <ProductsList searchValue={''} />
                        <CustomModal visible={productFilterModal} onClose={closeProductFilterModal} height={'80%'} children={<ProductFilter onSave={closeProductFilterModal} onCancel={closeProductFilterModal} />} />
                    </>
                )}
                {selectedTab === labels.categories && (
                    <>
                        <CategoriesList />
                        <CustomModal visible={categoryFilterModal} onClose={closeCategoryFilterModal} height={'80%'} children={<CategoryFilter onSave={closeCategoryFilterModal} onCancel={closeCategoryFilterModal} />} />
                    </>
                )}
                {selectedTab === labels.units && (
                     <>
                     <UnitsList />
                     <CustomModal visible={unitFilterModal} onClose={closeUnitFilterModal} height={'80%'} children={<UnitFilter onSave={closeUnitFilterModal} onCancel={closeUnitFilterModal} />} />
                 </>
                )}
            </View>
            <BottomNavBar />
        </View>
    );
};

export default Products;
