import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { colors } from '../../utils/theme/colors';
import { flex1, mt10, mh10, flexRow, justifyBetween, alignItemCenter, mv10, justifyAround, justifyCenter, ml5, justifyEvenly, ml10, mr10, mt5, mb15 } from '../../utils/theme/commonStyles';
import { H12redTwo500, H12white600, H14blackTwo600, H18BlackOne700 } from '../../utils/styledComponents';
import CustomIcon from '../../utils/icons';
import { quotationBottomBarData } from '../../utils/data/quotationsData';
import { InvoicePdfImage } from '../../utils/png';


export type addInvoiceOptionProps = {

}


const AddInvoiceOption = (props: addInvoiceOptionProps) => {
    return (
        <View style={[flex1, { backgroundColor: colors.white }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[flex1, mt10,]}>
                    <View style = {[mh10]}>
                        <TopHeader headerText={labels.invoiceDetails} searchIcon={false} />
                    </View>
                    <View style={[flexRow, justifyBetween, alignItemCenter, mv10, mh10]}>
                        <View>
                            <H18BlackOne700>Invoice Name</H18BlackOne700>
                            <H12redTwo500>#INV34654</H12redTwo500>
                        </View>
                        <View style={[flexRow, justifyAround, alignItemCenter]}>
                            <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter]}>
                                <CustomIcon name={'edit'} size={15} color={colors.blackTwo} type={'Feather'} />
                            </View>
                            <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml5]}>
                                <CustomIcon name={'delete-forever-outline'} size={17} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                            </View>
                            <View style={[{ height: 25, backgroundColor: colors.green, borderRadius: 5 }, alignItemCenter, justifyCenter, flexRow, justifyEvenly, ml10]}>
                                <View style={[ml10, { height: 5, width: 5, borderRadius: 20, backgroundColor: colors.white }]} />
                                <H12white600 style={[ml5, mr10]}>Paid</H12white600>
                            </View>
                        </View>
                    </View>
                    <View style={[{ height: 550, backgroundColor: colors.white4, }, alignItemCenter, justifyCenter]}>
                        <Image source={InvoicePdfImage} style={{ height: '85%', width: '90%' }} resizeMode='contain' />
                    </View>
                </View>
            </ScrollView>
            <View style={[flexRow, justifyAround, mb15]}>
                {
                    quotationBottomBarData.map((item) => {
                        return (
                            <View key={item.id}>
                                <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter]}>
                                    <CustomIcon name={item.iconName} size={15} color={colors.blackTwo} type={item.iconType} />
                                </View>
                                <H14blackTwo600 style={[mt5]}>{item.name}</H14blackTwo600>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default AddInvoiceOption