import * as React from "react";
import { View, Image, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatRow from './chatRow';
import { Api } from "../Api";

const chatList = (props) => {
  const navigation = useNavigation();

  const  userLogged  = props.parametro;

  const [matches,setMatches] = React.useState([]);

  React.useEffect(()=>{
    
    Api.patch(`/users/findOne/${userLogged._id}`).then(res =>{

      setMatches(res.data.matches);
    
  
    }).catch(error =>{
      Alert.alert("Alerta", error.response.data.error);
    })
  }, [userLogged]);

  return matches.length > 0 ? (
    <FlatList
      style={{height: '100%', top:180}}
      data={matches}
      keyExtractor={(item) => item.email}
      renderItem={({item}) => <ChatRow matchesDetails={item}/>}

    />
  ) : (
    
    <View style={{padding:5, top:350}}>
      <Text style={{textAlign: 'center', fontSize: 18}}>
        Você não possui parceiros {"\n"}até o momento 😢
      </Text>
    </View>
    
  )

};

export default chatList;