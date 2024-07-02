import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CustomTextInputField, ListSubHeader, MultiLineTextBox, TabBar, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { colors } from '../../utils/theme/colors';
import { flex1, mt10, mh10, mv15, alignSelfCenter, ml10, mr10, alignItemCenter, mt15, mr15, flexRow, justifyBetween } from '../../utils/theme/commonStyles';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../utils/screenNames';
import { UploadImageCard } from '../products/uploadImageCard';
import { useForm } from 'react-hook-form';
import { OnboardingButton } from '../../components/commonButton';
import { DevWidth } from '../../utils/device';
import DashedLine from '../../components/dashedLine';
import { H16BlackOne700, H18BlackOne700 } from '../../utils/styledComponents';
import PopupCardModal from '../../components/popupCardModal';

export type addCustomersProps = {

}


const AddCustomersScreen = (props: addCustomersProps) => {
    const navigation = useNavigation();

    const [selectedTab, setSelectedTab] = useState(labels.basicDetails);
    const [notes, setNotes] = useState('');
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const tabs = [
        { label: labels.basicDetails },
        { label: labels.address },
        { label: labels.bankDetails },
    ];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
    };

    const handlePrevBtnClick = () => {
        setIsActiveBtn(true);
        setSelectedTab(labels.basicDetails);
    };

    const handlePrevTwoBtnClick = () => {
        setIsActiveBtn(true);
        setSelectedTab(labels.address);
    }

    const handleSaveChangesBtnClick = () => {
        setIsActiveBtn(true);
        // navigation.navigate(screenName.CustomerDetails as never)
    }

    const handleNextBtnClick = () => {
        setIsActiveBtn(false);
        setSelectedTab(labels.bankDetails);
    };

    const formKeys = {
        name: 'name',
        email: 'email',
        phone: 'phone',
        website: 'website',
        notes: 'notes',
        nameSecond: 'nameSecond',
        addressOne: 'addressOne',
        addressTwo: 'addressTwo',
        city: 'city',
        state: 'state',
        country: 'country',
        pincode: 'pincode',
        bankName: 'bankName',
        branch: 'branch',
        accountHolderName: 'accountHolderName',
        accountNumber: 'accountNumber',
        ifsc: 'ifsc',
    }

    const {
        control,
    } = useForm();

    const basicDetails = () => {
        return (
            <View style={[{}]}>
                <View style={[mv15, mr10]}>
                    <UploadImageCard title={labels.customerImage} sizeInfo={'Size should be below 4 MB'} onUpload={() => { }} onDelete={() => { }} />
                </View>
                <View style={[mr10]}>
                    <CustomTextInputField name={formKeys.name} control={control} placeholder={labels.enterName} label={labels.name} />
                    <CustomTextInputField name={formKeys.email} control={control} placeholder={labels.enterEmailAddress} label={labels.emailAddress} />
                    <CustomTextInputField name={formKeys.phone} control={control} placeholder={labels.enterPhone} label={labels.phone} />
                    <CustomTextInputField name={formKeys.website} control={control} placeholder={labels.addWebsite} label={labels.website} />
                    <MultiLineTextBox
                        placeHolder={labels.notes}
                        label={labels.notes}
                        value={notes}
                        onChangeValue={() => setNotes(notes)}
                        multiline={true}
                        keyboardType="default"
                        height={100}
                        maxLength={200}
                        disable={false}
                    />
                    <View style={[mv15, { bottom: 0 }]}>
                        <OnboardingButton
                            width={DevWidth / 1.1}
                            title={labels.next}
                            onChange={() => setSelectedTab(labels.address)}
                            backgroundColor={colors.primary}
                            color={colors.white}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const address = () => {
        return (
            <View style={[mt15]}>
                <H16BlackOne700>{labels.billingAddress}</H16BlackOne700>
                <View style={[alignItemCenter, mv15, mr15]}>
                    <DashedLine height={330} color={colors.greyTwo} dashLength={5} dashGap={0} />
                </View>
                <View style={[mr10]}>
                    <CustomTextInputField name={formKeys.name} control={control} placeholder={labels.enterName} label={labels.name} />
                    <CustomTextInputField name={formKeys.addressOne} control={control} placeholder='' label={labels.addressLine1} />
                    <CustomTextInputField name={formKeys.addressTwo} control={control} placeholder='' label={labels.addressLine2} />
                    <View style={[flexRow, justifyBetween]}>
                        <CustomTextInputField width={160} name={formKeys.city} control={control} placeholder={labels.enterCity} label={labels.city} />
                        <CustomTextInputField width={160} name={formKeys.state} control={control} placeholder={labels.enterState} label={labels.state} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomTextInputField name={formKeys.country} control={control} placeholder={labels.select} label={labels.country} width={160} showIcon={true} />
                        <CustomTextInputField name={formKeys.pincode} control={control} placeholder={labels.enterPincode} label={labels.pincode} width={160} />
                    </View>
                </View>
                <H16BlackOne700 style={mt15}>{labels.shippingAddress}</H16BlackOne700>
                <View style={[alignItemCenter, mv15, mr15]}>
                    <DashedLine height={330} color={colors.greyTwo} dashLength={5} dashGap={0} />
                </View>
                <View style={[mr10]}>
                    <CustomTextInputField name={formKeys.name} control={control} placeholder={labels.enterName} label={labels.name} />
                    <CustomTextInputField name={formKeys.addressOne} control={control} placeholder='' label={labels.addressLine1} />
                    <CustomTextInputField name={formKeys.addressTwo} control={control} placeholder='' label={labels.addressLine2} />
                    <View style={[flexRow, justifyBetween]}>
                        <CustomTextInputField width={160} name={formKeys.city} control={control} placeholder={labels.enterCity} label={labels.city} />
                        <CustomTextInputField width={160} name={formKeys.state} control={control} placeholder={labels.enterState} label={labels.state} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomTextInputField name={formKeys.country} control={control} placeholder={labels.select} label={labels.country} width={160} showIcon={true} />
                        <CustomTextInputField name={formKeys.pincode} control={control} placeholder={labels.enterPincode} label={labels.pincode} width={160} />
                    </View>
                    <View style={[flexRow, justifyBetween, { marginTop: 30 }]}>
                        <OnboardingButton
                            width={160}
                            title={labels.prev}
                            onChange={handlePrevBtnClick}
                            backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                            color={isActiveBtn ? colors.white : colors.blackOne}
                        />
                        <OnboardingButton
                            width={160}
                            title={labels.next}
                            onChange={handleNextBtnClick}
                            backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                            color={isActiveBtn ? colors.blackOne : colors.white}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const bankDetails = () => {
        return (
            <View style={[mt15]}>
                <H16BlackOne700>{labels.bankDetails}</H16BlackOne700>
                <View style={[alignItemCenter, mv15, mr15]}>
                    <DashedLine height={330} color={colors.greyTwo} dashLength={5} dashGap={0} />
                </View>
                <View style={[mr10]}>
                    <CustomTextInputField name={formKeys.bankName} control={control} placeholder={labels.enterBankName} label={labels.bankName} />
                    <CustomTextInputField name={formKeys.branch} control={control} placeholder={labels.enterBranch} label={labels.branch} />
                    <CustomTextInputField name={formKeys.accountHolderName} control={control} placeholder={labels.enterAccountHolderName} label={labels.accountHolderName} />
                    <CustomTextInputField name={formKeys.accountNumber} control={control} placeholder={labels.enterAccountNumber} label={labels.accountNumber} />
                    <CustomTextInputField name={formKeys.ifsc} control={control} placeholder={labels.enterIfsc} label={labels.ifsc} />
                    <View style={[flexRow, justifyBetween, { marginTop: 150 }]}>
                        <OnboardingButton
                            width={160}
                            title={labels.prev}
                            onChange={handlePrevTwoBtnClick}
                            backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                            color={isActiveBtn ? colors.white : colors.blackOne}
                        />
                        <OnboardingButton
                            width={160}
                            title={labels.saveChanges}
                            onChange={handleSaveChangesBtnClick}
                            backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                            color={isActiveBtn ? colors.blackOne : colors.white}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={[flex1, { backgroundColor: colors.white }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[flex1, mt10, mh10]}>
                    <TopHeader headerText={labels.addCustomer} searchIcon={false} />
                    <View style={[mv15, alignSelfCenter, ml10]}>
                        <TabBar tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
                        {selectedTab === labels.basicDetails && basicDetails()}
                        {selectedTab === labels.address && address()}
                        {selectedTab === labels.bankDetails && bankDetails()}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AddCustomersScreen;