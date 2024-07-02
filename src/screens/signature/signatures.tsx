import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../../components/bottomNavBar';
import { ListSubHeader, TopHeader } from '../../components/commonComponents';
import DashedLine from '../../components/dashedLine';
import { signaturesData } from '../../utils/data/signatureData';
import { DevHeight } from '../../utils/device';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenNames';
import { BottomWidth, H12white600, H15blackOne600 } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flexRow, justifyBetween, mh15, mv15, mv5 } from '../../utils/theme/commonStyles';

export type ReportsProps = {};

const Signatures = (props: ReportsProps) => {
    const [activeId, setActiveId] = useState<number | null>(1);
    const navigation = useNavigation();

    const handleItemClick = (id: number) => {
        setActiveId(id);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.whiteTwo }}>
            <View style={mh15}>

                <View style={mv15}>
                    <TopHeader
                        headerText={labels.signatures}
                        searchIcon={true}
                        searchName={'Search ' + labels.invoiceTemplates}
                        searchText={labels.signatures}
                    />
                </View>
                <BottomWidth style={mv5} />
                <ScrollView>
                    <ListSubHeader listName={labels.creditNotes} totalNumber={'21'} onAddPress={() => navigation.navigate(screenName.AddSignatures as never)} addIcon={true} />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 15 }}>
                        {signaturesData.map((data, index) => {
                            const isActive = activeId === data.id;

                            let backgroundColor;
                            if (data.status === 'Active') {
                                backgroundColor = colors.green;
                            } else if (data.status === 'Inactive') {
                                backgroundColor = colors.danger;
                            } else {
                                backgroundColor = colors.danger;
                            }
                            return (
                                <View key={index} style={{ width: '50%', marginBottom: 15, padding: 5 }}>
                                    <View style={{ backgroundColor: 'white', height: 100, borderRadius: 5, elevation: 3, padding: 5 }}>
                                        <View style={[flexRow, justifyBetween]}>
                                            <H15blackOne600 style={[alignSelfCenter]}>{data.name}</H15blackOne600>
                                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                {isActive ?
                                                    <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleItemClick(data.id)}>
                                                        <View style={{ height: 14, width: 14, borderRadius: 7, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}>
                                                            <CustomIcon name={'star'} size={9} color={colors.white} type={'FontAwesome'} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleItemClick(data.id)}>
                                                        <CustomIcon name={'star-o'} size={16} color={colors.blackTwo} type={'FontAwesome'} />
                                                    </TouchableOpacity>
                                                }
                                                <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 3 }}>
                                                    <CustomIcon name={'edit'} size={16} color={colors.blackTwo} type={'Feather'} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ backgroundColor: colors.greyOne, height: 32, width: 32, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                    <CustomIcon name={'delete-forever-outline'} size={18} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 10 }}>
                                            <DashedLine height={DevHeight / 5} color={colors.greyTwo} dashLength={10} dashGap={3} />
                                        </View>
                                        <View style={[flexRow, justifyBetween, { right: 10 }]}>
                                            <Image source={data.image} style={{ height: 26, width: 89, resizeMode: 'contain' }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ backgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4 }}>
                                                    <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: colors.white, }} />
                                                    <H12white600 style={{ marginHorizontal: 4 }}>{data.status}</H12white600>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
            <BottomNavBar />
        </View>
    );
};

export default Signatures;
