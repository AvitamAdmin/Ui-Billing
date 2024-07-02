import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, TabBar, TopHeader } from '../../components/commonComponents';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { BottomWidth } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type accountSettingsProps = {}

const AccountSettings = (props: accountSettingsProps) => {

    const [selectedTab, setSelectedTab] = useState(labels.basicDetails);
    const navigation = useNavigation();
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const { control } = useForm();

    const handleSaveBtnClick = () => {
        setIsActiveBtn(prevState => !prevState);
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(prevState => !prevState);
    };

    const tabs = [
        { label: labels.basicDetails },
        { label: labels.changePassword },
    ];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
        setIsActiveBtn(false); // Reset isActiveBtn when tab changes
    };

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>

            <View style={[flex1, mh15]}>
                <View style={[mv15]}>
                    <TopHeader headerText={labels.accountsettings} searchIcon={true} searchName={selectedTab} searchText={'Select' + selectedTab}/>
                </View>
                <BottomWidth style={[mv5]}/>
                <View style={[mv15]}>
                    <TabBar tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} borderRadius={50} width={150} />
                </View>
                <ScrollView >
                    <View style={{ paddingBottom: 60 }}>
                        {selectedTab === labels.basicDetails && (
                            <View>
                                <UploadImageCard imgTrue={true} title={labels.customerImage} sizeInfo={labels.sizeOfImg1} onUpload={() => { }} onDelete={() => { }} />
                                <CustomTextInputField name={labels.firstName} control={control} placeholder={labels.enterFirstName} label={labels.firstName} />
                                <CustomTextInputField name={labels.lastName} control={control} placeholder={labels.enterLastName} label={labels.lastName} />
                                <CustomTextInputField name={labels.email} control={control} placeholder={labels.enterEmail} label={labels.email} />
                                <CustomTextInputField name={labels.mobileNumber} control={control} placeholder={labels.enterMobileNumber} label={labels.mobileNumber} />
                                <CustomTextInputField name={labels.gender} control={control} placeholder={labels.chooseGender} label={labels.gender} showIcon={true} />
                                <CustomTextInputField name={labels.dateofBirth} control={control} placeholder={labels.chooseDate} label={labels.dateofBirth} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
                            </View>
                        )}
                        {selectedTab === labels.changePassword && (
                            <View>
                                <CustomTextInputField name={labels.oldPassword} control={control} placeholder={labels.enterOldPassword} label={labels.oldPassword} />
                                <CustomTextInputField name={labels.newPassword} control={control} placeholder={labels.enterNewPassword} label={labels.newPassword} />
                                <CustomTextInputField name={labels.confirmPassword} control={control} placeholder={labels.enterConfirmPassword} label={labels.confirmPassword} />
                                <CustomTextInputField name={labels.confirmPassword} control={control} placeholder={labels.enterConfirmPassword} label={labels.confirmPassword} />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            {(selectedTab === labels.basicDetails || selectedTab === labels.changePassword) && (
                    <View style={styles.bottomButtonsContainer}>
                        <OnboardingButton
                            width={DevWidth / 2.3}
                            title={labels.cancel}
                            onChange={handleCancelBtnClick}
                            backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                            color={isActiveBtn ? colors.white : colors.blackOne}
                        />
                        <OnboardingButton
                            width={DevWidth / 2.3}
                            title={labels.saveChanges}
                            onChange={handleSaveBtnClick}
                            backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                            color={isActiveBtn ? colors.blackOne : colors.white}
                        />
                    </View>
                )}
        </View>
    )
}

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

export default AccountSettings;
