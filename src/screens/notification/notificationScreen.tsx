import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { TopHeader } from '../../components/commonComponents';
import PopupCardModal from '../../components/popoupCardModal';
import { notificationData1, notificationData2 } from '../../utils/data/notificationData';
import { DevHeight } from '../../utils/device';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { BottomWidth, H12Primary400, H12blackTwo400, H14blackOne500, H14blackTwo400, H16BlackOne700, MainListCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, flex1, flexRow, justifyBetween, justifyCenter, mh10, mh15, mh5, mt10, mv15, mv5 } from '../../utils/theme/commonStyles';

export type notificationScreenProps = {

}

const NotificationScreen = (props: notificationScreenProps) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    // const handleSaveChangesBtnClick = () => {
    //     setIsActiveBtn(true);
    //     openModal()
    //     // navigation.navigate(screenName.CustomerDetails as never)
    // }

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.notification} searchIcon={true} searchName={'Search' + labels.notification} searchText={labels.notification} />
                </View>
                <BottomWidth style={[mv5]} />
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity>
                                <MainListCard style={[flexRow, justifyCenter, alignItemCenter, { width: DevHeight / 5 }]} >
                                    <View style={{ backgroundColor: colors.white4, height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                        <CustomIcon name={'checkmark-done-outline'} size={16} color={colors.blackOne} type={'Ionicons'} />
                                    </View>
                                    <H14blackOne500 style={[mh5]}>{labels.markallasRead}</H14blackOne500>
                                </MainListCard>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openModal}>
                                <MainListCard style={[flexRow, justifyCenter, alignItemCenter, { width: DevHeight / 4.9 }]} >
                                    <View style={{ backgroundColor: colors.white4, height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 2, marginHorizontal: 5 }}>
                                        <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                    </View>
                                    <H14blackOne500 >{labels.deleteAllNotifications}</H14blackOne500>
                                </MainListCard>
                            </TouchableOpacity>
                        </View>
                        <H16BlackOne700>Today</H16BlackOne700>
                        {notificationData1.map((data) => {
                            return (
                                <View key={data.id}>
                                    <MainListCard>
                                        <View style={[flexRow]}>
                                            <View style={{ backgroundColor: colors.white4, height: 44, width: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                <Image source={data.icon} style={{ height: 24, width: 24 }} resizeMode='contain' />
                                            </View>
                                            <View style={[alignSelfCenter, mh10]}>
                                                <H14blackOne500>{data.notificationType + ' : '}
                                                    <H14blackTwo400>{data.notification}</H14blackTwo400>
                                                    <H12Primary400>{data.invoiceId}</H12Primary400>
                                                    <H14blackTwo400>{data.notificationMsg1}</H14blackTwo400>
                                                </H14blackOne500>
                                                <View style={[mt10, flexRow, justifyBetween]}>
                                                    <H12blackTwo400>{data.time}</H12blackTwo400>
                                                    <TouchableOpacity onPress={openModal}>
                                                        <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        {data.id === 1 && (
                                            <View style={{ position: 'absolute', left: 9, width: 9, top: 8, height: 9, borderRadius: 25, zIndex: 100, backgroundColor: colors.primary }}>
                                            </View>
                                        )}
                                    </MainListCard>
                                </View>
                            )
                        })}
                        <H16BlackOne700>YesterDay</H16BlackOne700>
                        {notificationData2.map((data) => {
                            return (
                                <View key={data.id}>
                                    <MainListCard>
                                        <View style={[flexRow]}>
                                            <View style={[mh10]}>
                                                <View style={{ backgroundColor: colors.white4, height: 44, width: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                    <Image source={data.icon} style={{ height: 24, width: 24 }} resizeMode='contain' />
                                                </View>
                                            </View>
                                            <View>
                                                <View style={[alignSelfCenter,]}>
                                                    <H14blackOne500>{data.notificationType + ' : '}
                                                        <H14blackTwo400>{data.notification}</H14blackTwo400>
                                                    </H14blackOne500>
                                                </View>
                                                <View style={[flexRow, justifyBetween,mt10]}>
                                                    <H12blackTwo400>{data.time}</H12blackTwo400>
                                                    <TouchableOpacity onPress={openModal}>
                                                        <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>

                                    </MainListCard>
                                </View>
                            )
                        })}
                    </View>
                    {showModal && <PopupCardModal handleYesBtn={closeModal} text='Do you want to Delete Notification' visible={showModal} onClose={closeModal} />}

                </ScrollView>
            </View>
            <BottomNavBar />
        </View>
    )
}

export default NotificationScreen;