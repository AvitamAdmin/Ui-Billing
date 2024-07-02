import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import {
  H16BlackOne700,
  H14blackTwo600,
  H14blackTwo400,
} from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import {
  mh15,
  mv15,
  flexRow,
  alignItemCenter,
  justifyBetween,
  justifyAround,
  p5,
  mb15,
  mt5,
  mh10,
  mv10,
} from '../../utils/theme/commonStyles';
import { BarChartDiagram } from './barChart';

export type paymentStaticsProps = {};

const PaymentStatics = (props: paymentStaticsProps) => {
  const [weeklyModalVisible, setWeeklyModalVisible] = useState(false);
  const [selectedWeeklyOption, setSelectedWeeklyOption] = useState('Weekly');

  const toggleModal = () => {
    setWeeklyModalVisible(!weeklyModalVisible);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedWeeklyOption(option);
    setWeeklyModalVisible(false);
  };

  const MonthlyWeeklyModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={weeklyModalVisible}
        onRequestClose={() => {
          setWeeklyModalVisible(false);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: '100%',
            padding: 10,
          }}
          activeOpacity={1}
          onPressOut={() => setWeeklyModalVisible(false)}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: selectedWeeklyOption === 'Weekly' ? '#f2f2f2' : '#fff',
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 8,
              }}
              onPress={() => handleOptionSelect('Weekly')}>
              <Text style={{ color: '#000' }}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: selectedWeeklyOption === 'Monthly' ? '#f2f2f2' : '#fff',
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 8,
              }}
              onPress={() => handleOptionSelect('Monthly')}>
              <H14blackTwo600>Monthly</H14blackTwo600>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View
      style={{
        height: 400,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 2,
      }}>
      <View style={[mh15, mv15, flexRow, alignItemCenter, justifyBetween]}>
        <H16BlackOne700>{labels.paymentStatics}</H16BlackOne700>
        <TouchableOpacity
          onPress={toggleModal}
          style={[
            flexRow,
            alignItemCenter,
            justifyAround,
            p5,
            {
              borderWidth: 1,
              borderColor: colors.greyFour,
              width: 100,
              borderRadius: 8,
              gap: 15,
              padding: 5,
            },
          ]}>
          <H14blackTwo600>{selectedWeeklyOption}</H14blackTwo600>
          <CustomIcon
            color={colors.blackOne}
            size={14}
            name="chevron-down"
            type="Entypo"
          />
        </TouchableOpacity>
        <MonthlyWeeklyModal />
      </View>
      <View
        style={[
          { borderBottomWidth: 1, borderBottomColor: colors.greyTwo },
          mh15,
          mb15,
        ]}
      />
      <H14blackTwo400 style={[mh15]}>
        {labels.totalInvoiceAmount}
      </H14blackTwo400>
      <H16BlackOne700 style={[mh15, mt5]}>$9765</H16BlackOne700>
      <View style={[mh10, mv10]}>
        <BarChartDiagram />
      </View>
    </View>
  );
};

export default PaymentStatics;
