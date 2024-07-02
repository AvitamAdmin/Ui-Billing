import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { labels } from '../../utils/labels';
import { H16BlackOne700, H14Primary400Underline, H12blackTwo600, H12BlackOne600, H12Blue600 } from '../../utils/styledComponents';
import { mv15, flexRow, justifyBetween, alignItemCenter, justifyCenter, mh10, ml10, mv10, ml5 } from '../../utils/theme/commonStyles';
import { recentCustomersData } from '../../utils/data/dashboardData';
import { colors } from '../../utils/theme/colors';
import CustomIcon from '../../utils/icons';

export type recentCustomersProps = {

}


const RecentCustomers = (props: recentCustomersProps) => {
    const recentCustomersCard = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        recentCustomersData.map((item) => {
                            return (
                                <View style={{ height: 120, width: 230, marginRight: 10, marginTop: 15, alignSelf: 'center', backgroundColor: colors.white, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, }} key={item.id}>
                                    <View style={[flexRow, justifyBetween, mh10, mv10]}>
                                        <View style={[flexRow, alignItemCenter, {}]}>
                                            <View style={[{ height: 50, width: 50, borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 10 }, justifyCenter, alignItemCenter]}>
                                                <Image source={item.img} />
                                            </View>
                                            <View style={[ml10]}>
                                                <H16BlackOne700>{item.customerTitle}</H16BlackOne700>
                                                <H12blackTwo600>Invoices : {item.invoiceCount}</H12blackTwo600>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[flexRow, justifyBetween, mh10, mv10]}>
                                        <View style = {[alignItemCenter, justifyCenter, {height : 25, width :90, backgroundColor : colors.blueOne, borderRadius : 5}]}>
                                            <H12Blue600>Balance : {item.balance}</H12Blue600>
                                        </View>
                                        <View style={[flexRow, justifyBetween]}>
                                            <View style = {[alignItemCenter, justifyCenter, {height : 16, width : 16, backgroundColor : colors.blackOne, borderRadius : 5 }]}>
                                                <CustomIcon color={colors.white} name='plus' size={10} type='Entypo' />
                                            </View>
                                            <H12BlackOne600 style = {ml5}>{labels.addInvoice}</H12BlackOne600>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={[mv15]}>
            <View style={[flexRow, justifyBetween]}>
                <H16BlackOne700>{labels.recentCustomers}</H16BlackOne700>
                <TouchableOpacity>
                    <H14Primary400Underline>{labels.viewAll}</H14Primary400Underline>
                </TouchableOpacity>
            </View>
            <View>
                {recentCustomersCard()}
            </View>
        </View>
    )
}

export default RecentCustomers