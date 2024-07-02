import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
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
        <View style={[flex1, bg_color_white]}>
            <View style={[mh15]}>
                <View style={[mv15]}>
                    <TopHeader headerText={labels.settings} searchIcon={true} searchName={labels.settings} searchText={'Search ' + labels.settings}/>
                </View>
                <BottomWidth style={[mv5]} />
                <View style={[mv10, flexRow, justifyBetween, alignItemCenter]}>
                    <TouchableOpacity style={[flexRow, alignItemCenter]} onPress={() => navigation.navigate(screenName.AccountSettings as never)}>
                        <Image source={ProfileImage} style={{ height: 60, width: 60, borderRadius: 10 }} />
                        <H18BlackOne700 style={[mh10]}>{labels.adminSmith}</H18BlackOne700>
                    </TouchableOpacity>
                    <CustomIcon name={"chevron-right"} size={15} color={colors.blackOne} type={"Entypo"} />
                </View>
                <View>
                    {settingsData.map(({ title, id, IconImg, moveTo }) => {
                        return (
                            <View key={id} style={[mv10]}>
                                <View style={[flexRow, justifyBetween]}>
                                    <TouchableOpacity style={[flexRow]} onPress={() => handleSettingsItemPress(moveTo)}>
                                        <View style={{ backgroundColor: colors.whiteThree, height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            {IconImg && <IconImg height={15} width={15} />}
                                        </View>
                                        <H15blackOne500 style={[alignSelfCenter, mh10]}>{title}</H15blackOne500>
                                    </TouchableOpacity>
                                    <View style={[justifyCenter, alignItemCenter]}>
                                        {id === 1 && (
                                            <>
                                                <ToggleSwitch value={toggleVisible} onToggle={handleToggleChange} />
                                            </>
                                        )}
                                        {id !== 7 && id !== 1 && (
                                            <>
                                                <CustomIcon name={"chevron-right"} size={15} color={colors.blackOne} type={"Entypo"} />
                                            </>
                                        )}
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export default SettingsScreen;
