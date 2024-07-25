import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SelectDropdown from 'react-native-select-dropdown'
import { Dropdown } from 'react-native-element-dropdown';

// import { Icon } from 'react-native-vector-icons/Icon'



const StockUpdate = () => {

  const [value, setValue] = useState<string | null>(null); // Specify the type here
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
 

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];


  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={{width:"100%",flexDirection:"column",display:"flex",backgroundColor:"#8a42f5",flex:1,gap:10,alignItems:"center",paddingTop:30,gap:20}}>
 
 <View style={styles.container}>
  {renderLabel()}
  <Dropdown
    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={data}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? 'Select item' : '...'}
    searchPlaceholder="Search..."
    value={value}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setValue(item.value);
      setIsFocus(false);
    }}
    renderLeftIcon={() => (
      <AntDesign
        style={styles.icon}
        color={isFocus ? 'blue' : 'black'}
        name="Safety"
        size={20}
      />
    )}
    renderItem={renderItem}
  />
</View>
    
 <View style={{width:"90%",flexDirection:"column",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
 <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"85%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Stock</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
       
        </View>
       
      </View>
      
    </View>
   <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"85%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Purchase</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
            
        </View>
       
      </View>
      
    </View>
   <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"85%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Sales</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
       
        </View>
       
      </View>
      
    </View>
   <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"90%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Total Available</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
       
      

             
        </View>
       
      </View>
      
    </View>
 </View>
 <View style={styles.container}>
  {renderLabel()}
  <Dropdown
    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={data}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? 'Select item' : '...'}
    searchPlaceholder="Search..."
    value={value}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setValue(item.value);
      setIsFocus(false);
    }}
    renderLeftIcon={() => (
      <AntDesign
        style={styles.icon}
        color={isFocus ? 'blue' : 'black'}
        name="Safety"
        size={20}
      />
    )}
    renderItem={renderItem}
  />
</View>
    
 <View style={{width:"90%",flexDirection:"column",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
 <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"85%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Stock</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
        <Pressable>
        <FontAwesome6Icon name="edit" size={20} color="black" /> 

        </Pressable>
        </View>
       
      </View>
      
    </View>
   <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"85%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Purchase</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
        <Pressable>
        <FontAwesome6Icon name="edit" size={20} color="black" /> 

        </Pressable>        
        </View>
       
      </View>
      
    </View>
   <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"85%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Sales</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
        <Pressable>
        <FontAwesome6Icon name="edit" size={20} color="black" /> 

        </Pressable>
        </View>
       
      </View>
      
    </View>
   <View style={{width:"100%",flexDirection:"row",display:"flex",borderRadius:20,backgroundColor:"#fff",padding:10,alignItems:"center",justifyContent:"center"}}>
      
      <View style={{flexDirection:"row",display:"flex",width:"90%",justifyContent:"space-between",alignItems:"center",gap:10,padding:5}}>
        
         <Text style={{color:"#000",fontWeight:"bold",fontSize:18}}>Total Available</Text>          
        <View style={{flexDirection:"row",gap:8,alignItems:"center"}}>
        <Text style={{color:"#000"}}>10000</Text>
       
        <Pressable>
        <FontAwesome6Icon name="edit" size={20} color="black" /> 

        </Pressable>

             
        </View>
       
      </View>
      
    </View>
 </View>
   
   

   

 
   

 

</View>
  )
}

export default StockUpdate

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    width:"90%"
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,   
    color:"#f5f"
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color:"#000"
  },
  placeholderStyle: {
    fontSize: 16,
    color:"#000"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"#000"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:"#000"
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#000', // Change this to your desired color
  },
})