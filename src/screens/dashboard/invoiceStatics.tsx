import React, { useState } from 'react';
import { Modal, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors } from '../../utils/theme/colors';
import { labels } from '../../utils/labels';
import { H12blackTwo600, H14blackTwo600, H16BlackOne700 } from '../../utils/styledComponents';
import { alignItemCenter, flexRow, justifyAround, justifyBetween, mb15, mh15, mt10, mt15, mt5, mv15, mv5, p5 } from '../../utils/theme/commonStyles';
import CustomIcon from '../../utils/icons';
import { invoiceStaticsData } from '../../utils/data/dashboardData';

export type invoiceStaticsProps = {

}


const InvoiceStatics = (props: invoiceStaticsProps) => {
    const [weeklyModalVisible, setWeeklyModalVisible] = useState(false);
    const [selectedWeeklyOption, setSelectedWeeklyOption] = useState('Weekly');

    const toggleModal = () => {
        setWeeklyModalVisible(!weeklyModalVisible);
    };

    const handleOptionSelect = (option: any) => {
        setSelectedWeeklyOption(option);
        setWeeklyModalVisible(false);
    };

    const monthlyWeeklyModal = () => {
        return (
            <Modal
                animationType='none'
                transparent={true}
                visible={weeklyModalVisible}
                onRequestClose={() => {
                    setWeeklyModalVisible(false);
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        width: '100%',
                        padding: 10,
                      }}
                    activeOpacity={1}
                    onPressOut={() => setWeeklyModalVisible(false)}
                >
<View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>                        <TouchableOpacity style={{
                backgroundColor: selectedWeeklyOption === 'Weekly' ? '#f2f2f2' : '#fff',
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 8,
              }} onPress={() => handleOptionSelect('Weekly')}>
                            <H14blackTwo600 style={{ marginBottom: 10 }}>Weekly</H14blackTwo600>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                backgroundColor: selectedWeeklyOption === 'Monthly' ? '#f2f2f2' : '#fff',
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 8,
              }} onPress={() => handleOptionSelect('Monthly')}>
                            <H14blackTwo600>Monthly</H14blackTwo600>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    const chartPart = () => {
        return (
            <View style={[mh15, mt10]}>
                <View style={[flexRow, justifyBetween]}>
                    {invoiceStaticsData.map((item) => (
                        <View key={item.id}>
                            <View style={{ height: 10, width: 10, backgroundColor: item.color, borderRadius: 20 }} />
                            <H12blackTwo600 style = {mt5}>{item.title}</H12blackTwo600>
                            <H16BlackOne700 style = {mt5}>{item.amount}</H16BlackOne700>
                        </View>
                    ))}
                </View>
                <View style={[flexRow, mt15]}>
                    {invoiceStaticsData.map((item) => (
                        <View key={item.id}>
                            <View style={{ backgroundColor: item.color, width: item.percentage, height: 5 }} />
                        </View>
                    ))}
                </View>
            </View>
        );
    };



    return (
        <View style={{ marginTop: 15, height: 180, width: '100%', alignSelf: 'center', backgroundColor: colors.greyOne, borderRadius: 8 }}>
            <View style={[mh15, mv15, flexRow, alignItemCenter, justifyBetween]}>
                <H16BlackOne700>{labels.invoiceStatics}</H16BlackOne700>
                <TouchableOpacity onPress={toggleModal} style={[flexRow, alignItemCenter, justifyAround, p5, { borderWidth: 1, borderColor: colors.greyFour, width: 80, borderRadius: 8 }]}>
                    <H14blackTwo600>{selectedWeeklyOption}</H14blackTwo600>
                    <CustomIcon color={colors.blackOne} size={14} name='chevron-down' type='Entypo' />
                </TouchableOpacity>
                {monthlyWeeklyModal()}
            </View>
            <View style={[{ borderBottomWidth: 1, borderBottomColor: colors.greyTwo }, mh15, mb15]} />
            {chartPart()}
        </View>
    )
}

export default InvoiceStatics