import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcon from '../../utils/icons'
import { colors } from '../../utils/theme/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FinanceScreen from './finance'
import Stockupdate from './stockupdate'
import { useNavigation } from '@react-navigation/native'

const PersonalScreen = () => {
    const navigation = useNavigation();

    const [financescreen, setFinancescreen] = useState(true);
  return (
    <View style={{backgroundColor:"#fff",width:"100%",padding:10,height:"100%",gap:5}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <CustomIcon
              color={colors.primarTwo}
              size={24}
              name="arrow-back"
              type="Ionicons"
            />
        </TouchableOpacity>
    <View style={{backgroundColor:"#ebebeb",display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-evenly",alignItems:"center",paddingTop:7,paddingBottom:7,borderRadius:8}}>
        <TouchableOpacity onPress={()=>{setFinancescreen(true)}} style={{padding:5}}>
       <Text style={{fontSize:20,fontWeight:"500",color:financescreen == true ? colors.primaryThree : "#737373"}}> ₹ Finance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setFinancescreen(false)}} style={{padding:5}}>
       <Text style={{fontSize:20,fontWeight:"500",color:financescreen == false ? colors.primaryThree : "#737373"}}> Stock Update</Text>
        </TouchableOpacity>
    </View>
   <View style={{marginTop:5}}>
   
   {financescreen === true ? (<FinanceScreen />) : (<Stockupdate />)}
   </View>
    </View>
  )
}

export default PersonalScreen

const styles = StyleSheet.create({})