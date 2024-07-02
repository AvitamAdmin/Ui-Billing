import React from 'react';
import { View } from 'react-native';
import CustomIcon from '../utils/icons';
import { H14primary600, LongButton } from '../utils/styledComponents';
import { colors } from '../utils/theme/colors';
import { flexRow, mh15 } from '../utils/theme/commonStyles';

//================================ LONG BUTTON =============================//

export type LongPurpleButtonProps = {
  title: string;
  width?: number | string | any;
  height?:number | string ;
  onChange?: () => void;
  backgroundColor?: string;
  color?: any;
  icon?: boolean;
};

export const OnboardingButton: React.FC<LongPurpleButtonProps> = ({
  title,
  onChange,
  backgroundColor,
  color,
  icon,
  width ='100%',
  height
}) => {
  return (
    <View>
      <LongButton width={width}  backgroundColor={backgroundColor} onPress={onChange}>
        <View style={[flexRow]}>
          <H14primary600 color={color}>{title}</H14primary600>
            {icon && 
          <View style={[mh15]}>
            
            <CustomIcon name='arrowright' size={16} color={colors.white} type={'AntDesign'} />
            
          </View>
            }
        </View>
      </LongButton>
    </View>
  );
};

