import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { RecenetCustomersImage1 } from '../../utils/png';
import { InvoiceCard, TopHeader } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { colors } from '../../utils/theme/colors';
import { flex1, mt10, mh10, flexRow, justifyBetween, alignItemCenter, mv15, ml15, mr15, justifyCenter, ml10, mt5, ml5, mv10, pv10, alignSelfCenter, pv5, mv5 } from '../../utils/theme/commonStyles';
import { H12BlackOne600, H12blackTwo600, H12redFour600, H14blackOne600, H15blackOne600, H16BlackOne700 } from '../../utils/styledComponents';
import BottomNavBar from '../../components/bottomNavBar';
import { screenName } from '../../utils/screenNames';
import { useNavigation } from '@react-navigation/native';
import { allInvoicesdata, invoiceCardData } from '../../utils/data/invoiceData';
import DashedLine from '../../components/dashedLine';

export type customerDetailsProps = {

}


const CustomerDetailsScreen = (props: customerDetailsProps) => {
    const navigation = useNavigation();
    return (
        <View style={[flex1, { backgroundColor: colors.white, }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[flex1, mt10, mh10, {marginBottom: 70}]}>
                    <TopHeader headerText={labels.customerDetails} searchIcon={false} />
                    <View style={[flexRow, justifyBetween, alignItemCenter, mv15, { height: 100, width: '100%', borderWidth: 1, borderColor: colors.grey, borderRadius: 8 }]}>
                        <View style={[flexRow, justifyBetween, alignItemCenter, ml15]}>
                            <View style={[alignItemCenter, justifyCenter, { height: 70, width: 70, borderWidth: 1, borderRadius: 8, borderColor: colors.grey }]} >
                                <Image source={RecenetCustomersImage1} style={{ height: 55, width: 55 }} />
                            </View>
                            <View style={[ml10]}>
                                <H15blackOne600>FedEX</H15blackOne600>
                                <H12blackTwo600 style={[mt5]}>Invoiced : 8</H12blackTwo600>
                            </View>
                        </View>
                        <View style={[{ height: 25, width: 80, backgroundColor: colors.redOne, borderRadius: 5 }, alignItemCenter, justifyCenter, mr15]}>
                            <H12redFour600>Balance : $687</H12redFour600>
                        </View>
                    </View>
                    <H16BlackOne700 style={mv5}>{labels.invoiceStatics}</H16BlackOne700>
                    <View style={[flexRow, alignItemCenter, { flexWrap: 'wrap' }]}>
                        {
                            invoiceCardData.map(({ id, Img, amount, color, count, text }) => {
                                return (
                                    <View key={id} style={[{ height: 90, width: '46%', backgroundColor: colors.white, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, }, ml10, mt10]}>
                                        <View style={[flexRow, alignItemCenter, mh10, mv10]}>
                                            <View style={[{ height: 24, width: 24, backgroundColor: color, borderRadius: 20 }, alignItemCenter, justifyCenter]}>
                                                <Img height={14} width={14} />
                                            </View>
                                            <View style={[ml10]}>
                                                <H14blackOne600 style={[]}>{amount}</H14blackOne600>
                                                <H12BlackOne600 style={[{ color: color }]}>{text}</H12BlackOne600>
                                            </View>
                                        </View>
                                        <View style={[pv5, alignSelfCenter]}>
                                            <DashedLine height={150} color={colors.greyTwo} dashLength={10} dashGap={3} />
                                        </View>
                                        <View style={[mh10]}>
                                            <H12blackTwo600 style={mt5}>No of Invoice : {count}</H12blackTwo600>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <H16BlackOne700 style={mt5}>{labels.invoice}</H16BlackOne700>
                    <View>
                        {
                            allInvoicesdata.map((invoice) => {
                                return (
                                    <InvoiceCard key={invoice.id} data={invoice} />
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            <BottomNavBar navigationPlusButton={() => navigation.navigate(screenName.AddCustomersScreen as never)} />
        </View>
    )
}

export default CustomerDetailsScreen;