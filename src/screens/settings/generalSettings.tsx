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
import { flex1, mh15, mv10, mv15, mv5 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type GeneralSettingsProps = {

};

const GeneralSettings = (props:GeneralSettingsProps) => {
    const [selectedTab, setSelectedTab] = useState(labels.basicDetails);
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const navigation = useNavigation();
    const { control } = useForm();

    const handleSaveBtnClick = () => {
        setIsActiveBtn((prevState) => !prevState);
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn((prevState) => !prevState);
    };

    const tabs = [{ label: labels.basicDetails }, { label: labels.addressInfo }];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
        setIsActiveBtn(false); // Reset isActiveBtn when tab changes
    };

    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={[ mh15]}>
                <View style={[mv15]}>
                    <TopHeader headerText={labels.generalSettings} searchIcon={true} searchName={selectedTab} searchText={'Select' + selectedTab} />
                </View>
                <BottomWidth style={{marginVertical:8}} />
                <View style={[mv5]}>
                    <TabBar tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} borderRadius={50} width={150} />
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ paddingBottom: 80 }}>
                        {selectedTab === labels.basicDetails && (
                            <View>
                                <UploadImageCard title={labels.mainLogo} sizeInfo={labels.sizeOfImg2} onUpload={() => { }} onDelete={() => { }} />
                                <View style={[mv10]}>
                                    <UploadImageCard title={labels.companyIcon} sizeInfo={labels.sizeOfImg3} onUpload={() => { }} onDelete={() => { }} />
                                </View>
                                <CustomTextInputField name={labels.companyName} control={control} placeholder={labels.enterCompanyName} label={labels.companyName} />
                                <CustomTextInputField name={labels.companyEmail} control={control} placeholder={labels.enterCompanyEmail} label={labels.companyEmail} />
                                <CustomTextInputField name={labels.mobileNumber} control={control} placeholder={labels.enterMobileNumber} label={labels.mobileNumber} />
                            </View>
                        )}
                        {selectedTab === labels.addressInfo && (
                            <View>
                                <CustomTextInputField name={labels.addressLine1} control={control} placeholder={labels.enterAddress} label={labels.addressLine1} />
                                <CustomTextInputField name={labels.addressLine2} control={control} placeholder={labels.enterAddress} label={labels.addressLine2} />
                                <CustomTextInputField name={labels.country} control={control} placeholder={labels.enterCountry} label={labels.enterCountry} />
                                <CustomTextInputField name={labels.state} control={control} placeholder={labels.chooseState} label={labels.chooseState} showIcon={true} />
                                <CustomTextInputField name={labels.city} control={control} placeholder={labels.chooseCity} label={labels.chooseCity} showIcon={true} />
                                <CustomTextInputField name={labels.pinCode} control={control} placeholder={labels.enterPincode} label={labels.pinCode} />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            {(selectedTab === labels.basicDetails || selectedTab === labels.addressInfo) && (
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


export default GeneralSettings;
