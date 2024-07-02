import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { CustomTextInputField, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { H12redTwo600, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, mh10, mh15, mv10, mv15 } from '../../utils/theme/commonStyles';

export type viewExpensesProps = {

}


const ViewExpenses = (props: viewExpensesProps) => {
    const {
        control,
    } = useForm();


    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={'View ' + labels.expenses} />
                </View>
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <SmallCard style={mv10}>
                            <H12redTwo600 style={[mh10]}>Expense ID :  EXP - 0015</H12redTwo600>
                        </SmallCard>
                        <CustomTextInputField name={labels.referenceNumber} control={control} placeholder={'Enter ' + labels.referenceNumber} label={labels.referenceNumber} defaultValue={'75756'} />
                        <CustomTextInputField name={labels.amount} control={control} placeholder={'Enter ' + labels.amount} label={labels.amount} defaultValue='$1500' />
                        <CustomTextInputField name={labels.paymentMode} control={control} placeholder={'Enter ' + labels.purchasePrice} label={labels.paymentMethod} showIcon={true} defaultValue='Cash' />
                        <CustomTextInputField name={labels.expenseDate} control={control} placeholder={'Select ' + labels.date} label={labels.expenseDate} showIcon={true} showCalendar={true} iconName='calendar' iconType='Feather' iconSize={16} defaultValue='15 Mar 2024' />
                        <CustomTextInputField name={labels.paymentStatus} control={control} placeholder={'Select ' + labels.paymentStatus} label={labels.paymentStatus} showIcon={true} defaultValue='Pending' />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ViewExpenses