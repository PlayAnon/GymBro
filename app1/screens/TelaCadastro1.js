import * as React from "react";
import { Image, StyleSheet, View, Pressable, Text, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TelaCadastro1 = () => {
  const navigation = useNavigation();

  // Email do usuario
  const [email, setEmail] = React.useState("");

  // Senha do usuario
  const [senha, setSenha] = React.useState("");

  // Nome do usuario
  const [nome, setNome] = React.useState("");

  const proximaTela = ()=>{
    if(email === "" || senha === "" || nome === "")
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
    }
    else
    {
      navigation.navigate("TelaCadastro2", {email,senha,nome})
    }
  }


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={-300}
      enableOnAndroid={true}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.telacadastro1}>
          <View style={styles.logoquadradogymbro2Wrapper}>
            <Image
              style={styles.logoquadradogymbro2Icon}
              resizeMode="cover"
              source={require("../assets/logoquadradogymbro-2.png")}
            />
          </View>
          <View style={[styles.telacadastro1Child, styles.telacadastro1Layout]} />
          <Pressable
            style={styles.telacadastro1Item}
            onPress={proximaTela}>
              <Text style={styles.textCenterInput}>Próximo</Text>
          </Pressable>

          <Text style={[styles.digiteSeuEMail, styles.digiteTypo]}>
            Digite seu E-mail:
          </Text>
          <View style={[styles.rectangleView, styles.telacadastro1Layout]}>
            <TextInput 
              placeholder="E-mail" 
              fontSize={15}
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              keyboardType='email-address'
              style={styles.campoPreenchido}
              onChangeText = {text => setEmail(text)}
              onFocus = {() => setEmail("")}
            />
          </View>
          
          <Text style={[styles.digiteSuaSenha, styles.digiteTypo]}>
            Digite sua senha:
          </Text>
          <View style={[styles.telacadastro1Inner, styles.telacadastro1Layout]}>
            <TextInput
              placeholder="Senha" 
              fontSize={15}
              value={senha}
              style={styles.campoPreenchido} 
              onChangeText = {text => setSenha(text)}
              onFocus = {() => setSenha("")}
              secureTextEntry={true}
            />
          </View>

          <Text style={[styles.digiteSeuNome, styles.digiteTypo]}>
            Digite seu nome:
          </Text>
          <View style={[styles.telacadastro1Child, styles.telacadastro1Layout]}>
            <TextInput 
              placeholder="Nome" 
              fontSize={15}
              value={nome}
              maxLength={20}
              style={styles.campoPreenchido}
              onChangeText = {text => setNome(text)}
              onFocus = {() => setNome("")}
              onSubmitEditing={proximaTela}
            />
          </View>

          <Pressable
            style={styles.image2}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/image-2.png")}
            />
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  textCenterInput: {
    alignSelf: 'center', color: Color.white,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xl, top: 10
  },
  campoPreenchido:{
    padding:10
  },
  telacadastro1Layout: {
    height: 39,
    width: 277,
    backgroundColor: Color.gainsboro_200,
    left: 46,
    borderRadius: Border.br_31xl,
    position: "absolute",
  },
  digiteTypo: {
    color: Color.dimgray_200,
    fontSize: FontSize.size_3xl,
    left: 69,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  logoquadradogymbro2Icon: {
    left: 114,
    width: 148,
    height: 120,
    top: 0,
    position: "absolute",
  },
  logoquadradogymbro2Wrapper: {
    width: '100%',
    height: 113,
    backgroundColor: Color.chocolate,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  telacadastro1Child: {
    top: 450,
  },
  telacadastro1Item: {
    top: 564,
    left: 42,
    width: 291,
    height: 57,
    borderRadius: Border.br_31xl,
    backgroundColor: Color.chocolate,
    position: "absolute",
  },
  digiteSeuNome: {
    top: 417,
  },
  telacadastro1Inner: {
    top: 344,
  },
  senhaWrapper: {
    top: 350,
  },
  digiteSuaSenha: {
    top: 311,
  },
  rectangleView: {
    top: 238,
  },
  digiteSeuEMail: {
    top: 205,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image2: {
    left: 8,
    top: 116,
    width: 34,
    height: 40,
    position: "absolute",
  },
  telacadastro1: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro1;
