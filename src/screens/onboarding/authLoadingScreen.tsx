import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H15white400, H32white700, SplashScreenContainer } from '../../utils/styledComponents';
import { OnboardingImage1, OnboardingImage2, OnboardingImage3, SplashScreenImage } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, flex1, h100, justifyCenter, mh15, mv15, w100 } from '../../utils/theme/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearProgress } from '@rneui/themed';
import { ActivityIndicator } from 'react-native';







const AuthLoadingScreen = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const navigation = useNavigation();
    const checkAuthStatus = async () => {
        setIsLoading(true);

        const token = await AsyncStorage.getItem("userToken");
        if (token !== null) {
            navigation.navigate(screenName.DashboardScreen as never);
            console.log("Token", token);
        } else {
            navigation.navigate(screenName.OnboardingScreen as never);
        }
        setIsLoading(false);

      };
    
      useEffect(() => {
        checkAuthStatus();
      }, []);
    
    if (isLoading) {
        return (
          <SplashScreenContainer>
           <ImageBackground source={require('../../../assets/images/png/splashImage.png')} style={[w100,h100,alignItemCenter,justifyCenter,flex1]} >
            <SplashScreenImage width={163} height={46}/>
            </ImageBackground>
          </SplashScreenContainer>
        );
      }
    return (
       <View style={{backgroundColor:"#fff",width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
               <ActivityIndicator animating={true} size="large" color="#000" />

       </View>
    )
};

const styles = StyleSheet.create({});

export default AuthLoadingScreen;
