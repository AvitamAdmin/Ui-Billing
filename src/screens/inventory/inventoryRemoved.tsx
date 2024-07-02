import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { DevWidth } from '../../utils/device';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H15blackTwo400, H18BlackOne700 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, bg_color_white, flex1, justifyCenter, mv5, textAlignCenter } from '../../utils/theme/commonStyles';

export type InventoryRemovedProps = {

}


const InventoryRemoved = (props: InventoryRemovedProps) => {
    const navigation=useNavigation()
    return (
        <View style={[flex1, bg_color_white, justifyCenter, alignItemCenter]}>
            <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.redFive, marginVertical: 10, borderRadius: 30 }}>
                <CustomIcon name={'cross'} size={35} color={colors.danger} type={'Entypo'} />
            </View>
            <H18BlackOne700 >{labels.removedSuccessfully}</H18BlackOne700>
            <H15blackTwo400 style={[mv5, textAlignCenter]}>{"Stock has been removed from the \n inventory successfully"}</H15blackTwo400>
            <View style={styles.bottomButtonsContainer}>
            <OnboardingButton
                width={DevWidth / 1.1}
                title={labels.backToInventory}
                onChange={()=>navigation.navigate(screenName.InventoryList as never)}
                backgroundColor={colors.primary}
                color={colors.white}
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
export default InventoryRemoved