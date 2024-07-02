// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Animated, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import CustomIcon from "../utils/icons";
// import { labels } from "../utils/labels";
// import { H10white600, H14400, H14Danger400, H14Weight_600, H14blackOne600, H14primary600, H18blackOne700, IconInputContainer, } from "../utils/styledComponents";
// import { AdjustmentIcon } from "../utils/svg";
// import { colors } from "../utils/theme/colors";
// import { alignSelfCenter, flexRow, justifyBetween, mh10, mh5 } from "../utils/theme/commonStyles";
// import { minLengthValidation, requiredValidation, validationSchema } from "../utils/validationConfig";
// import { CustomTextInput } from "./commonInputFields";

// // =================================== TABBAR  BUTTON ===================================== //



// interface TabBarProps {
//     tabs: { label: string; count?: number }[];
//     activeTab: string;
//     onTabPress: (tab: string) => void;
//     borderRadius?: number;
//     width?: number ;
// }

// export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabPress, borderRadius,width  }) => {
//     return (
//         <View style={styles.tabContainer}>
//             {tabs.map((tabInfo) => (
//                 <TouchableOpacity
//                     key={tabInfo.label}
//                     style={[
//                         styles.tab,
//                         {
//                             backgroundColor: activeTab === tabInfo.label ? colors.primary : colors.white,
//                             borderWidth: activeTab === tabInfo.label ? 0 : 1,
//                             borderColor: activeTab === tabInfo.label ? 'transparent' : colors.greyTwo,
//                             borderRadius: borderRadius  || 10,
//                             width:width || 100
//                         }
//                     ]}
//                     onPress={() => onTabPress(tabInfo.label)}>
//                     <View style={flexRow}>
//                         <H14Weight_600 style={{ color: activeTab === tabInfo.label ? colors.white : colors.blackOne }}>
//                             {tabInfo.label}
//                         </H14Weight_600>
//                     </View>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

// // =================================================== TAB BAR ========================================================= //


// interface HeaderProps {
//     headerText: string;
//     searchIcon?: boolean;
//     searchText?: any;
//     searchName?: any
// }

// export const TopHeader: React.FC<HeaderProps> = ({ headerText, searchIcon, searchText,
//     searchName }) => {
//     const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//     const [iconType, setIconType] = useState<'search' | 'cross'>('search'); // State to manage icon type
//     const [iconTypeName, setIconTypename] = useState<'Fontisto' | 'Entypo'>('Fontisto'); // State to manage icon type

//     const navigation=useNavigation()

//     const toggleSearchBar = () => {
//         setIsSearchBarOpen(!isSearchBarOpen);
//         setIconType(iconType === 'search' ? 'cross' : 'search');
//         setIconTypename(iconTypeName === 'Fontisto' ? 'Entypo' : 'Fontisto');

//     };

//     const closeSearchBar = () => {
//         setIsSearchBarOpen(false);
//         setIconType('search');
//     };

//     const { control } = useForm();

//     return (
//         <View>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//               <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.goBack()}>
//                     <CustomIcon name={"chevron-left"} size={15} color={colors.blackOne} type={"Entypo"} />
//               </TouchableOpacity>
//                 <H18blackOne700 style={[]}>{headerText}</H18blackOne700>
//                 {searchIcon ? (
//                     <TouchableOpacity style={styles.iconContainer} onPress={toggleSearchBar}>

//                         <CustomIcon name={iconType} size={13} color={colors.blackTwo} type={iconTypeName} />
//                     </TouchableOpacity>
//                 ) : (
//                     <Text>{' '}</Text>
//                 )}
//             </View>
//             {isSearchBarOpen && (
//                 <CustomTextInputField name={searchName} control={control} placeholder={searchText} onClose={closeSearchBar} showIcon={true} />
//             )}
//         </View>
//     );
// };

// // ===============================================  SUB HEADER OF LIST =========================================== //

// interface SubHeaderProps {
//     listName: string;
//     totalNumber: string | number;
//     onAddPress?: () => void;
//     addIcon?: boolean;

// }

// export const ListSubHeader: React.FC<SubHeaderProps> = ({ listName, totalNumber, onAddPress, addIcon }) => {
//     return (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <H14blackOne600 style={[alignSelfCenter]}>{'Total ' + listName}</H14blackOne600>
//                 <View style={{ backgroundColor: colors.green, height: 20, width: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
//                     <H10white600 >{totalNumber}</H10white600>
//                 </View>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 {addIcon &&
//                     <TouchableOpacity onPress={onAddPress} style={{ backgroundColor: colors.primary, height: 36, width: 36, borderRadius: 40, padding: 10 }}>
//                         <CustomIcon name={'plus'} size={16} color={colors.white} type={"Entypo"} />
//                     </TouchableOpacity>
//                 }
//                 <TouchableOpacity style={{ height: 36, width: 36, borderRadius: 40, padding: 10, marginHorizontal: 10, borderWidth: 1, borderColor: colors.greyTwo }}>
//                     <AdjustmentIcon width={16} height={16} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// // ============================================================= Round Check box Button ================================================================ //
// interface RoundCheckBoxProps {
//     title: string;
//     onChange: () => void;
//     borderColor: string;
//     backgroundColor: string;
//     textColor: string;
// }

