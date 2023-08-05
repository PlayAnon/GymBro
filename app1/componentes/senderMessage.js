import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


const senderMessage = ({ message }) => {
  const navigation = useNavigation();

  return (
    <View 
      style={{backgroundColor: '#6D28D9', borderRadius: 12, borderTopRightRadius: 0, paddingLeft: 25,
        paddingRight: 25, paddingTop: 15, paddingBottom: 15, marginLeft: 15, marginRight: 15, marginTop: 10,
        marginBottom: 10, alignSelf:"flex-start", marginLeft:"auto"
      }}
    >
      <Text style={{color: '#ffffff'}}>{message.message}</Text>
    </View>
    
  );
};



export default senderMessage;
