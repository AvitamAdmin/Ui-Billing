import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H12redTwo600, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mh10, mh15, mv10, mv15 } from '../../utils/theme/commonStyles';
import { UploadImageCard } from '../products/uploadImageCard';

export type addExpensesProps = {

}


const AddExpenses = (props: addExpensesProps) => {
    const navigation = useNavigation();
    const [isActiveBtn, setIsActiveBtn] = useState(false);

    const handleSaveBtnClick = () => {
        setIsActiveBtn(true);
        navigation.navigate(screenName.ExpensesScreen as never)
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
                    <TopHeader headerText={labels.addExpense} />
                </View>
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <SmallCard style={mv10}>
                            <H12redTwo600 style={[mh10]}>Expense ID :  EXP - 0015</H12redTwo600>
                        </SmallCard>
                        <CustomTextInputField name={labels.referenceNumber} control={control} placeholder={'Enter ' + labels.referenceNumber} label={labels.referenceNumber} />
                        <CustomTextInputField name={labels.amount} control={control} placeholder={'Enter ' + labels.amount} label={labels.amount} />
                        <CustomTextInputField name={labels.paymentMode} control={control} placeholder={'Enter ' + labels.purchasePrice} label={labels.paymentMethod} showIcon={true} />
                        <CustomTextInputField name={labels.expenseDate} control={control} placeholder={'Select ' + labels.date} label={labels.expenseDate} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} />
                        <CustomTextInputField name={labels.paymentStatus} control={control} placeholder={'Select ' + labels.paymentStatus} label={labels.paymentStatus} showIcon={true} />
                        <View style={[mv10]}>
                            <UploadImageCard title={labels.attachment} sizeInfo={labels.sizeOfImg1} onUpload={() => { }} onDelete={() => { }} />
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
                    onChange={handleSaveBtnClick}
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
export default AddExpenses