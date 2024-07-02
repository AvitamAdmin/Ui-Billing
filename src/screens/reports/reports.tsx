import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { TopHeader } from '../../components/commonComponents';
import { reportsListData } from '../../utils/data/reportsData';
import { labels } from '../../utils/labels';
import { BottomWidth, H12BlackTwo500 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { mh15, mv15, mv5 } from '../../utils/theme/commonStyles';

export type reportsProps = {};

const ReportsScreen = (props: reportsProps) => {
    const navigation = useNavigation();

    const handleSettingsItemPress = (moveTo: any) => {
        navigation.navigate(moveTo);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.whiteTwo }}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader
                        headerText={labels.reports}
                        searchIcon={true}
                        searchName={'Search' + labels.invoiceTemplates}
                        searchText={labels.invoiceTemplates}
                    />
                </View>
                <BottomWidth style={mv5} />
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 15 }}>
                        {reportsListData.map((data, index) => (
                            <View key={index} style={{ width: '31%', marginBottom: 15 }}>
                                <View style={{ backgroundColor: 'white', height: 100, borderRadius: 5, elevation: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                    <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: colors.greyOne, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}
                                    onPress={()=>handleSettingsItemPress(data.moveTo)}
                                    >
                                        <Image source={data.iconImg} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                    <H12BlackTwo500 style={{ textAlign: 'center' }}>{data.title}</H12BlackTwo500>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar />
        </View>
    );
};

export default ReportsScreen;
