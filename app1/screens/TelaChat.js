import * as React from "react";
import { Image, StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import ChatList from '../componentes/chatList';
import { Api } from "../Api";
import { useCookies } from "react-cookie";

const TelaChat = () => {
  const navigation = useNavigation();

  const [carregado, setCarregado] = React.useState(false);
  const [userLogged, setUser] =  React.useState("");

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId;

  React.useEffect(() => {
    async function buscarDados() {
      Api.patch(`/users/findOne/${userId}`).then(res =>{

        setUser(res.data);
        setCarregado(true);

      }).catch(error =>{
        console.log(error.response.data.error);
      })
    }

    buscarDados();
  }, [userLogged]);


  if(!carregado){
    return <View></View>
  }

  return (
    <View style={styles.telachat}>
      <View style={styles.logoquadradogymbro2Wrapper}>
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.minhasConversas}>Minhas conversas</Text>
        
        <ChatList parametro={userLogged}/>

      </View>

      <View style={styles.navigationBar}>
        <Pressable
          style={[styles.image14, styles.imageLayout]}
          onPress={() => navigation.navigate("TelaBusca1")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/image-81.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.image15, styles.imageLayout]}
          onPress={() => navigation.navigate("TelaPerfil1")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/image-9.png")}
          />
        </Pressable>
        <Image
          style={[styles.image16Icon, styles.imageLayout]}
          resizeMode="cover"
          source={require("../assets/image-161.png")}
        />
        <Pressable
          style={[styles.image17, styles.imageLayout]}
          onPress={() => navigation.navigate("TelaInfo1")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/image-12.png")}
          />
        </Pressable>
        
        <Pressable
          style={[styles.image19, styles.imageLayout]}
          onPress={() => navigation.navigate("TelaLogout")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/image-191.png")}
          />
        </Pressable>
      </View>
      
      

    </View>
    
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },  
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: Color.gainsboro_100,
    height:46
  },
  
  imageLayout: {
    height: 32,
    width: 32,
    bottom:6,
    position: "absolute",
  },
  image18Border: {
    marginTop: 19,
    justifyContent: 'center',
    alignItems: 'center',
    right:15,
    paddingVertical: 6,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.gainsboro_100,
  },
  logoquadradogymbro2Icon: {
    left: 114,
    width: 148,
    height: 120,
    top: 0,
    position: "absolute",
  },
  logoquadradogymbro2Wrapper: {
    backgroundColor: Color.chocolate,
    height: 113,
    width: '100%',
    position: "absolute",
    overflow: "hidden",
  },
  telachatChild: {
    top: 735,
    height: '100%',

    backgroundColor: Color.gainsboro_100,
    width: '100%',
    left: 0,
    position: "relative",
  },
  icon: {
    height: "100%",
    opacity: 0.25,
    width: "100%",
  },
  image14: {
    left: 172,
  },
  image15: {
    left: 95,
  },
  image16Icon: {
    left: 249,
  },
  image17: {
    left: 18,
  },
  image19: {
    left: 326,
  },
  minhasConversas: {
    top: 128,
    alignSelf:'center',
    fontSize: FontSize.size_7xl,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.interExtraboldItalic,
    color: Color.dimgray_200,
    textAlign: "center",
    position: "absolute",
  },
  image18Icon: {
    borderRadius: Border.br_981xl,
    width: 30,
    height: 30,
    alignSelf:'center'
  },
  nomeUsuario: {
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.interRegular,
    color: Color.black,
    textAlign: "left",
    marginLeft: 10,
  },
  image18Parent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: Padding.p_3xs,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.gainsboro_100,
  },
  image18Parent1: {
    height: 39,
  },
  frameParent: {
    top: 233,
    left: 88,
    position: "absolute",
  },
  telachat: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: '100%',
    overflow: "hidden",
    width: "100%",
    position: "absolute",
  },
});

export default TelaChat;
