import React, { FC, useState } from 'react';
import { Image, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import CustomIcon from '../../utils/icons';
import { colors } from '../../utils/theme/colors';
import { alignSelfCenter, flexRow, mh10, mh5 } from '../../utils/theme/commonStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { H12blackTwo400, H12white600, H14Danger400, H14blackOne600, H16danger600 } from '../../utils/styledComponents';

interface UploadImageCardProps {
    title: string;
    sizeInfo: string;
    onImageSelect: (base64: string) => void;
    
}

export const UploadImageCard: FC<UploadImageCardProps> = ({
    title,
    sizeInfo,
    onImageSelect,
}) => {
    const [imageURL, setImageURL] = useState<string | undefined>(undefined);

    const handleImagePicker = async () => {
        console.log("pressing camera button");

        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: true,
            });
            if (result && result.assets && result.assets.length > 0) {
                const base64 = result.assets[0].base64!;
                setImageURL(base64);
                onImageSelect(base64);
                console.log(imageURL, "img response");
            }
        } catch (error) {
            console.error('Image picking error:', error);
        }
    };

    const containerStyle: ViewStyle = {
        backgroundColor: colors.greyOne,
        padding: 10,
        borderRadius: 10,
        elevation: 1,
    };

    const uploadButtonStyle: ViewStyle = {
        height: 85,
        width: 85,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.greyTwo,
        justifyContent: 'center',
        alignItems: 'center',
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
                {imageURL ? (
                    <TouchableOpacity onPress={handleImagePicker}>
                        <Image source={{ uri: `data:image/jpeg;base64,${imageURL}` }} style={{ height: 85, width: 85, borderRadius: 10 }} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleImagePicker}>
                        <View style={uploadButtonStyle}>
                            <CustomIcon name={'image'} size={56} color="#ababab" type={'OctIcon'} />
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
                            onPress={handleImagePicker}
                            style={uploadTextStyle}>
                            <H12white600>Upload Image</H12white600>
                        </TouchableOpacity>
                        <TouchableOpacity style={[alignSelfCenter, mh5]} onPress={() => { setImageURL(undefined);  }}>
                            <H14Danger400>Delete</H14Danger400>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
