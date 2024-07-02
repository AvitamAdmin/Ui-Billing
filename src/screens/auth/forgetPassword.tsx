import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInputField } from '../../components/commonComponents';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H16Primary700, H16blackTwo400, H16greySix700, H28blackOne700 } from '../../utils/styledComponents';
import { GroupCircle1, SplashScreenImage } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, flexRow, justifyAround, justifyCenter, mh15, mv15 } from '../../utils/theme/commonStyles';

export type forgetPasswordProps = {

}


const ForgetPassword = (props: forgetPasswordProps) => {

    const navigation = useNavigation()

    const {
        control,
    } = useForm();

    const formKeys = {
        email: 'email',
    }

    const resetPwd = () => {
        navigation.navigate(screenName.LoginEmailScreen as never)
    }

    return (
        <View style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Fragment>
                    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
                        <View style={[flexRow]}>
                            <View style={[flexRow, justifyAround]}>
                                <View style={[mh15]}>
                                    <GroupCircle1 width={200} height={100} />
                                </View>
                                <View style={[justifyCenter, alignItemCenter]}>
                                    <SplashScreenImage width={110} height={80} />
                                </View>
                                <Image source={require('../../../assets/images/png/group1.png')} style={{ height: 400, width: 280 }} />
                            </View>
                        </View>
                        <View style={{ bottom: '5%',backgroundColor:"#f27"  }}>
                            <View style={{ backgroundColor: 'white', height: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40, width: '100%', top: 0 }}>
                                <View style={{ marginHorizontal: 20 }}>
                                    <View style={{ marginVertical: 40,backgroundColor:"#fff" }}>
                                        <H28blackOne700>{labels.forgetPassword}</H28blackOne700>
                                        <H16blackTwo400>{labels.enterYourEmailtogetapasswordresetlink}</H16blackTwo400>
                                    </View>
                                    <CustomTextInputField name={formKeys.email} control={control} placeholder={labels.emailAddress} label={labels.email} showIcon={true} showCalendar={true} iconName={'email-outline'} iconType={'MaterialCommunityIcons'} iconSize={15} color={'grey'} />
                                    <OnboardingButton
                                        title={labels.resetPassword}
                                        onChange={resetPwd}
                                        backgroundColor={colors.primary}
                                        color={colors.white}
                                        icon={true}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={[mv15]} onPress={resetPwd}>
                        <H16greySix700 style={[alignSelfCenter]}>{labels.rememberYourPassword}
                            <H16Primary700>{' Login'}</H16Primary700>
                        </H16greySix700>
                    </TouchableOpacity>
                </Fragment>
            </ScrollView>
        </View>
    )
}

export default ForgetPassword