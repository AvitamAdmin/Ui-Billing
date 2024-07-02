import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/theme/colors';
import CustomIcon from '../../utils/icons';
import { addNewDashboardData, frequentCustomersdata } from '../../utils/data/dashboardData';
import { labels } from '../../utils/labels';
import { H16White700, H14White400Underline, H10White600, H18BlackOne700, H14blackOne600 } from '../../utils/styledComponents';
import { mv15, alignSelfCenter, mh10, mv5, mt5, flexRow, alignItemCenter, justifyBetween, justifyCenter, mr10, ml10, flex1, mb15, mb10 } from '../../utils/theme/commonStyles';
import CustomModal from '../../components/commonModal';

const FrequentCustomers: React.FC = (props) => {




    return (
        <View style={[{ backgroundColor: colors.blackOne, height: 100, width: '100%', borderRadius: 8 }, mv15, alignSelfCenter]}>
            <View style={[mh10, mv5, mt5, flexRow, alignItemCenter, justifyBetween]}>
                <H16White700>{labels.frequentCustomers}</H16White700>
                <TouchableOpacity>
                    <H14White400Underline>{labels.addNew}</H14White400Underline>
                </TouchableOpacity>
            </View>
            <View style={[flexRow, mt5]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        frequentCustomersdata.map((item) => (
                            <View key={item.id} style={[mh10]}>
                                {
                                    item.id === 1 ?
                                        <View style={[alignItemCenter]}>
                                            <TouchableOpacity  style={[alignItemCenter, justifyCenter, { height: 40, width: 40, borderRadius: 100, backgroundColor: colors.white }]}>
                                                <CustomIcon color={colors.blackOne} size={16} name='add' type='MaterialIcons' />
                                            </TouchableOpacity>
                                            <H10White600 style={mt5}>{item.title}</H10White600>
                                        </View>
                                        : <View style={[alignItemCenter]}>
                                            <Image source={item.img} style={{ height: 40, width: 40 }} />
                                            <H10White600 style={mt5}>{item.title}</H10White600>
                                        </View>
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
}

export default FrequentCustomers;
