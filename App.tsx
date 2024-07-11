import React, { useEffect } from 'react';
import { ImageBackground, Platform, StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainNavigation from './src/navigation/mainNavigation';
import { getData, storageKeys } from './src/utils/async';
import { screenName } from './src/utils/screenNames';
import { SplashScreenContainer } from './src/utils/styledComponents';
import { SplashScreenImage } from './src/utils/svg';
import { colors } from './src/utils/theme/colors';
import { alignItemCenter, flex1, h100, justifyCenter, w100 } from './src/utils/theme/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import useReducer from "./src/redux/Slice";
import { Provider } from "react-redux";
import store from './src/redux/Store';



export type AppProps = {};

const App = (props: AppProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [authendicate, setAuthendicate] = React.useState<boolean>(false);

  const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 50 : StatusBar.currentHeight;

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = async () => {
    setTimeout(() => {
      SplashScreen.hide();
      setIsLoading(false);
    }, 1000);


    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {

    }
    // var loginDetails = await getData(storageKeys.loginDetails);
    // if (loginDetails && loginDetails.token) {
    // } else {
    //   console.log('SplashScreen')
    // }
  };

  if (isLoading) {
    return (
      <SplashScreenContainer>
       <ImageBackground source={require('./assets/images/png/splashImage.png')} style={[w100,h100,alignItemCenter,justifyCenter,flex1]} >
        <SplashScreenImage width={163} height={46}/>
        </ImageBackground>
      </SplashScreenContainer>
    );
  }


  return (
      <View style={{ flex: 1 }}>
        <View style={{  }}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          /> 
        </View>
        <Provider store={store}>
        <MainNavigation initialRouteName={screenName.InventoryList} />
        </Provider>
      </View>
  );
};

export default App;