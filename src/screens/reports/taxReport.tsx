import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { TabBar, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { BottomWidth } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import PurchaseTaxReport from './purchaseTaxReport';
import SalesTaxReport from './salesTaxReport';

export type TaxReportProps = {

};

const TaxReport = (props: TaxReportProps) => {
    const [selectedTab, setSelectedTab] = useState(labels.purchaseTax);
    const [purchaseTaxFilter,setPurchaseTaxFilter] = useState('')
const [salesTaxFilter,setSalesTaxFilter] = useState('')

    const navigation = useNavigation();

    const tabs = [{ label: labels.purchaseTax }, { label: labels.salesTax }];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={[mh15]}>
                <View style={[mv15]}>
                    <TopHeader headerText={labels.generalSettings} searchIcon={true} searchName={selectedTab} searchText={'Select' + selectedTab} />
                </View>
                <BottomWidth style={{ marginVertical: 8 }} />
                <View style={[mv5]}>
                    <TabBar tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} borderRadius={50} width={150} />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ paddingBottom: 80 }}>
                        {selectedTab === labels.purchaseTax && (
                            <PurchaseTaxReport />
                        )}
                        {selectedTab === labels.salesTax && (
                           <SalesTaxReport/>
                        )}
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


export default TaxReport;
