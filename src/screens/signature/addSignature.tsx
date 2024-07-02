import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, MultiSelectOption, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H14blackOne500 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flexRow, mh15, mh5, mv10, mv15, mv5 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type AddSignatureProps = {

}


const AddSignature = (props: AddSignatureProps) => {
    const [isActiveBtn, setIsActiveBtn] = useState(false);
    const [checkBox, setCheckBox] = useState(false);

    const navigation = useNavigation()

    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
        navigation.navigate(screenName.Signatures as never)
    };
    const handleCheckBox = () => {
        setCheckBox(!checkBox);
    }
    const {
        control,
    } = useForm();

    return (
        <View style={{ flex: 1, backgroundColor: colors.whiteTwo }}>
            <View style={mh15}>

                <View style={mv15}>
                    <TopHeader
                        headerText={labels.addSignature}
                    />
                </View>
                <BottomWidth style={mv5} />
                <CustomTextInputField name={labels.signatureName} control={control} placeholder={labels.enterSignatureName} label={labels.signatureName} />
                <View style={[mv10]}>
                    <UploadImageCard title={labels.signatures} sizeInfo={labels.sizeOfImg3} onUpload={() => { }} onDelete={() => { }} />
                </View>
                <View style={[flexRow]}>
                    <MultiSelectOption selectedColor={colors.primary} unselectedColor={colors.danger} isSelected={checkBox} onSelect={handleCheckBox} />
                    <H14blackOne500 style={[mh5]}>{labels.markAsDefault}</H14blackOne500>
                </View>
            </View>
            <View style={styles.bottomButtonsContainer}>
                <OnboardingButton
                    width={160}
                    title={labels.reset}
                    onChange={handleSaveBtnClick}
                    backgroundColor={isActiveBtn ? colors.primary : colors.greySeven}
                    color={isActiveBtn ? colors.white : colors.blackOne}
                />
                <OnboardingButton
                    width={160}
                    title={labels.saveChanges}
                    onChange={handleCancelBtnClick}
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
export default AddSignature