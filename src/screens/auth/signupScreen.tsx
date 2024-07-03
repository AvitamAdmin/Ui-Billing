import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { CustomTextInput } from '../../components/commonInputFields';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H14blackOne600, H14blackTwo400, H16blackTwo400, H28blackOne700, IconInputContainer } from '../../utils/styledComponents';
import { GroupCircle1, SplashScreenImage } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignSelfCenter, alignSelfEnd, flexRow, justifyAround, justifyCenter, mh15, mt15, mv5 } from '../../utils/theme/commonStyles';
import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationConfig';
import axios from 'axios';

export type LoginEmailScreenProps = {};

const SignupScreen: React.FC<LoginEmailScreenProps> = () => {
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();

    const formKeys = {
        username:"username",
        mobilenumber:"mobilenumber",
        email: 'email',
        password: 'password',
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues
    } = useForm();

    const onLogin = async () => {
        const formValues = getValues();
        console.log('Form Values:', formValues);
        try {
            const response = await axios.post('http://192.168.0.119:5000/auth/userRegister', formValues);
            console.log('Server Response:', response.data);
            // Navigate to the login screen upon successful registration
            navigation.navigate(screenName.LoginEmailScreen as never);
        } catch (error) {
            console.error('Error posting form values:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Fragment>
                    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
                        <View style={[flexRow]}>
                            <View style={[flexRow,justifyAround]}>
                                <View style={[mh15]}>
                                    <GroupCircle1 width={200} height={100} />
                                </View>
                                <View style={[justifyCenter,alignItemCenter]}>
                                    <SplashScreenImage width={110} height={80} />
                                </View>
                                <Image source={require('../../../assets/images/png/group1.png')} style={{ height: 400, width: 280 }} />
                            </View>
                        </View>
                        <View style={{ bottom: '15%' }}>
                            <View style={{ backgroundColor: '#ebebeb', height: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, width: '100%', top: 0 }}>
                                    <View style={{ marginHorizontal: 20 }}>
                                        <View style={{ marginVertical: 30,justifyContent: 'center', alignItems: 'center', gap:10}}>
                                            <H28blackOne700>{labels.welcome}</H28blackOne700>
                                            <H16blackTwo400>{labels.signupMessage}</H16blackTwo400>
                                        </View>
                                         <View style={{ marginVertical: 10 }}>
                                            <H14blackOne600 style={{ marginVertical: 5 }}>{labels.name}</H14blackOne600>
                                            <IconInputContainer>
                                                <Controller
                                                    name={formKeys.username}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <CustomTextInput
                                                            placeholder={labels.nameInput}
                                                            value={value}
                                                            onChangeText={onChange}
                                                            textColor={colors.black}
                                                        />
                                                    )}
                                                />
                                                <CustomIcon name='email-outline' size={16} color={colors.grey} type='MaterialCommunityIcons' />
                                            </IconInputContainer>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <H14blackOne600 style={{ marginVertical: 5 }}>{labels.mobileNumber}</H14blackOne600>
                                            <IconInputContainer>
                                                <Controller
                                                    name={formKeys.mobilenumber}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <CustomTextInput
                                                            placeholder={labels.enterMobileNumber}
                                                            value={value}
                                                            onChangeText={onChange}
                                                            textColor={colors.black}
                                                        />
                                                    )}
                                                />
                                                <CustomIcon name='email-outline' size={16} color={colors.grey} type='MaterialCommunityIcons' />
                                            </IconInputContainer>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <H14blackOne600 style={{ marginVertical: 5 }}>{labels.email}</H14blackOne600>
                                            <IconInputContainer>
                                                <Controller
                                                    name={formKeys.email}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <CustomTextInput
                                                            placeholder={labels.emailAddress}
                                                            value={value}
                                                            onChangeText={onChange}
                                                            textColor={colors.black}
                                                        />
                                                    )}
                                                    rules={{
                                                        required: requiredValidation(labels.emailAddress),
                                                        minLength: minLengthValidation(validationSchema.name.minLength),
                                                    }}
                                                />
                                                <CustomIcon name='email-outline' size={16} color={colors.grey} type='MaterialCommunityIcons' />
                                                </IconInputContainer>
                                        </View>
                                        <View >
                                            <H14blackOne600 style={[mv5]}>{labels.password}</H14blackOne600>
                                            <IconInputContainer>
                                                <Controller
                                                    name={formKeys.password}
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
                                                    rules={{
                                                        required: requiredValidation(labels.password),
                                                        minLength: minLengthValidation(validationSchema.password.minLength),
                                                    }}
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
                                        </View> 
                                        <TouchableOpacity style={[mt15]} onPress={() => navigation.navigate(screenName.LoginEmailScreen as never)}>
                                        <H14blackTwo400 style={[alignSelfEnd]}> {labels.haveaccount }</H14blackTwo400>
                                        </TouchableOpacity>
                                        <OnboardingButton
                                            title={labels.createaccount}
                                            onChange={handleSubmit(onLogin)}
                                            backgroundColor={colors.primary}
                                            color={colors.white}
                                            icon={true}
                                        />
                                    </View>
                            </View>
                        </View>
                    </View>
                </Fragment>
            </ScrollView>
        </View>
    );
};

export default SignupScreen;
