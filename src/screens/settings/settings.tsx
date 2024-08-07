import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ToggleSwitch, TopHeader} from '../../components/commonComponents';
import {settingsData} from '../../utils/data/settingsData';
import CustomIcon from '../../utils/icons';
import {labels} from '../../utils/labels';
import {ProfileImage} from '../../utils/png';
import {screenName} from '../../utils/screenNames';
import {
  BottomWidth,
  H15blackOne500,
  H18BlackOne700,
} from '../../utils/styledComponents';
import {colors} from '../../utils/theme/colors';
import {
  alignItemCenter,
  alignSelfCenter,
  bg_color_white,
  flex1,
  flexRow,
  justifyBetween,
  justifyCenter,
  mh10,
  mh15,
  mv10,
  mv15,
  mv5,
} from '../../utils/theme/commonStyles';

export type SettingsProps = {};

const SettingsScreen = (props: SettingsProps) => {
  const [toggleVisible, setToggleVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={{
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#eeeeee',
        padding: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#000'}}>Profile</Text>
        </View>
        <View>
          <CustomIcon
            color="#000"
            size={22}
            name="arrow-back"
            type="Ionicons"
          />
        </View>
      </View>
      <View style={{padding:10,backgroundColor:"#b3d9ff"}}>
        <View style={{width:"100%",flexDirection:"row",justifyContent:"flex-start"}}>
            <Image source={require("../../../assets/images/user-profile.jpg")} style={{width:120,height:120}}/>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