// export const RoundCheckBox: React.FC<RoundCheckBoxProps> = ({ title, onChange, borderColor, backgroundColor, textColor }) => {

//     return (
//         <View style={[styles.roundCheckboxContainer, { borderColor }]}>
//             <TouchableOpacity style={[flexRow, mh10]} onPress={onChange}>
//                 <View style={[styles.roundCheckBoxButton1, { borderColor }]} >
//                     <View style={[styles.roundCheckBoxButton2, { backgroundColor }]} />
//                 </View>
//                 <H14400 style={[mh5, { color: textColor }]}>{title}</H14400>
//             </TouchableOpacity>
//         </View>

//     );
// };
// // ============================================================ Common Input Field =================================================//

// interface CustomTextInputProps {
//     name: string;
//     control: any;
//     placeholder: string;
//     label?: string;
//     showIcon?: boolean;
//     showOtp?: boolean;
//     width?: number;
//     subHead?: string;
//     color?: any;
//     iconName?: string | any;
//     iconType?: string | any;
//     iconSize?: number | any;
//     onClose?: () => void;
//     showCalendar?: boolean;
// }

// export const CustomTextInputField: React.FC<CustomTextInputProps> = ({
//     name,
//     control,
//     placeholder,
//     label,
//     showIcon = false,
//     showOtp,
//     width,
//     subHead,
//     color,
//     showCalendar,
//     iconName,
//     iconType,
//     iconSize,
// }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <View style={{ marginVertical: 5 }}>
//             <View style={[flexRow, justifyBetween]}>
//                 <View style={flexRow}>
//                     {label && (
//                         <>
//                             <H14blackOne600 style={{ marginVertical: 5 }}>{label}</H14blackOne600>
//                             <H14Danger400>*</H14Danger400>
//                         </>
//                     )}
//                 </View>

//                 {subHead && <TouchableOpacity><Text style={{ color: color ? color : 'red', alignSelf: 'center', marginTop: 5 }}>{subHead}</Text></TouchableOpacity>}
//             </View>
//             <IconInputContainer width={width}>
//                 <Controller
//                     name={name}
//                     control={control}
//                     render={({ field: { onChange, value } }) => (
//                         <CustomTextInput
//                             placeholder={placeholder}
//                             value={value}
//                             onChangeText={onChange}
//                             textColor={colors.black}
//                         />
//                     )}
//                     rules={{
//                         required: requiredValidation(placeholder),
//                         minLength: minLengthValidation(validationSchema.name.minLength),
//                     }}
//                 />
//                 {showIcon && (
//                     <View>
//                         {label ?
//                             showCalendar ?
//                                 (
//                                     <View>
//                                         <CustomIcon name={iconName} type={iconType} size={iconSize} color={colors.grey} />
//                                     </View>
//                                 )
//                                 : (
//                                     <TouchableOpacity onPress={toggleDropdown}>
//                                         <CustomIcon
//                                             name="chevron-small-down"
//                                             size={16}
//                                             color={colors.grey}
//                                             type="Entypo"
//                                         />
//                                     </TouchableOpacity>
//                                 ) : (
//                                 <TouchableOpacity>
//                                     <CustomIcon
//                                         name="search"
//                                         size={16}
//                                         color={colors.grey}
//                                         type="Feather" // Adjust this according to your icon library
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                     </View>
//                 )}
//                 {showOtp && (
//                     <H14primary600 color={colors.primary}>{labels.generateCode}</H14primary600>
//                 )}
//             </IconInputContainer>
//             {isDropdownOpen && (
//                 <View style={{ backgroundColor: 'white', padding: 10, marginTop: 10, elevation: 1 }}>
//                     <H14blackOne600>{"LIST"}</H14blackOne600>
//                 </View>
//             )}
//         </View>
//     );
// }

// // ================================ MULTILINE TEXT INPUT BOX ======================================== //

// interface MultiLineTextBoxProps {
//     value: string;
//     label: string;
//     showMandatory?: boolean;
//     onChangeValue: (text: string) => void;
//     height?: number;
//     maxLength?: number;
//     multiline?: boolean;
//     keyboardType?: KeyboardTypeOptions;
//     placeHolder: string;
//     disable?: boolean;
//     error?: boolean;
//     errorMessage?: string;
// }

