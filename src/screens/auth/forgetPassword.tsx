import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios'; // Add axios import
import { OnboardingButton } from '../../components/commonButton';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H16Primary700, H16blackTwo400, H16greySix700, H28blackOne700 } from '../../utils/styledComponents';
import { GroupCircle1, SplashScreenImage } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { flexRow, justifyAround, mh15, mv15, alignItemCenter, alignSelfCenter, justifyCenter } from '../../utils/theme/commonStyles';
import { api } from '../../../envfile/api';

export type ForgetPasswordProps = {};

const ForgetPassword = (props: ForgetPasswordProps) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const onSubmit = async () => {
        console.log(email,"user email");
        
        try {
            await axios.post(api+'/auth/forgotpassword', { email });
            // Navigate to the login screen or show a success message
            navigation.navigate(screenName.LoginEmailScreen as never);
        } catch (error) {
            console.error("Error during password reset:", error);
            // Handle error here (e.g., show an error message)
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                    <View style={{ bottom: '5%' }}>
                        <View style={{ backgroundColor: 'white', height: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40, width: '100%', top: 0 }}>
                            <View style={{ marginHorizontal: 20 }}>
                                <View style={{ marginVertical: 40, backgroundColor: "#fff" }}>
                                    <H28blackOne700>{labels.forgetPassword}</H28blackOne700>
                                    <H16blackTwo400>{labels.enterYourEmailtogetapasswordresetlink}</H16blackTwo400>
                                </View>
                                <TextInput
                                
                                placeholderTextColor="#000"
                                    style={{ borderBottomWidth: 1, borderColor: 'grey', marginBottom: 20, padding: 10,color:"#000" }}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder={labels.emailAddress}
                                />
                                <OnboardingButton
                                    title={labels.resetPassword}
                                    onChange={onSubmit}
                                    backgroundColor={colors.primary}
                                    color={colors.white}
                                    icon={true}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[mv15]} onPress={() => navigation.navigate(screenName.LoginEmailScreen as never)}>
                    <H16greySix700 style={[alignSelfCenter]}>
                        {labels.rememberYourPassword}
                        <H16Primary700>{' Login'}</H16Primary700>
                    </H16greySix700>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ForgetPassword;
