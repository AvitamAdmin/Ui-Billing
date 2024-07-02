import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { generalInvoiceTemplatesData } from '../../utils/data/invoiceTemplatesData';
import { H14blackOne500 } from '../../utils/styledComponents';
import { alignSelfCenter, mv10 } from '../../utils/theme/commonStyles';

export type generalInvoiceProps = {

}
const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 1.84 - 15;

const GeneralInvoice = (props: generalInvoiceProps) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {generalInvoiceTemplatesData.map((data, index) => {
                    return (
                        <View key={index} style={{ marginVertical: 6 }}>
                            <View >
                                <View style={{ backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: '#D9E0E9', width: itemWidth }}>
                                    <Image source={data.image} style={{ height: 170, width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                                        <H14blackOne500 style={[alignSelfCenter,mv10]}>{'General Invoice ' + data.id}</H14blackOne500>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    )
}

export default GeneralInvoice