// export const MultiLineTextBox: React.FC<MultiLineTextBoxProps> = ({
//     value,
//     maxLength,
//     keyboardType,
//     placeHolder,
//     label,
//     height,
//     onChangeValue,
//     multiline,
//     disable,
// }): JSX.Element => {
//     const [isFocused, setFocused] = useState(value ? true : false);
//     const [_animatedIsFocused, _setAnimatedIsFocused] = useState(new Animated.Value(0));
//     const inputRef = React.useRef<TextInput>(null);

//     const handleFocus = () => setFocused(true);
//     const handleBlur = () => setFocused(!!value);


//     return (
//         <View style={height ? { marginTop: 10 } : { marginTop: 10 }}>
//             <View style={[flexRow]}>
//                 <H14blackOne600 style={{ marginVertical: 5 }}>{label}</H14blackOne600>
//                 <H14Danger400>*</H14Danger400>
//             </View>
//             <TextInput
//                 editable={!disable}
//                 multiline={multiline}
//                 value={value}
//                 textAlignVertical={height ? 'top' : 'center'}
//                 maxLength={maxLength}
//                 autoCorrect={false}
//                 keyboardType={keyboardType}
//                 ref={inputRef}
//                 placeholder={placeHolder}
//                 placeholderTextColor={colors.grey}
//                 style={[
//                     styles.input,
//                     height && { height }
//                 ]}
//                 onChangeText={onChangeValue}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//                 blurOnSubmit
//             />

//         </View>
//     );
// };

// // ======================================= TOGGLE SWITCH ======================================= //
// type ToggleSwitchProps = {
//     value: boolean;
//     onToggle: () => void;
// };

// export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onToggle }) => {
//     const borderRadius = 20; // Adjust the border radius as needed

