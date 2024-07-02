import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { alignItemCenter, alignSelfCenter, flexRow, justifyAround, justifyBetween, justifyCenter, justifyEvenly, mh10, mh15, ml10, mt5, mv10, mv15, p5 } from '../../utils/theme/commonStyles';
import { labels } from '../../utils/labels';
import { H12Primary400, H12blackTwo600, H12white600, H14Primary400Underline, H14blackOne600, H16BlackOne700 } from '../../utils/styledComponents';
import { recentInvoicesdata } from '../../utils/data/dashboardData';
import { colors } from '../../utils/theme/colors';
import { InvoiceCard } from '../../components/commonComponents';

export type recentInvoicesProps = {

}

const recentInvoiceCards = () => {
    return (
        <View>
            {
                recentInvoicesdata.map((invoice) => {
                    return (
                        <InvoiceCard key={invoice.id} data={invoice} />
                    )
                })
            }
        </View>
    )
}

const RecentInvoices = (props: recentInvoicesProps) => {
    return (
        <View style={[mv15]}>
            <View style={[flexRow, justifyBetween]}>
                <H16BlackOne700>{labels.recentInvoice}</H16BlackOne700>
                <TouchableOpacity>
                    <H14Primary400Underline>{labels.viewAll}</H14Primary400Underline>
                </TouchableOpacity>
            </View>
            <View>
                {recentInvoiceCards()}
            </View>
        </View>
    )
}

export default RecentInvoices;