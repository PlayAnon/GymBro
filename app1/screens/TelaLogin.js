import * as React from "react";
import { Image,StyleSheet,View,TextInput,Text,Pressable,Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import {Api} from "../Api";
import { useCookies } from "react-cookie";

const TelaLogin = () => {
  const navigation = useNavigation();

  // Email do usuario
  const [email, setEmail] = React.useState("");
  // Senha do usuario
  const [senha, setSenha] = React.useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const logar = async () => {
    await Api.post("/users/auth", {email,senha}).then(res =>{
      const token = res.data.token;
      const user = res.data.user;
      setCookie('Token', token);
      setCookie('UserId', user._id);
      navigation.navigate("TelaHome");
    
    }).catch(error =>{
      Alert.alert("Alerta", error.response.data.error);

      return error
    })
  };
  
  return (
    <View style={styles.telalogin}>
      <View style={styles.logoquadradogymbro2Wrapper}>
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <TextInput
        placeholder="E-mail"
        fontSize={20}
        style={[styles.telaloginChild, styles.telaloginLayout, styles.campoPreenchido]}
        onChangeText={text => setEmail(text)}
        onFocus={() => setEmail("")}
        keyboardType='email-address'
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />
      <TextInput
        placeholder="Senha"
        fontSize={20}
        style={[styles.telaloginItem, styles.telaloginLayout, styles.campoPreenchido]}
        onChangeText={text => setSenha(text)}
        onFocus={() => setSenha("")}
        keyboardType='default'
        secureTextEntry={true}
      />

      <Pressable
        style={[styles.telaloginInner, styles.telaloginLayout]}
        onPress={logar}>
        <Text style={styles.textCenterInput}>Entrar</Text>
      </Pressable>
      <Pressable
        style={[styles.rectanglePressable, styles.telaloginLayout]}
        onPress={() => navigation.navigate("TelaCadastro1")}>
          <Text style={styles.textCenterInput}>Cadastrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  campoPreenchido: {
    padding: 15
  },
  telaloginLayout: {
    height: 57,
    width: 291,
    borderRadius: Border.br_31xl,
    left: 42,
    position: "absolute",
  },
  eMailTypo: {
    textAlign: "left",
    color: Color.dimgray_300,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xl,
    left: 70,
    position: "absolute",
  },
  textCenterInput: {
    alignSelf: 'center', color: Color.white,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xl, top: 10
  },
  logoquadradogymbro2Icon: {
    left: 114,
    width: 148,
    height: 120,
    top: 0,
    position: "absolute",
  },
  logoquadradogymbro2Wrapper: {
    left: 0,
    width: '100%',
    height: 113,
    backgroundColor: Color.chocolate,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  telaloginChild: {
    top: 226,
    backgroundColor: Color.gainsboro_200,
    width: 291,
    borderRadius: Border.br_31xl,
    left: 42,
  },
  eMail: {
    top: 240,
  },
  telaloginItem: {
    top: 298,
    backgroundColor: Color.gainsboro_200,
    width: 291,
    borderRadius: Border.br_31xl,
    left: 42,
  },
  senha: {
    top: 312,
  },
  telaloginInner: {
    top: 404,
    width: 291,
    borderRadius: Border.br_31xl,
    left: 42,
    backgroundColor: Color.chocolate,
  },
  rectanglePressable: {
    top: 512,
    width: 291,
    borderRadius: Border.br_31xl,
    left: 42,
    backgroundColor: Color.chocolate,
  },
  telalogin: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    width: "100%",
    height: 667,
    overflow: "hidden",
  },
});

export default TelaLogin;