//     return (
//         <TouchableOpacity onPress={onToggle}>
//             <View
//                 style={[
//                     styles.container,
//                     {
//                         backgroundColor: value ? colors.green : colors.grey,
//                         borderWidth: 1,
//                         borderColor: value ? colors.green : colors.grey,
//                     },
//                 ]}
//             >
//                 <View
//                     style={[
//                         styles.toggle,
//                         {
//                             transform: [{ translateX: value ? 20 : 3 }],
//                             backgroundColor: value ? colors.white : colors.white,
//                         },
//                     ]}
//                 />
//             </View>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     tabContainer: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         alignItems: "center"
//     },
//     tab: {
//         height: 38,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     iconContainer: {
//         backgroundColor: colors.greyTwo,
//         height: 30,
//         width: 30,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     roundCheckboxContainer: {
//         borderWidth: 1,
//         height: 38,
//         width: '48%',
//         borderRadius: 10,
//         justifyContent: 'center',
//     },
//     roundCheckBoxButton1: {
//         height: 16,
//         width: 16, borderWidth: 1,
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     roundCheckBoxButton2: {
//         height: 7,
//         width: 7,
//         borderRadius: 5,
//     },
//     input: {
//         width: '100%',
//         borderRadius: 6,
//         backgroundColor: colors.greyOne,
//         alignSelf: 'center',
//         height: 45,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         marginTop: 0,
//         borderColor: colors.greyFour
//     },
//     focusedInput: {
//         color: 'black',
//         paddingHorizontal: 15,
//         backgroundColor: 'white',
//         borderColor: 'black',
//         borderWidth: 1,
//         zIndex: -1,
//     },
//     errorInput: {
//         borderColor: 'red',
//         borderWidth: 1,
//     },
// container: {
//     width: 40,
//     height: 20,
//     borderRadius: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
// },
// toggle: {
//     width: 15,
//     height: 15,
//     borderRadius: 15,
// },
// });
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Animated, Image, KeyboardTypeOptions, ScrollView, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { ModalTopText } from "../screens/inventory/stockDetails";
import { actionData } from "../utils/data/invoiceData";
import CustomIcon from "../utils/icons";
import { labels } from "../utils/labels";
import { screenName } from "../utils/screenNames";
import { H10white600, H12Primary400, H12blackTwo600, H12white600, H14400, H14Danger400, H14Weight_600, H14blackOne500, H14blackOne600, H14blackTwo400, H14blackTwo600, H14primary600, H16BlackOne700, H18blackOne700, IconInputContainer, } from "../utils/styledComponents";
import { AdjustmentIcon } from "../utils/svg";
import { colors } from "../utils/theme/colors";
import { alignItemCenter, alignSelfCenter, flexRow, justifyBetween, justifyCenter, justifyEvenly, justifyStart, mh10, mh5, ml10, ml5, mr10, mt15, mv10 } from "../utils/theme/commonStyles";
import { minLengthValidation, requiredValidation, validationSchema } from "../utils/validationConfig";
import { CustomTextInput } from "./commonInputFields";
import CustomModal from "./commonModal";
import { DashedBorderView } from "./dashedLine";
import PopupCardModal from "./popupCardModal";

// =================================== TABBAR  BUTTON ===================================== //

interface TabBarProps {
    tabs: { label: string; count?: number }[];
    activeTab: string;
    onTabPress: (tab: string) => void;
    borderRadius?: number;
    width?: number;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabPress, borderRadius, width }) => {
    return (
        <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {tabs.map((tabInfo) => (
                    <TouchableOpacity
                        key={tabInfo.label}
                        style={[
                            styles.tab,
                            {
                                backgroundColor: activeTab === tabInfo.label ? colors.primary : colors.white,
                                borderWidth: activeTab === tabInfo.label ? 0 : 1,
                                borderColor: activeTab === tabInfo.label ? 'transparent' : colors.greyTwo,
                                borderRadius: borderRadius || 10,
                                width: width || 100,
                            }
                        ]}
                        onPress={() => onTabPress(tabInfo.label)}>
                        <View style={flexRow}>
                            <H14Weight_600 style={{ color: activeTab === tabInfo.label ? colors.white : colors.blackOne }}>
                                {tabInfo.label}
                            </H14Weight_600>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};


// =================================================== TABBAR ========================================================= //

interface HeaderProps {
    headerText: string;
    searchIcon?: boolean;
    searchText?: any;
    searchName?: any
}

export const TopHeader: React.FC<HeaderProps> = ({ headerText, searchIcon, searchText,
    searchName }) => {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [iconType, setIconType] = useState<'search' | 'cross'>('search'); // State to manage icon type
    const [iconTypeName, setIconTypename] = useState<'Fontisto' | 'Entypo'>('Fontisto'); // State to manage icon type

    const navigation = useNavigation()

    const toggleSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen);
        setIconType(iconType === 'search' ? 'cross' : 'search');
        setIconTypename(iconTypeName === 'Fontisto' ? 'Entypo' : 'Fontisto');

    };

    const closeSearchBar = () => {
        setIsSearchBarOpen(false);
        setIconType('search');
    };

    const { control } = useForm();

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                    <CustomIcon name={"chevron-left"} size={15} color={colors.blackOne} type={"Entypo"} />
                </TouchableOpacity>
                <H18blackOne700 style={[]}>{headerText}</H18blackOne700>
                {searchIcon ? (
                    <TouchableOpacity style={styles.iconContainer} onPress={toggleSearchBar}>

                        <CustomIcon name={iconType} size={13} color={colors.blackTwo} type={iconTypeName} />
                    </TouchableOpacity>
                ) : (
                    <Text>{'           '}</Text>
                )}
            </View>
            {isSearchBarOpen && (
                <CustomTextInputField name={searchName} control={control} placeholder={searchText} onClose={closeSearchBar} showIcon={true} />
            )}
        </View>
    );
};
// ===============================================  SUB HEADER OF LIST =========================================== //

interface SubHeaderProps {
    listName: string;
    totalNumber: string | number;
    onAddPress?: () => void;
    addIcon?: boolean;
    filterIcon?: boolean;
    onFilterPress?: () => void;
}

export const ListSubHeader: React.FC<SubHeaderProps> = ({ listName, totalNumber, onAddPress, addIcon, filterIcon, onFilterPress }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <H14blackOne600 style={[alignSelfCenter]}>{'Total ' + listName}</H14blackOne600>
                <View style={{ backgroundColor: colors.green, height: 20, width: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                    <H10white600 >{totalNumber}</H10white600>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {addIcon &&
                    <TouchableOpacity onPress={onAddPress} style={{ backgroundColor: colors.primary, height: 36, width: 36, borderRadius: 40, padding: 10 }}>
                        <CustomIcon name={'plus'} size={16} color={colors.white} type={"Entypo"} />
                    </TouchableOpacity>
                }
                {filterIcon !== false &&
                    <TouchableOpacity onPress={onFilterPress} style={{ height: 36, width: 36, borderRadius: 40, padding: 10, marginHorizontal: 10, borderWidth: 1, borderColor: colors.greyTwo }}>
                        <AdjustmentIcon width={16} height={16} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};
// ============================================================= Round Check box Button ================================================================ //
interface RoundCheckBoxProps {
    title: string;
    onChange: () => void;
    borderColor: string;
    backgroundColor: string;
    textColor: string;
}

export const RoundCheckBox: React.FC<RoundCheckBoxProps> = ({ title, onChange, borderColor, backgroundColor, textColor }) => {

    return (
        <View style={[styles.roundCheckboxContainer, { borderColor }]}>
            <TouchableOpacity style={[flexRow, mh10]} onPress={onChange}>
                <View style={[styles.roundCheckBoxButton1, { borderColor }]} >
                    <View style={[styles.roundCheckBoxButton2, { backgroundColor }]} />
                </View>
                <H14400 style={[mh5, { color: textColor }]}>{title}</H14400>
            </TouchableOpacity>
        </View>

    );
};
// ============================================================ Common Input Field =================================================//

interface CustomTextInputProps {
    name: string;
    control: any;
    placeholder: string;
    label?: string;
    showIcon?: boolean;
    showOtp?: boolean;
    width?: number | any;
    subHead?: string;
    subHeadOnPress?: () => void;
    color?: any;
    iconName?: string | any;
    iconType?: string | any;
    iconSize?: number | any;
    onClose?: () => void;
    showCalendar?: boolean;
    defaultValue?: string;
    showStarSymbol?: boolean;
    subIcon?: boolean,
}
export const CustomTextInputField: React.FC<CustomTextInputProps> = ({
    name,
    control,
    placeholder,
    label,
    showIcon = false,
    showOtp,
    width,
    subHead,
    color,
    showCalendar,
    iconName,
    iconType,
    iconSize,
    defaultValue,
    subHeadOnPress,
    subIcon,
    showStarSymbol = true // Default to true
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <View style={{ marginVertical: 5 }}>
            <View style={[flexRow, justifyBetween]}>
                <View style={flexRow}>
                    {label && (
                        <>
                            <H14blackOne600 style={{ marginVertical: 5 }}>{label}</H14blackOne600>
                            {showStarSymbol && <H14Danger400>*</H14Danger400>}
                        </>
                    )}
                </View>
                {subHead &&
                    <TouchableOpacity onPress={subHeadOnPress}>
                        <Text style={{ color: color ? color : 'red', alignSelf: 'center', marginTop: 5 }}>{subHead}</Text></TouchableOpacity>}
            </View>
            <IconInputContainer width={width}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <CustomTextInput
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChange}
                            textColor={colors.black}
                            defaultValue={defaultValue}
                        />
                    )}
                    rules={{
                        required: requiredValidation(placeholder),
                        minLength: minLengthValidation(validationSchema.name.minLength),
                    }}
                />
                {showIcon && (
                    <View>
                        {label ?
                            showCalendar ?
                                (
                                    <View>
                                        <CustomIcon name={iconName} type={iconType} size={iconSize} color={colors.grey} />
                                    </View>
                                )
                                : (
                                    <TouchableOpacity onPress={toggleDropdown}>
                                        <CustomIcon
                                            name="chevron-small-down"
                                            size={16}
                                            color={colors.grey}
                                            type="Entypo"
                                        />
                                    </TouchableOpacity>
                                ) : (
                                <TouchableOpacity>
                                    <CustomIcon
                                        name="search"
                                        size={12}
                                        color={colors.grey}
                                        type="Feather" // Adjust this according to your icon library
                                    />
                                </TouchableOpacity>
                            )}
                    </View>
                )}
                {showOtp && (
                    <H14primary600 color={colors.primary}>{labels.generateCode}</H14primary600>
                )}
            </IconInputContainer>
            {isDropdownOpen && (
                <View style={{ backgroundColor: 'white', padding: 10, marginTop: 10, elevation: 1 }}>
                    <H14blackOne600>{"LIST"}</H14blackOne600>
                </View>
            )}
        </View>
    );
};


// ============================================================ Common navigate box =================================================//

interface CustomNavigateBoxProps {
    label: string;
    name: string;
    color?: any;
    onNavigate: () => void;
}

export const CustomNavigateBox: React.FC<CustomNavigateBoxProps> = ({
    label,
    color,
    onNavigate,
    name
}) => {

    return (
        <View style={{ marginVertical: 5 }}>
            <View style={[flexRow, justifyBetween]}>
                <View style={flexRow}>
                    {label && (
                        <>
                            <H14blackOne600 style={{ marginVertical: 5 }}>{label}</H14blackOne600>
                            <H14Danger400>*</H14Danger400>
                        </>
                    )}
                </View>
            </View>
            <TouchableOpacity onPress={onNavigate} style={[flexRow, justifyCenter, alignItemCenter, { height: 60, width: '100%' }]}>
                <DashedBorderView borderColor={colors.grey} borderWidth={1} borderStyle={'dashed'}>
                    <View style={[alignItemCenter, justifyCenter, { height: 16, width: 16, borderRadius: 5, backgroundColor: color }]}>
                        <CustomIcon color={colors.white} name='plus' size={12} type='Entypo' />
                    </View>
                    <Text style={[{ color: color }, ml5]}>{name}</Text>
                </DashedBorderView>
            </TouchableOpacity>
        </View>
    );
};

// ============================================================ Common Invoice Card =================================================//

type InvoiceData = {
    id: number;
    img: any;
    invoiceNo: string;
    companyName: string;
    status: string;
    amount: string;
    modeOfPayment: string;
    dueDate: string;
    color: string;
};

type InvoiceCardProps = {
    data: InvoiceData;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ data }) => {
    const navigation = useNavigation();
    const [actionModal, setActionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const openActionModal = () => {
        setActionModal(true);
    }

    const handleActionClick = (id: number) => {
        if (id == 1) {
            navigation.navigate(screenName.SendPaymentLink as never)
        } else if (id == 2) {
            navigation.navigate(screenName.InvoiceDetailsScreen as never)
        } else if (id == 8) {
            setActionModal(false);
            setShowDeleteModal(true);
        }
    }

    const ActionModal = () => {
        return (
            <View style={[]}>
                <ModalTopText title='Actions' iconPress={() => { }} />
                <View>
                    {
                        actionData.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => handleActionClick(item.id)} key={item.id} style={[flexRow, justifyStart, alignItemCenter, mv10]}>
                                    <View style={[{ height: 36, width: 36, borderRadius: 25, backgroundColor: colors.white4 }, justifyCenter, alignItemCenter]}>
                                        <CustomIcon color={colors.blackTwo} name={item.iconName} size={item.iconSize} type={item.iconType} />
                                    </View>
                                    <H14blackTwo600 style={[ml10]}>{item.text}</H14blackTwo600>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screenName.InvoiceDetailsScreen as never)} style={{ height: 120, width: '100%', marginTop: 15, alignSelf: 'center', backgroundColor: colors.white, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={data.img} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <H12Primary400>{data.invoiceNo}</H12Primary400>
                        <H16BlackOne700 style={{ marginTop: 5 }}>{data.companyName}</H16BlackOne700>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[{ height: 25, backgroundColor: data.color, borderRadius: 5 }, alignItemCenter, justifyCenter, flexRow, justifyEvenly]}>
                        <View style={[ml10, { height: 5, width: 5, borderRadius: 20, backgroundColor: colors.white }]} />
                        <H12white600 style={[ml5, mr10]}>{data.status}</H12white600>
                    </View>
                    <TouchableOpacity onPress={openActionModal} style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml10]}>
                        <CustomIcon name='dots-vertical' size={15} color={colors.blackTwo} type='MaterialCommunityIcons' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10, padding: 5, height: 40, width: '95%', backgroundColor: colors.greyOne, borderRadius: 8 }}>
                <View>
                    <H12blackTwo600>Amount</H12blackTwo600>
                    <H14blackOne600>{data.amount}</H14blackOne600>
                </View>
                <View>
                    <H12blackTwo600>Mode of Payment</H12blackTwo600>
                    <H14blackOne600>{data.modeOfPayment}</H14blackOne600>
                </View>
                <View>
                    <H12blackTwo600>Due Date</H12blackTwo600>
                    <H14blackOne600>{data.dueDate}</H14blackOne600>
                </View>
            </View>
            <CustomModal children={<ActionModal />} visible={actionModal} onClose={() => setActionModal(false)} height={'65%'} />
            {showDeleteModal && <PopupCardModal handleYesBtn={() => { }} text='Do you want to Delete Invoice' visible={showDeleteModal} onClose={() => setShowDeleteModal(false)} />}
        </TouchableOpacity>
    );
};

