import React from 'react';
import { Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { colors } from '../../utils/theme/colors';

export const BarChartDiagram = () => {
    const barData = [
        {
          value: 8,
          label: 'Mon',
          spacing: 5,
          labelWidth: 20,
          labelTextStyle: {color: 'gray'},
          frontColor: colors.primarTwo,
        },
        {value: 3, frontColor: colors.blackOne},
        {
          value: 4,
          label: 'Tue',
          spacing: 5,
          labelWidth: 20,
          labelTextStyle: {color: 'gray'},
          frontColor: colors.primarTwo,
        },
        {value: 9, frontColor: colors.blackOne},
        {
          value: 6,
          label: 'Wed',
          spacing: 5,
          labelWidth: 20,
          labelTextStyle: {color: 'gray'},
          frontColor: colors.primarTwo,
        },
        {value: 5, frontColor: colors.blackOne},
        {
          value: 3,
          label: 'Thu',
          spacing: 5,
          labelWidth: 20,
          labelTextStyle: {color: 'gray'},
          frontColor: colors.primarTwo,
        },
        {value: 2, frontColor: colors.blackOne},
        {
          value: 7,
          label: 'Fri',
          spacing: 5,
          labelWidth: 20,
          labelTextStyle: {color: 'gray'},
          frontColor: colors.primarTwo,
        },
        {value: 4, frontColor: colors.blackOne},
        {
          value: 6,
          label: 'Sat',
          spacing: 5,
          labelWidth: 20,
          labelTextStyle: {color: 'gray'},
          frontColor: colors.primarTwo,
        },
        {value: 3, frontColor: colors.blackOne},
        {
            value: 9,
            label: 'Sun',
            spacing: 5,
            labelWidth: 20,
            labelTextStyle: {color: 'gray'},
            frontColor: colors.primarTwo,
          },
          {value: 2, frontColor: colors.blackOne},
      ];

      const renderTitle = () => {
          return(
            <View style={{}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 24,
                backgroundColor: 'yellow',
              }}>
                <Text>hooo</Text>
            </View>
          </View>
          )
      }

    return (
        <View
            style={{
                backgroundColor: colors.white,
                borderRadius: 10,
            }}>
            {renderTitle()}
            <BarChart
                data={barData}
                barWidth={8}
                spacing={20}
                roundedTop
                roundedBottom
                rulesLength={280}
                rulesColor={colors.greyFour}
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: 'gray' }}
                noOfSections={5}
                maxValue={10}
            />
        </View>
    );
};