import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingButton } from '../../components/commonButton';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { H15white400, H32white700 } from '../../utils/styledComponents';
import { OnboardingImage1, OnboardingImage2, OnboardingImage3 } from '../../utils/svg';
import { colors } from '../../utils/theme/colors';
import { mh15, mv15 } from '../../utils/theme/commonStyles';


interface OnboardingScreenBodysProps {
    title: string;
    message: string;
    image: any;
}

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const data: OnboardingScreenBodysProps[] = [
        { title: labels.invoiceCreationandEditing, message: labels.message1, image: <OnboardingImage1 width={280} height={280} /> },
        { title: labels.clientManagementandInvoiceTracking, message: labels.message2, image: <OnboardingImage2 width={280} height={280} /> },
        { title: labels.powerfulReportingandAnalytics, message: labels.message3, image: <OnboardingImage3 width={280} height={280} /> }
    ];
    const screenWidth = Dimensions.get('window').width;
    const slideWidth = screenWidth;
    const containerRef = useRef<ScrollView>(null);

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            if (containerRef.current) {
                containerRef.current.scrollTo({ x: (currentIndex + 1) * slideWidth, animated: true });
            }
        } else {
            navigation.navigate(screenName.LoginEmailScreen as never);
        }
    };

    const renderDots = () => {
        return data.map((a, index) => (
            <View key={index} style={[styles.dot, index === currentIndex && styles.activeDot]} />
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{}}
                ref={containerRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
                    setCurrentIndex(newIndex);
                }}
                scrollEventThrottle={16}
            >
                {data.map((item, index) => (
                    <View  key={index} style={[styles.slide, { width: slideWidth }]}>
                        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, marginVertical: 40 }}>
                            {item.image}
                            <H32white700 style={{ textAlign: 'center', marginVertical: 20 }}>{item.title}</H32white700>
                            <H15white400 style={{ textAlign: 'center', }}>{item.message}</H15white400>
                            <View style={styles.dotContainer}>{renderDots()}</View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={[mv15, mh15]}>
                <OnboardingButton 
                    width={DevWidth / 2}
                    title={labels.logIn}
                    onChange={handleNext}
                    backgroundColor={colors.white}
                    color={colors.primary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 35,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: 'white',
        height: 5,
        width: 21,
        borderRadius: 30,
    },
});

export default OnboardingScreen;