// =============== Multi select option component======================

interface MultiSelectProps {
    selectedColor: string;
    unselectedColor: string;
    isSelected: boolean;
    onSelect: () => void;
}

export const MultiSelectOption: React.FC<MultiSelectProps> = ({
    selectedColor,
    unselectedColor,
    isSelected,
    onSelect,
}) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={[
                styles.multiSelectBox,
                {
                    backgroundColor: isSelected === true ? selectedColor : colors.white,
                    borderWidth: isSelected === true ? 0 : 1,
                    borderColor: isSelected === true ? colors.primary : colors.grey,
                },
            ]}
        >
            {isSelected === true && (
                <CustomIcon name="check" size={15} color="white" type="MaterialIcons" />
            )}
        </TouchableOpacity>
    );
};

// =============== Multi line textinput component======================

interface MultiLineTextBoxProps {
    value: string;
    label: string;
    showMandatory?: boolean;
    onChangeValue: (text: string) => void;
    height?: number | any;
    maxLength?: number;
    multiline?: boolean;
    keyboardType?: KeyboardTypeOptions;
    placeHolder: string;
    disable?: boolean;
    error?: boolean;
    errorMessage?: string;
}

export const MultiLineTextBox: React.FC<MultiLineTextBoxProps> = ({
    value,
    maxLength,
    keyboardType,
    placeHolder,
    label,
    height,
    onChangeValue,
    multiline,
    disable,
}): JSX.Element => {
    const [isFocused, setFocused] = useState(value ? true : false);
    const [_animatedIsFocused, _setAnimatedIsFocused] = useState(new Animated.Value(0));
    const inputRef = React.useRef<TextInput>(null);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(!!value);


    return (
        <View style={height ? { marginTop: 10 } : { marginTop: 10 }}>
            <View style={[flexRow]}>
                <H14blackOne600 style={{ marginVertical: 5 }}>{label}</H14blackOne600>
                <H14Danger400>*</H14Danger400>
            </View>
            <TextInput
                editable={!disable}
                multiline={multiline}
                value={value}
                textAlignVertical={height ? 'top' : 'center'}
                maxLength={maxLength}
                autoCorrect={false}
                keyboardType={keyboardType}
                ref={inputRef}
                placeholder={placeHolder}
                placeholderTextColor={colors.grey}
                style={[
                    styles.input,
                    height && { height }
                ]}
                onChangeText={onChangeValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                blurOnSubmit
            />
        </View>
    );
};

// =============== Radio Button component======================

interface RadioBtnProps {
    selected: boolean;
    onPress: () => void;
}

export const RadioBtn: React.FC<RadioBtnProps> = ({ selected, onPress }) => {
    return (
        <TouchableOpacity style={[flexRow, alignItemCenter]} onPress={onPress}>
            <View style={{
                backgroundColor: colors.white,
                borderColor: selected ? colors.primary : colors.grey,
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {selected && (
                    <View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: selected ? colors.primary : colors.white,
                    }} />
                )}
            </View>
        </TouchableOpacity>
    );
};


// ======================================= TOGGLE SWITCH ======================================= //
type ToggleSwitchProps = {
    value: boolean;
    onToggle: () => void;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onToggle }) => {
    const borderRadius = 20; // Adjust the border radius as needed

    return (
        <TouchableOpacity onPress={onToggle}>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: value ? colors.primary : colors.grey,
                        borderWidth: 1,
                        borderColor: value ? colors.primary : colors.grey,
                    },
                ]}
            >
                <View
                    style={[
                        styles.toggle,
                        {
                            transform: [{ translateX: value ? 15 : 0.2 }],
                            backgroundColor: value ? colors.white : colors.white,
                        },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};
 //==================================================== FILTER FIELD ============================================================

 

interface ExpandableSectionProps {
    renderingComponent: JSX.Element;
    text: string;
    style?: StyleProp<ViewStyle>;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ renderingComponent, text, style }) => {
    const [showComponent, setShowComponent] = useState(false); // State to manage component visibility

    const toggleComponent = () => {
        setShowComponent(!showComponent); // Toggle visibility state
    };

    return (
        <View style={style}>
            <TouchableOpacity onPress={toggleComponent}>
                <View style={[flexRow, justifyBetween, alignItemCenter, mt15]}>
                    <H14blackOne600>{text}</H14blackOne600>
                    <CustomIcon
                        name={showComponent ? 'angle-up' : 'angle-down'} // Change icon based on visibility state
                        type='FontAwesome6'
                        color={colors.black}
                        size={10}
                    />
                </View>
            </TouchableOpacity>
            {showComponent && (
                <View>
                    {renderingComponent}
                </View>
            )}
        </View>
    );
};




