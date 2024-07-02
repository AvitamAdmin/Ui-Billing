import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { CustomTextInputField, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { colors } from '../../utils/theme/colors';
import { flex1, mh15, mv15 } from '../../utils/theme/commonStyles';

export type vendorDetailsProps = {
    
    }


const VendorDetails = (props: vendorDetailsProps) => {

    const {
        control,
    } = useForm();
    
    return (
        <View style={[flex1, { backgroundColor: colors.whiteTwo }]}>
            <View style={mh15}>
                <View style={mv15}>
                    <TopHeader headerText={labels.vendorDetails} />
                </View>
                <ScrollView>
                    <View style={{ paddingBottom: '50%' }}>
                        <CustomTextInputField name={labels.name} control={control} placeholder={'Enter ' + labels.name} label={labels.referenceNumber} defaultValue={'Emily'} />
                        <CustomTextInputField name={labels.email} control={control} placeholder={'Enter ' + labels.amount} label={labels.email} defaultValue='emily23@gmail.com' />
                        <CustomTextInputField name={labels.phoneNumber} control={control} placeholder={'Enter ' + labels.phoneNumber} label={labels.phoneNumber} defaultValue='8920367183' />
                        <CustomTextInputField name={labels.closingBalance} control={control} placeholder={'Select ' + labels.date} label={labels.expenseDate} defaultValue='9,02,50,000' />
                        <CustomTextInputField name={'Mode'} control={control} placeholder={'Select ' + labels.paymentStatus} label={'Mode'} defaultValue='Debit' />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default VendorDetails