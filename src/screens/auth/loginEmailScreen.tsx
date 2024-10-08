import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInput } from '../../components/commonInputFields';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H14blackOne600, H14blackTwo400, H16blackTwo400, H16greySix700, H28blackOne700, IconInputContainer } from '../../utils/styledComponents';
import { GroupCircle1, SplashScreenImage } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, alignSelfEnd, flexRow, justifyAround, justifyCenter, mh15, mt15, mv5 } from '../../utils/theme/commonStyles';
import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../../utils/async';
import { api } from '../../../envfile/api';

interface LoginFormInputs {
  email: string;
  password: string;
}

export type LoginEmailScreenProps = {};

const LoginEmailScreen: React.FC<LoginEmailScreenProps> = () => {
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();
    const [errmsg, setErrmsg] = useState("");

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onLogin: SubmitHandler<LoginFormInputs> = async (data) => {
        setErrmsg(""); // Clear any previous error messages

        try {
            const response = await axios.post(api + '/auth/login', data);

            if (response.status === 200) {
                setErrmsg(""); // Clear any error messages
                console.log('Login successful:', response.data);

                const { email, token } = response.data;
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userToken', token);

                navigation.navigate(screenName.DashboardScreen as never);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setErrmsg("User not found");
            } else if (error.response && error.response.status === 401) {
                setErrmsg("Invalid email or password");
            } else {
                setErrmsg("An unexpected error occurred");
                console.error('Error logging in:', error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const forgetPassword = () => {
        navigation.navigate(screenName.ForgetPassword as never);
    };

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
                        <View style={{ bottom: '10%' }}>
                            <View style={{ backgroundColor: '#ebebeb', height: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, width: '100%', top: 0 }}>
                                <View style={{ marginHorizontal: 20 }}>
                                    <View style={{ marginVertical: 30, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                        <H28blackOne700>{labels.welcomeBack}</H28blackOne700>
                                        <H16blackTwo400>{labels.loginMessage}</H16blackTwo400>
                                        {errmsg && <Text style={{color:"red"}}>{errmsg}</Text>}
                                    </View>
                                    <View style={{ marginVertical: 15 }}>
                                        <H14blackOne600 style={{ marginVertical: 5 }}>{labels.email}</H14blackOne600>
                                        <IconInputContainer>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <CustomTextInput
                                                        placeholder={labels.emailAddress}
                                                        value={value}
                                                        onChangeText={onChange}
                                                        textColor={colors.black}
                                                    />
                                                )}
                                                rules={{ required: 'Email is required' }}
                                            />
                                            <CustomIcon name='email-outline' size={16} color={colors.grey} type='MaterialCommunityIcons' />
                                        </IconInputContainer>
                                        {errors.email && <Text style={{color:"red"}}>Email is required</Text>}
                                    </View>
                                    <View >
                                        <H14blackOne600 style={[mv5]}>{labels.password}</H14blackOne600>
                                        <IconInputContainer>
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <CustomTextInput
                                                        placeholder={labels.password}
                                                        value={value}
                                                        onChangeText={onChange}
                                                        secureTextEntry={showPassword}
                                                        textColor={colors.black}
                                                    />
                                                )}
                                                rules={{ required: 'Password is required' }}
                                            />
                                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                                <CustomIcon
                                                    name={!showPassword ? 'eye' : 'eye-off'}
                                                    size={16}
                                                    color={colors.grey}
                                                    type='Feather'
                                                />
                                            </TouchableOpacity>
                                        </IconInputContainer>
                                        {errors.password && <Text style={{color:"red"}}>Password is required</Text>}
                                    </View>
                                    {/* <TouchableOpacity style={[mt15]} onPress={forgetPassword}>
                                        <H14blackTwo400 style={[alignSelfEnd]}>{labels.forgetPassword}</H14blackTwo400>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={[mt15]} onPress={() => navigation.navigate(screenName.SignupScreen as never)}>
                                        <H14blackTwo400 style={[alignSelfEnd]}>Don't have an account?. Sign Up</H14blackTwo400>
                                    </TouchableOpacity>
                                    <OnboardingButton
                                        title={labels.logIn}
                                        onChange={handleSubmit(onLogin)}
                                        backgroundColor={colors.primary}
                                        color={colors.white}
                                        icon={true}
                                    />
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <H16greySix700 style={[alignSelfCenter]}>{labels.back}</H16greySix700>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Fragment>
            </ScrollView>
        </View>
    );
};

export default LoginEmailScreen;
