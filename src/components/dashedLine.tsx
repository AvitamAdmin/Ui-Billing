import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../utils/theme/colors';

interface DashedLineProps {
  height: number;
  color?: string;
  dashLength?: number;
  dashGap?: number;
  style?: ViewStyle;
}

const DashedLine = ({
  height,
  color = '#000000',
  dashLength = 5,
  dashGap = 3,
  style,
}: DashedLineProps) => {
  const calcDashStyle = () => {
    return {
      width: dashLength,
      height: 1, // Fixed height for vertical dashed line
      backgroundColor: color,
      marginLeft: dashGap / 2,
      marginRight: dashGap / 2,
    };
  };

  return (
    <View style={[styles.container, style]}>
      {[...Array(Math.floor(height / (dashLength + dashGap))).keys()].map((index) => (
        <View key={index} style={calcDashStyle()} />
      ))}
    </View>
  );
};

export default DashedLine;

interface DashedBorderViewProps {
  children: ReactNode;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
}

export const DashedBorderView: React.FC<DashedBorderViewProps> = ({
  children,
  borderColor = colors.greyTwo,
  borderWidth = 1,
  borderStyle = 'solid',
}) => {
  const borderStyles: ViewStyle = {
    borderWidth: borderWidth,
    borderStyle: borderStyle,
    borderColor: borderColor,
  };

  return <View style={[styles.containerTwo, borderStyles]}>{children}</View>;
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerTwo: {
    borderStyle: 'dashed',
    height:60,
    width : '100%', 
    justifyContent :'center',
    flexDirection : 'row',
    alignItems :'center',
    borderRadius : 8
  },
});