import React, { FC } from 'react';
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import CustomIcon from '../../utils/icons';
import { ProfileImage } from '../../utils/png';

import {
    H12blackTwo400,
    H12white600,
    H14Danger400,
    H14blackOne600,
    H16danger600
} from '../../utils/styledComponents';
import { colors } from '../../utils/theme/colors';
import {
    alignSelfCenter,
    flexRow,
    mh10,
    mh5
} from '../../utils/theme/commonStyles';

interface UploadImageCardProps {
    title: string;
    sizeInfo: string;
    onUpload: () => void;
    onDelete: () => void;
    imgTrue?: boolean; 
}

export const UploadImageCard: FC<UploadImageCardProps> = ({
    title,
    sizeInfo,
    onUpload,
    onDelete,
    imgTrue,
}) => {
    const containerStyle: ViewStyle = {
        backgroundColor: colors.greyOne,
        padding: 10,
        borderRadius: 10,
        elevation: 1,
    };

    const uploadButtonStyle: ViewStyle = {
        height: 92,
        width: 92,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.greyTwo,
        justifyContent: 'center',
        alignItems: 'center'
    };

    const uploadTextStyle: TextStyle = {
        backgroundColor: colors.blueFive,
        height: 25,
        width: 91,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <View style={containerStyle}>
            <View style={[flexRow]}>
                {imgTrue ?(  
                        <Image source={ProfileImage} style={{ height: 60, width: 60, borderRadius: 10 }} />
                ):(
                    <TouchableOpacity onPress={onUpload}>
                    <View style={uploadButtonStyle}>
                        <CustomIcon name={'image'} size={16} color={colors.grey} type={'OctIcon'} />
                    </View>
                </TouchableOpacity>
                )}
                <View style={[alignSelfCenter, mh10]}>
                    <View style={[flexRow]}>
                        <H14blackOne600>{title}</H14blackOne600>
                        <H16danger600 style={{ color: 'red' }}>*</H16danger600>
                    </View>
                    <H12blackTwo400>{sizeInfo}</H12blackTwo400>
                    <View style={[flexRow]}>
                        <TouchableOpacity
                            onPress={onUpload}
                            style={uploadTextStyle}>
                            <H12white600>Upload Image</H12white600>
                        </TouchableOpacity>
                        <TouchableOpacity style={[alignSelfCenter, mh5]} onPress={onDelete}>
                            <H14Danger400>Delete</H14Danger400>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};