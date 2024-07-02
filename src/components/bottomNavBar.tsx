import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { addNewDashboardData } from '../utils/data/dashboardData';
import CustomIcon from '../utils/icons';
import { labels } from '../utils/labels';
import { screenName } from '../utils/screenNames';
import { H12BlackOne600, H14blackOne600, H18BlackOne700 } from '../utils/styledComponents';
import { HomeBottomTab, InvoicesBottomTab, ReportsBottomTab, SettingsBottomTab } from '../utils/svg';
import { colors } from '../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, flex1, flexRow, justifyBetween, justifyCenter, mb10, mb15, ml10, mr10, ph15, pv10 } from '../utils/theme/commonStyles';
import CustomModal from './commonModal';

interface Props {
    navigationPlusButton?: any;
}

const BottomNavBar: React.FC<Props> = ({ navigationPlusButton }) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const addNewModal = () => {
        const chunks: any[] = [];
        for (let i = 0; i < addNewDashboardData.length; i += 6) {
            chunks.push(addNewDashboardData.slice(i, i + 6));
        }

        return (
            <View>
                <View style={[{ height: 4, width: 70, borderRadius: 10, backgroundColor: colors.black }, alignSelfCenter, mb15]} />
                <H18BlackOne700 style={mb10}>{labels.addNew}</H18BlackOne700>
                <View style={[flexRow, alignItemCenter]}>
                    {chunks.map((chunk, index) => (
                        <View key={index} style={[flex1, alignItemCenter]}>
                            {chunk.map((item: any) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[flexRow, justifyBetween, alignItemCenter, { height: 40, width: '90%', marginVertical: 5, borderWidth: 1, borderColor: colors.greyFour, borderRadius: 5 }]}
                                    onPress={() => { }}
                                >
                                    <H14blackOne600 style={ml10}>{item.title}</H14blackOne600>
                                    <View style={[justifyCenter, alignItemCenter, mr10, { height: 16, width: 16, backgroundColor: colors.blackOne, borderRadius: 5 }]}>
                                        <CustomIcon color={colors.white} name='plus' size={12} type='Entypo' />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        );
    };


    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <View style={[flexRow, justifyBetween, ph15, pv10, { backgroundColor: colors.white, height: 60, borderRadius: 10,  shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 8, }]}>
                <TouchableOpacity onPress={() => navigation.navigate(screenName.DashboardScreen as never)} style={alignItemCenter}>
                    <HomeBottomTab height={25} width={25} />
                    <H12BlackOne600>Home</H12BlackOne600>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(screenName.InvoiceScreen as never)} style={alignItemCenter}>
                    <InvoicesBottomTab height={25} width={25} />
                    <H12BlackOne600>Invoices</H12BlackOne600>
                </TouchableOpacity>
                <View style={[{ height: 60, width: 80, backgroundColor: colors.white, bottom: 40, borderTopLeftRadius: 55, borderTopRightRadius: 55,  }, alignItemCenter, justifyCenter]}>
                    {
                        navigationPlusButton ?
                            <TouchableOpacity onPress={navigationPlusButton} style={[{ height: 45, width: 45, backgroundColor: colors.primary, borderRadius: 25 }, alignItemCenter, justifyCenter]}>
                                <CustomIcon color={colors.white} name='plus' size={24} type='Entypo' />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={openModal} style={[{ height: 45, width: 45, backgroundColor: colors.primary, borderRadius: 25 }, alignItemCenter, justifyCenter]}>
                                <CustomIcon color={colors.white} name='plus' size={24} type='Entypo' />
                            </TouchableOpacity>
                    }

                </View>
                <TouchableOpacity onPress={() => navigation.navigate(screenName.ReportsScreen as never)} style={alignItemCenter}>
                    <ReportsBottomTab height={25} width={25} />
                    <H12BlackOne600>Reports</H12BlackOne600>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(screenName.SettingsScreen as never)} style={alignItemCenter}>
                    <SettingsBottomTab height={25} width={25} />
                    <H12BlackOne600>Settings</H12BlackOne600>
                </TouchableOpacity>
            </View>
            <CustomModal children={addNewModal()} visible={showModal} onClose={closeModal} height={'80%'} />
        </View>
    );
}

export default BottomNavBar;
