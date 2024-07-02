import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { PanResponder, StyleSheet, TouchableOpacity, View } from "react-native";
import { quickAccessData, quickAccessDataSecond } from "../../utils/data/dashboardData";
import { labels } from "../../utils/labels";
import { H10blackTwo600, H16BlackOne700 } from "../../utils/styledComponents";
import { colors } from "../../utils/theme/colors";
import { alignItemCenter, justifyCenter, mh15, mt5, mv15 } from "../../utils/theme/commonStyles";


const QuickAccess = () => {
    const [showSecondText, setShowSecondText] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const navigation=useNavigation()

    // Create a panResponder to handle swipe gestures
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                // Check if swipe gesture is from left to right
                if (gestureState.dx < -50) {
                    setShowSecondText(true);
                    setActiveIndex(1);
                }
                // Check if swipe gesture is from right to left
                else if (gestureState.dx > 50) {
                    setShowSecondText(false);
                    setActiveIndex(0);
                }
            },
            onPanResponderRelease: () => {
                // Reset swipe state
                // You can customize this behavior as per your requirement
            },
        })
    ).current;

    const renderIndicators = () => {
        return (
            <View style={styles.indicatorContainer}>
                <View style={[styles.indicator, activeIndex === 0 ? styles.activeIndicator : null]} />
                <View style={[styles.indicator, activeIndex === 1 ? styles.activeIndicator : null]} />
            </View>
        );
    };

    const firstTab = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {quickAccessData.map(({id, SvgImage, screenName, title}) => (
                    <View key={id} style={{ marginHorizontal: 6, marginVertical: 6 }}>
                        <TouchableOpacity style={[{ height: 45, width: 45, borderRadius: 8, backgroundColor: colors.whiteThree }, alignItemCenter, justifyCenter]}
                        onPress={()=>navigation.navigate(screenName as never)}
                        >
                            <SvgImage  height= {25} width= {25} />
                        </TouchableOpacity>
                        <View style={[mt5]}>
                            {title.includes(' ') ? (
                                title.split(' ').map((word, index) => (
                                    <H10blackTwo600 key={index} style={styles.word}>
                                        {word}
                                    </H10blackTwo600>
                                ))
                            ) : (
                                <H10blackTwo600 style={styles.word}>{title}</H10blackTwo600>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    const secondTab = () => {
        return (
            <View style={[{ flexDirection: 'row', flexWrap: 'wrap' },]}>
                {quickAccessDataSecond.map(({SvgImage, id, screenName, title}) => (
                    <View key={id} style={{ marginHorizontal: 6, marginVertical: 6 }}>
                        <TouchableOpacity style={[{ height: 45, width: 45, borderRadius: 8, backgroundColor: colors.whiteThree }, alignItemCenter, justifyCenter]}
                        onPress={()=>navigation.navigate(screenName as never)}>
                            <SvgImage  height= {25} width= {25} />
                        </TouchableOpacity>
                        <View style={[mt5]}>
                            {title.includes(' ') ? (
                                title.split(' ').map((word, index) => (
                                    <H10blackTwo600 key={index} style={styles.word}>
                                        {word}
                                    </H10blackTwo600>
                                ))
                            ) : (
                                <H10blackTwo600 style={styles.word}>{title}</H10blackTwo600>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ height: 250, width: '100%', alignSelf: 'center', backgroundColor: colors.white, borderRadius: 8, borderWidth: 1, borderColor: colors.greyFour }} {...panResponder.panHandlers}>
            <View style={[mh15, mv15]}>
                <H16BlackOne700>{labels.quickAccess}</H16BlackOne700>
                <View>
                    {showSecondText ? secondTab() : firstTab()}
                </View>
            </View>
            {renderIndicators()}
        </View>
    );
};

const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'lightgray',
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: 'black',
    },
    word: {
        lineHeight: 16, // You can adjust the line height as needed
        textAlign: 'center',
    },
});

export default QuickAccess;
