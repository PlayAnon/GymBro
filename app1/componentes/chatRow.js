import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const chatRow = ( props ) => {
  const navigation = useNavigation();

  const item = props.matchesDetails;

  return(
    <TouchableOpacity 
      style={[{flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 8,
        paddingLeft: 25, paddingRight:25, backgroundColor: '#ffffff', marginLeft: 15, marginRight: 15, 
        marginTop: 5, marginBottom: 5, borderRadius: 12, 
      }, styles.cardShadow]}
      onPress={()=>{navigation.navigate("TelaChat2", {item})}}
    >
      <Image
        style={{borderRadius:1000, height: 68, width: 68, marginRight: 20,left:-10}}
        source={{ uri: item.uriImg }}
      />
      <View>
        <Text style={{fontSize:18, fontWeight: '600',bottom:5}}>
          {item.nome}
        </Text>
        <Text>Diga Olá!</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation:2,
  }
});

export default chatRow;