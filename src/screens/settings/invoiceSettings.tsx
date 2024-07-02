import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, TopHeader } from '../../components/commonComponents';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { BottomWidth } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { bg_color_white, flex1, mh15, mv10 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type InvoiceSettingsProps = {

};

const InvoiceSettings = (props: InvoiceSettingsProps) => {
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const navigation = useNavigation();

    const { control } = useForm();

    const handleSaveBtnClick = () => {
        setIsActiveBtn((prevState) => !prevState);
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn((prevState) => !prevState);
    };

    return (
        <View style={[flex1, bg_color_white]}>
            <View style={[flex1, mh15]}>
                <View style={[mv10]}>
                    <TopHeader headerText={labels.invoiceSettings} searchIcon={true} searchName={labels.invoicePrefix} searchText={'Select' + labels.invoicePrefix} />
                </View>
                <BottomWidth style={[mv10]} />
                <ScrollView>
                    <View style={{ paddingBottom: 80, }}>
                        <CustomTextInputField name={labels.invoicePrefix} control={control} placeholder={labels.enterInvoicePrefix} label={labels.invoicePrefix} />
                        <View style={[mv10]}>
                            <UploadImageCard title={labels.invoiceLogo} sizeInfo={labels.sizeOfImg1} onUpload={() => { }} onDelete={() => { }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
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

export default InvoiceSettings;