//==================================
interface ExpandedByStatusProps {
    data: string[];
}

export const ExpandedByStatusComponent: React.FC<ExpandedByStatusProps> = ({ data }) => {
    const [checkBox, setCheckBox] = useState<boolean[]>(new Array(data.length).fill(false));

    const handleCheckBox = (index: number) => {
        const updatedCheckBox = [...checkBox]; // Create a copy of checkBox state array
        updatedCheckBox[index] = !updatedCheckBox[index]; // Toggle the value at the given index
        setCheckBox(updatedCheckBox); // Update the checkBox state
    };
    

    return (
        <View>
            {
                data.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }}>
                        <MultiSelectOption
                            selectedColor={colors.primary}
                            unselectedColor={'#FF6263'}
                            isSelected={checkBox[index] || false}
                            onSelect={() => handleCheckBox(index)}
                        />
                        <H14blackTwo400 style={{ marginLeft: 10 }}>{item}</H14blackTwo400>
                    </View>
                ))
            }
        </View>
    );
};

//=================================================


interface FilterHeaderProps {
    headerText: string;
    searchIcon?: boolean;
    searchText?: any;
    searchName?: any;
    handleSearch: (searchValue: string) => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ headerText, searchIcon, searchText, searchName, handleSearch }) => {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [iconType, setIconType] = useState<'angle-right' | 'angle-down'>('angle-right'); // State to manage icon type
    const [iconTypeName, setIconTypeName] = useState<'FontAwesome6' | 'FontAwesome6'>('FontAwesome6'); // State to manage icon type

    const toggleSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen);
        setIconType(isSearchBarOpen ? 'angle-right' : 'angle-down');
    };

    const closeSearchBar = () => {
        setIsSearchBarOpen(false);
        setIconType('angle-right');
    };

    const { control } = useForm();

    const onChangeText = (text: string) => {
        handleSearch(text); // Call handleSearch function whenever search text changes
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <H14blackOne600>{headerText}</H14blackOne600>
                {searchIcon && (
                    <TouchableOpacity onPress={toggleSearchBar}>
                        <CustomIcon name={iconType} size={15} color={colors.blackOne} type={iconTypeName} />
                    </TouchableOpacity>
                )}
            </View>
            {isSearchBarOpen && (
                <CustomTextInputField
                    name={searchName}
                    control={control}
                    placeholder={searchText}
                    onClose={closeSearchBar}
                    showIcon={true}
                    onChangeText={onChangeText} // Pass onChangeText function as prop
                />
            )}
        </View>
    );
};




