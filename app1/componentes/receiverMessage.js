import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


const receiverMessage = ({ message, item }) => {
  const navigation = useNavigation();

  return (
    <View 
      style={{backgroundColor: '#F87171', borderRadius: 12, borderTopLeftRadius: 0, paddingLeft: 25,
        paddingRight: 25, paddingTop: 15, paddingBottom: 15, marginLeft: 70, marginRight: 15, marginTop: 10,
        marginBottom: 10, alignSelf:"flex-start"
      }}
    >
      <Image
        style={{backgroundColor: '#F87171', borderRadius: 12, borderTopLeftRadius: 0, paddingLeft: 25,
          paddingRight: 25, paddingTop: 15, paddingBottom: 15, marginLeft: 70, marginRight: 15,
          marginTop: 10, marginBottom: 10,
      }}
        source={{ uri: item.uriImg }}
      />
      <Text style={{color: '#ffffff'}}>{message.message}</Text>
    </View>
    
  );
};



export default receiverMessage;
