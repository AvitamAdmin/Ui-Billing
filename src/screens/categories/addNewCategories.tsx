import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { colors } from '../../utils/theme/colors';
import { bg_color_white, flex1, mh15, mv10, mv15 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type AddNewCategoriesProps = {

}

const AddNewCategories = (props: AddNewCategoriesProps) => {
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const {
        control,
    } = useForm();
    const formKeys = {
        name: 'name',
        slug: 'slug',
    }
    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
    };

    const handleCancelBtnClick = () => {
        setIsActiveBtn(false);
    };

    return (
        <View style={[flex1, bg_color_white]}>
            <View style={[mh15, mv10]}>
                <TopHeader headerText={labels.addNewCategory} />
                <View style={[mv15]}>
                    <UploadImageCard title={labels.customerImage} sizeInfo={labels.sizeOfImg1} onUpload={()=>{}} onDelete={()=>{}} />
                </View>
                <CustomTextInputField name={formKeys.name} control={control} placeholder={labels.enterCategorySlug} label={labels.name} />
                <CustomTextInputField name={formKeys.slug} control={control} placeholder={labels.enterSlug} label={labels.slug} />
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

export default AddNewCategories;