interface CustomerSearchProps {
    placeholder: string;
    data: string[];
    isCheckBoxNeeded?: boolean;
    onChangeText: (text: string) => void;
    value: string; 
}

export const CustomerSearchExpanded: React.FC<CustomerSearchProps> = ({ placeholder, data, isCheckBoxNeeded ,onChangeText,value}) => {
    const [searchText, setSearchText] = useState(value);
    const [filteredData, setFilteredData] = useState<string[]>(data);
    const [checkBox, setCheckBox] = useState<boolean[]>(new Array(filteredData.length).fill(false));
    const handleInputChange = (text: string) => {
        setSearchText(text); // Update search text state
        // Filter data based on the search text
        const filteredItems = data.filter(item => item.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filteredItems); // Update filtered data state
    };

    const handleCheckBox = (index: number) => {
        const updatedCheckBox = [...checkBox]; // Create a copy of checkBox state array
        updatedCheckBox[index] = !updatedCheckBox[index]; // Toggle the value at the given index
        setCheckBox(updatedCheckBox); // Update the checkBox state
        onChangeText(text)
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, height: 35, width: '100%', backgroundColor: '#F4F4F4', borderColor: '#CCCCCC', borderRadius: 8 }}>
                <TextInput
                    style={{ marginLeft: 15,color:colors.grey }}
                    onChangeText={handleInputChange}
                    value={searchText}
                    placeholder={placeholder}
                    keyboardType='default'
                    placeholderTextColor={colors.blackTwo}
                />
                <View style={{ marginRight: 15 }}>
                    {/* CustomIcon component */}
                </View>
            </View>
            {searchText !== '' && (
                <View>
                    {filteredData.length === 0 ? (
                        <H14blackOne500>No items found</H14blackOne500>
                    ) : (
                        filteredData.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }}>
                                {
                                    isCheckBoxNeeded ? (
                                        <MultiSelectOption
                                            selectedColor={colors.primary}
                                            unselectedColor={'#FF6263'}
                                            isSelected={checkBox[index] || false}
                                            onSelect={() => handleCheckBox(index)}
                                        />
                                    ) : (
                                        <View />
                                    )
                                }
                                <H14blackOne500 style={{ marginLeft: 10 }}>{item}</H14blackOne500>
                            </View>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    tab: {
        height: 38,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10
    },
    iconContainer: {
        backgroundColor: colors.greyTwo,
        height: 36,
        width: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundCheckboxContainer: {
        borderWidth: 1,
        height: 38,
        width: '48%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    roundCheckBoxButton1: {
        height: 16,
        width: 16, borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundCheckBoxButton2: {
        height: 7,
        width: 7,
        borderRadius: 5,
    },
    multiSelectBox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderRadius: 6,
        backgroundColor: colors.greyOne,
        alignSelf: 'center',
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 1,
        marginTop: 0,
        borderColor: colors.greyFour
    },
    container: {
        width: 30,
        height: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggle: {
        width: 13,
        height: 13,
        borderRadius: 15,
    },
});