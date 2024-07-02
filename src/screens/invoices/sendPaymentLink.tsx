import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { DevWidth } from '../../utils/device';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H18BlackOne700, H15blackTwo400, H14greySix600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { flex1, bg_color_white, justifyCenter, alignItemCenter, mv5, textAlignCenter } from '../../utils/theme/commonStyles';
import { SendPaymentLinkSvg } from '../../utils/svg';

export type sendPaymentLinkProps = {

}


const SendPaymentLink = (props: sendPaymentLinkProps) => {
    const navigation = useNavigation()
    return (
        <View style={[flex1, bg_color_white, justifyCenter, alignItemCenter]}>
            <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.whiteOne, marginVertical: 10, borderRadius: 30 }}>
                <SendPaymentLinkSvg  />
            </View>
            <H18BlackOne700 >{labels.SendPaymentLink}</H18BlackOne700>
            <H15blackTwo400 style={[mv5, textAlignCenter]}>{"Are you sure want to Pay On Online"}</H15blackTwo400>
            <View style={styles.bottomButtonsContainer}>
                <OnboardingButton
                    width={DevWidth / 1.1}
                    title={labels.SendPaymentLink}
                    onChange={() => navigation.navigate(screenName.SuccessSendPaymentLink as never)}
                    backgroundColor={colors.primary}
                    color={colors.white}
                />
                <OnboardingButton
                    width={DevWidth / 1.1}
                    title={labels.back}
                    onChange={() => navigation.navigate(screenName.InvoiceScreen as never)}
                    backgroundColor={colors.white}
                    color={colors.grey}
                />
            </View>
            {/* <H14greySix600 style ={{}} >{labels.back}</H14greySix600> */}
        </View>
    )
}

const styles = StyleSheet.create({
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 15,
        // paddingBottom: 20,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
});

export default SendPaymentLink