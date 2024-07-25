import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'





const Finance = () => {
  return (
    <View style={{width:"100%",flexDirection:"column",display:"flex",justifyContent:"center",backgroundColor:"#8a42f5",flex:1,gap:10,alignItems:"center"}}>
      {/* <Text>Finance</Text> */}
     {/* <View style={{width:"90%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff"}}>
     <BarChart data = {[{value:100},{value:200,frontColor:"#4287f5"},{value:150,frontColor:"#4fb84f"},{value:50,frontColor:"#aebf5a"}]} 
      barBorderRadius={4}
      isAnimated
      animationDuration={500}
      />
     </View>
     <View style={{width:"90%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff"}}>
     <BarChart data = {[{value:100,frontColor:"#fff"},{value:200,frontColor:"#4287f5"},{value:150,frontColor:"#4fb84f"},{value:50,frontColor:"#aebf5a"}]} 
      barBorderRadius={4}
      isAnimated
      animationDuration={1000}
      backgroundColor={"#000"}
      
      /> */}

     <View style={{width:"90%",flexDirection:"row",display:"flex",justifyContent:"center",alignItems:"center",gap:10}}>
      
     <View style={{width:"40%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center"}}>
        
        <View style={{flexDirection:"column",display:"flex",width:"100%",justifyContent:"center",alignItems:"center",gap:10}}>
          
           <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Incoming Cash</Text>          
           <Text style={{color:"#000"}}>10000</Text>
           <Image source={require('../../../assets/images/IncomingCash.png')} style={{height:40,width:40}}/>
         
        </View>
        
      </View>
     <View style={{width:"40%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center"}}>
        
        <View style={{flexDirection:"column",display:"flex",width:"100%",justifyContent:"center",alignItems:"center",gap:10}}>
           <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Outgoing Cash</Text>
           <Text style={{color:"#000"}}>100</Text>
           <Image source={require('../../../assets/images/OutgoingCash.png')}style={{height:40,width:40}}/>
         
        </View>
        
      </View>

     </View>
     <View style={{width:"90%",flexDirection:"row",display:"flex",justifyContent:"center",alignItems:"center",gap:10}}>
      
     <View style={{width:"40%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center"}}>
        
        <View style={{flexDirection:"column",display:"flex",width:"100%",justifyContent:"center",alignItems:"center",gap:10}}>
           <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Borrowing Cash</Text>
           <Text style={{color:"#000"}}>1000</Text>
           <Image source={require('../../../assets/images/BorrowingCash.png')} style={{height:40,width:40}}/>
         
        </View>
        
      </View>
    

     </View>
   
     </View>
   
 
  )
}

export default Finance

const styles = StyleSheet.create({
   
})