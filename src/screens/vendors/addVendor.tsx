import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, RoundCheckBox, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H14blackOne600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mh15, mv15 } from '../../utils/theme/commonStyles';

export type addVendorProps = {
    
    }


const AddVendor = (props: addVendorProps) => {
    const navigation = useNavigation();
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const [isChecked, setIsChecked] = useState(true);

    const handleAddBtnClick = () => {
        setIsActiveBtn(true);
        navigation.navigate(screenName.VendorsScreen as never)
    };

    const handleDebitClick = () => {
        setIsChecked(true);
    };

    const handleCrediteClick = () => {
        setIsChecked(false);
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
    };

    const {
        control,
    } = useForm();
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
        <View style={mh15}>
            <View style={mv15}>
                <TopHeader headerText={labels.addVendor} />
            </View>
            <ScrollView>
                <View style={{ paddingBottom: '50%' }}>
                <CustomTextInputField name={labels.name} control={control} placeholder={'Enter ' + labels.name} label={labels.name} />
                <CustomTextInputField name={labels.email} control={control} placeholder={'Enter ' + labels.email} label={labels.email} />
                <CustomTextInputField name={labels.phoneNumber} control={control} placeholder={'Enter ' + labels.phoneNumber} label={labels.phoneNumber} />
                <CustomTextInputField name={labels.closingBalance} control={control} placeholder={labels.enterBalanceAmount} label={labels.closingBalance} />
                <H14blackOne600>{'Mode'}</H14blackOne600>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                            <RoundCheckBox
                                title={labels.debit}
                                onChange={handleDebitClick}
                                borderColor={isChecked ? colors.primary : colors.greyFour}
                                backgroundColor={isChecked ? colors.primary : 'transparent'}
                                textColor={isChecked ? colors.primary : colors.blackTwo} />
                            <RoundCheckBox
                                title={labels.credit}
                                onChange={handleCrediteClick}
                                borderColor={isChecked ? colors.greyFour : colors.primary}
                                backgroundColor={isChecked ? 'transparent' : colors.primary}
                                textColor={isChecked ? colors.blackTwo : colors.primary} />
                        </View>
                    </View>
                    </ScrollView>
                    </View>
                    <View style={styles.bottomButtonsContainer}>
                <OnboardingButton
                    width={160}
                    title={labels.cancel}
                    onChange={handleCancelBtnClick}
                    backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                    color={isActiveBtn ? colors.white : colors.blackOne}
                />
                <OnboardingButton
                    width={160}
                    title={'Add'}
                    onChange={handleAddBtnClick}
                    backgroundColor={isActiveBtn ? colors.greySeven : colors.primary}
                    color={isActiveBtn ? colors.blackOne : colors.white}
                />
            </View>
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
export default AddVendor