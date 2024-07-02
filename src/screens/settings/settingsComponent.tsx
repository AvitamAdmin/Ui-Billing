import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField } from '../../components/commonComponents';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { colors } from '../../utils/theme/colors';
import { flex1, mv10 } from '../../utils/theme/commonStyles';
import { ModalTopText } from '../inventory/stockDetails';

export type SettingsComponentsProps = {
    onSave: () => void;
    onCancel: () => void;
};

export const AddBankDetails = ({ onSave, onCancel }: SettingsComponentsProps) => {
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const handleCancelBtnClick = () => {
        setIsActiveBtn(true);
        onCancel();
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(false);
        onSave();
    };

    const { control } = useForm();

    return (
        <View style={[flex1]}>
            <ScrollView>
                <View style={{ paddingBottom: 80 }}>
                    <ModalTopText title={labels.addBankDetails} iconPress={() => { }} />
                    <View style={[mv10]}>
                        <CustomTextInputField name={labels.bankName} control={control} placeholder={''} label={labels.bankName} />
                        <CustomTextInputField name={labels.accountNumber1} control={control} placeholder={''} label={labels.accountNumber1} />
                        <CustomTextInputField name={labels.accountHolderName} control={control} placeholder={''} label={labels.accountHolderName} />
                        <CustomTextInputField name={labels.branchName} control={control} placeholder={''} label={labels.branchName} />
                        <CustomTextInputField name={labels.ifsc} control={control} placeholder={''} label={labels.ifsc} />
                    </View>
                </View>
            </ScrollView>
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

export const AddTaxRates = ({ onSave, onCancel }: SettingsComponentsProps) => {
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const handleCancelBtnClick = () => {
        setIsActiveBtn(true);
        onCancel();
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(false);
        onSave();
    };

    const { control } = useForm();

    return (
        <View style={[flex1]}>
            <ScrollView>
                <View style={{ paddingBottom: 80 }}>
                    <ModalTopText title={labels.addTax} iconPress={() => { } } toggleBtn={true}  />
                    <View style={[mv10]}>
                        <CustomTextInputField name={labels.taxName} control={control} placeholder={''} label={labels.taxName} />
                        <CustomTextInputField name={labels.taxRates} control={control} placeholder={''} label={labels.taxRates} />
                        <CustomTextInputField name={labels.type} control={control} placeholder={labels.chooseType} label={labels.type} showIcon={true} />
                    </View>
                </View>
            </ScrollView>
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


export const AddTax = ({ onSave, onCancel }: SettingsComponentsProps) => {
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const handleCancelBtnClick = () => {
        setIsActiveBtn(true);
        onCancel();
    };

    const handleSaveBtnClick = () => {
        setIsActiveBtn(false);
        onSave();
    };

    const { control } = useForm();

    return (
        <View style={[flex1]}>
            <ScrollView>
                <View style={{ paddingBottom: 80 }}>
                    <ModalTopText title={labels.editProduct} iconPress={() => { } }   />
                    <View style={[mv10]}>
                    <CustomTextInputField  name={labels.quantity} control={control} placeholder={''} label={labels.quantity} showIcon={true} showCalendar={true} iconName='select-arrows' iconType='Entypo' iconSize={16} />

                        <CustomTextInputField name={labels.rate} control={control} placeholder={''} label={labels.rate} />
                        <CustomTextInputField name={labels.discountAmnt} control={control} placeholder={''} label={labels.discountAmnt} />
                        <CustomTextInputField name={labels.tax} control={control} placeholder={''} label={labels.tax} />
                    </View>
                </View>
            </ScrollView>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

