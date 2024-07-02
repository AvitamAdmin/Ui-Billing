import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { TopHeader } from '../../components/commonComponents';
import DashedLine from '../../components/dashedLine';
import { quotationBottomBarData } from '../../utils/data/quotationsData';
import CustomIcon from '../../utils/icons';
import { labels } from '../../utils/labels';
import { SignatureImg } from '../../utils/png';
import { H12BlackOne600, H12BlackTwo500, H12blackTwo400, H12redTwo600, H12white600, H14blackOne600, H14blackTwo400, H14blackTwo600, H18BlackOne700, SmallCard } from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import { alignItemCenter, alignItemStart, alignSelfCenter, flex1, flexRow, justifyAround, justifyBetween, justifyCenter, justifyStart, mb10, mh10, mh15, ml10, ml15, ml5, mr10, mt10, mt15, mt5, mv10, mv15, mv5 } from '../../utils/theme/commonStyles';

export type purchaseDetailsProps = {
    
    }


const PurchaseOrderDetails = (props: purchaseDetailsProps) => {
    return (
        <View style={[flex1, { backgroundColor: colors.white }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[flex1, mt10, mh10, mb10]}>
                <TopHeader headerText={labels.purchaseOrderDetails} searchIcon={false} />
                <View style={[flexRow, justifyBetween, alignItemCenter, mv10]}>
                    <View>
                        <H18BlackOne700>{labels.purchaseOrder}</H18BlackOne700>
                    </View>
                    <View style={[flexRow, justifyBetween, alignItemCenter]}>
                        <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter]}>
                            <CustomIcon name={'edit'} size={15} color={colors.blackTwo} type={'Feather'} />
                        </View>
                        <TouchableOpacity style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter, ml5]}>
                            <CustomIcon name={'delete-forever-outline'} size={17} color={colors.blackTwo} type={'MaterialCommunityIcons'} />
                        </TouchableOpacity>
                        <View style={[{ height: 25, width: 50, backgroundColor: colors.green, borderRadius: 5 }, alignItemCenter, justifyCenter, flexRow, ml15]}>
                            <View style={{ height: 6, width: 6, borderRadius: 10, backgroundColor: colors.white }} />
                            <H12white600 style={[ml5]}>Paid</H12white600>
                        </View>
                    </View>
                </View>
                <View style={[{ height: 180, width: '100%', backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, borderRadius: 8 }, justifyCenter]}>
                    <View style={[flexRow, justifyBetween, alignItemCenter,]}>
                        <View style={[ml10]}>
                            <H14blackOne600>Date</H14blackOne600>
                            <View style={[{ height: 40, width: 150, backgroundColor: colors.greyOne, borderRadius: 5 }, alignItemStart, justifyCenter, mt5]}>
                                <H14blackTwo400 style={[ml10]}>15 Mar 2024</H14blackTwo400>
                            </View>
                        </View>
                        <View style={[mr10]}>
                            <H14blackOne600>{labels.purchaseOrderNo}</H14blackOne600>
                            <View style={[{ height: 40, width: 150, backgroundColor: colors.greyOne, borderRadius: 5 }, alignItemStart, justifyCenter, mt5]}>
                                <H14blackTwo400 style={[ml10]}>QUO - 000015</H14blackTwo400>
                            </View>
                        </View>
                    </View>
                    <View style={[flexRow, justifyBetween, alignItemCenter, mt15]}>
                        <View style={[ml10]}>
                            <H14blackOne600>{labels.purchaseOrderTo}</H14blackOne600>
                            <View style={[{ height: 60, width: 150, backgroundColor: colors.greyOne, borderRadius: 5 }, alignItemStart, justifyCenter, mt5]}>
                                <H14blackTwo400 style={[ml10]}>Naveen Bansel{'\n'}yodha@gmail.com{'\n'}987654321</H14blackTwo400>
                            </View>
                        </View>
                        <View style={[mr10]}>
                            <H14blackOne600>Pay To</H14blackOne600>
                            <View style={[{ height: 60, width: 150, backgroundColor: colors.greyOne, borderRadius: 5 }, alignItemStart, justifyCenter, mt5]}>
                                <H14blackTwo400 style={[ml10]}>KanakkuLLC{'\n'}Brooklyn, NY 333{'\n'}USA</H14blackTwo400>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <H12BlackTwo500 style={[mv15]}>Items</H12BlackTwo500>
                    <View style={[{ height: 220, width: '100%', backgroundColor: colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 2, borderRadius: 8 }, justifyCenter, alignItemCenter]}>
                        <View style={[{ height: 80, width: '90%', backgroundColor: colors.whiteTwo, borderWidth: 1, borderRadius: 8, borderColor: colors.greyFour }]}>
                            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                <H14blackOne600 style={[ml10]}>Nike Shoe</H14blackOne600>
                                <SmallCard style={[mr10, mt10, alignItemCenter, { backgroundColor: colors.redSix }]}>
                                    <H12redTwo600 style={[mh10]}>$5000</H12redTwo600>
                                </SmallCard>
                            </View>
                            <View style={[flexRow, justifyBetween, alignItemCenter, mh15, mt5]}>
                                <View>
                                    <H12blackTwo400>Unit</H12blackTwo400>
                                    <H12BlackOne600>Pc</H12BlackOne600>
                                </View>
                                <View>
                                    <H12blackTwo400>Quantity</H12blackTwo400>
                                    <H12BlackOne600>10</H12BlackOne600>
                                </View>
                                <View>
                                    <H12blackTwo400>Rate</H12blackTwo400>
                                    <H12BlackOne600>$7000</H12BlackOne600>
                                </View>
                                <View>
                                    <H12blackTwo400>Discount</H12blackTwo400>
                                    <H12BlackOne600>$2000</H12BlackOne600>
                                </View>
                            </View>
                        </View>
                        <View style={[{ height: 80, width: '90%', backgroundColor: colors.whiteTwo, borderWidth: 1, borderRadius: 8, borderColor: colors.greyFour }, mt10]}>
                            <View style={[flexRow, justifyBetween, alignItemCenter]}>
                                <H14blackOne600 style={[ml10]}>Iphone 15 pro</H14blackOne600>
                                <SmallCard style={[mr10, mt10, alignItemCenter, { backgroundColor: colors.redSix }]}>
                                    <H12redTwo600 style={[mh10]}>$5450</H12redTwo600>
                                </SmallCard>
                            </View>
                            <View style={[flexRow, justifyBetween, alignItemCenter, mh15, mt5]}>
                                <View>
                                    <H12blackTwo400>Unit</H12blackTwo400>
                                    <H12BlackOne600>Pc</H12BlackOne600>
                                </View>
                                <View>
                                    <H12blackTwo400>Quantity</H12blackTwo400>
                                    <H12BlackOne600>10</H12BlackOne600>
                                </View>
                                <View>
                                    <H12blackTwo400>Rate</H12blackTwo400>
                                    <H12BlackOne600>$4547</H12BlackOne600>
                                </View>
                                <View>
                                    <H12blackTwo400>Discount</H12blackTwo400>
                                    <H12BlackOne600>$1047</H12BlackOne600>
                                </View>
                            </View>
                        </View>
                        <View style={[justifyBetween, mh15, flexRow, mt10, { height: 20, width: '90%' }]}>
                            <H18BlackOne700>Total</H18BlackOne700>
                            <H18BlackOne700>$11500</H18BlackOne700>
                        </View>
                    </View>
                </View>
                <View style={mv10}>
                    <H14blackOne600 style={{}}>Summary</H14blackOne600>
                    <View style={[{ height: 130, width: '100%', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.greyTwo, borderRadius: 8 }, mv10]}>
                        <View style={[mh10, mv10]}>
                            <View style={[flexRow, justifyBetween]}>
                                <H14blackTwo600>Amount</H14blackTwo600>
                                <H14blackTwo600>$11500.00</H14blackTwo600>
                            </View>
                            <View style={[flexRow, justifyBetween, mt10]}>
                                <H14blackTwo600>Discount</H14blackTwo600>
                                <H14blackTwo600>$1000.00</H14blackTwo600>
                            </View>
                            <View style={[flexRow, justifyBetween, mt10]}>
                                <H14blackTwo600>Tax</H14blackTwo600>
                                <H14blackTwo600>$500.00</H14blackTwo600>
                            </View>
                            <View style={[alignSelfCenter, mv10]}>
                                <DashedLine height={300} color={colors.greyEight} dashGap={4} />
                            </View>
                            <View style={[flexRow, justifyBetween]}>
                                <H18BlackOne700>Total</H18BlackOne700>
                                <H18BlackOne700>$11000.00</H18BlackOne700>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[flexRow, alignItemCenter, justifyBetween, mh10]}>
                    <View style={[flexRow, alignItemCenter, justifyStart, { height: 35, width: '48%', backgroundColor: colors.greenOne, borderRadius: 5 }]}>
                        <View style={[ml10]}>
                            <CustomIcon color={colors.blackOne} name='file-outline' size={16} type='MaterialCommunityIcons' />
                        </View>
                        <H14blackTwo600 style={[ml5]}>Terms & Conditions</H14blackTwo600>
                    </View>
                    <View style={[flexRow, alignItemCenter, justifyStart, { height: 35, width: '48%', backgroundColor: colors.lightBlue, borderRadius: 5 }]}>
                        <View style={[ml10]}>
                            <CustomIcon color={colors.blackOne} name='file-outline' size={16} type='MaterialCommunityIcons' />
                        </View>
                        <H14blackTwo600 style={[ml5]}>Notes</H14blackTwo600>
                    </View>
                </View>
                <View style={mv10}>
                    <H14blackOne600 style={{}}>Signature</H14blackOne600>
                    <View style={[flexRow, alignItemCenter, alignSelfCenter, justifyStart, mv5, { height: 35, width: '95%', backgroundColor: colors.greenOne, borderRadius: 5 }]}>
                        <View style={[]}>
                            <Image source={SignatureImg} style={{ height: 20, width: 70 }} />
                        </View>
                    </View>
                </View>
                <View style = {[flexRow, justifyAround]}>
                    {
                        quotationBottomBarData.map((item) => {
                            return (
                                <View key={item.id}>
                                    <View style={[{ height: 30, width: 30, backgroundColor: colors.greyOne, borderRadius: 15 }, alignItemCenter, justifyCenter]}>
                                        <CustomIcon name={item.iconName} size={15} color={colors.blackTwo} type={item.iconType} />
                                    </View>
                                    <H14blackTwo600 style = {[mt5]}>{item.name}</H14blackTwo600>
                                    
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    </View>
    )
}

export default PurchaseOrderDetails