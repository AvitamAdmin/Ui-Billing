import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ToggleSwitch, TopHeader } from '../../components/commonComponents';
import { settingsData } from '../../utils/data/settingsData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { ProfileImage } from '../../utils/png';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H15blackOne500, H18BlackOne700 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, bg_color_white, flex1, flexRow, justifyBetween, justifyCenter, mh10, mh15, mv10, mv15, mv5 } from '../../utils/theme/commonStyles';

export type SettingsProps = {

}

const SettingsScreen = (props: SettingsProps) => {
    const [toggleVisible, setToggleVisible] = useState(false);
    const navigation = useNavigation();

    const handleToggleChange = () => {
        setToggleVisible(!toggleVisible);
    };

    const handleSettingsItemPress = (moveTo?: string) => {
        if (moveTo) {
            navigation.navigate(moveTo);
        } else {
        setToggleVisible(!toggleVisible);

        }
    };

    return (
        <View>
            
        </View>
    )
}

export default SettingsScreen;
