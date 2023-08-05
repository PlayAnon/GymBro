import * as React from "react";
import { Image, StyleSheet, View, Pressable, Text, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TelaCadastro2 = ({route}) => {
  const navigation = useNavigation();

  // Dados da tela anterior
  const { email, senha, nome } = route.params;

  // Peso do usuario
  const [peso, setPeso] = React.useState("");

  // Altura do usuario
  const [altura, setAltura] = React.useState("");

  // Idade do usuario
  const [idade, setIdade] = React.useState("");

  const proximaTela = ()=>{
    if(peso === "" || altura === "" || idade === "")
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
    }
    else
    {
      navigation.navigate("TelaCadastro3", {email,senha,nome,peso,altura,idade})
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={-300}
      enableOnAndroid={true}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.telacadastro2}>
          <View style={styles.logoquadradogymbro2Wrapper}>
            <Image
              style={styles.logoquadradogymbro2Icon}
              resizeMode="cover"
              source={require("../assets/logoquadradogymbro-2.png")}
            />
          </View>
          <Pressable
            style={styles.telacadastro2Child}
            onPress={proximaTela}>
              <Text style={styles.textCenterInput}>Próximo</Text>
          </Pressable>
          
          <Text style={styles.vamosPegarMaisContainer}>
            {`Vamos pegar mais algumas informações para personalizar sua experiência!`}
          </Text>
          <Text style={[styles.digiteSeuPeso, styles.digiteTypo]}>
            Digite seu peso:
          </Text>
          <View style={[styles.telacadastro2Item, styles.telacadastro2Layout]}>
            <TextInput 
              placeholder="Peso" 
              fontSize={15}
              value={peso}
              maxLength={5}
              style={styles.campoPreenchido}
              onChangeText = {text => setPeso(text)}
              onFocus = {() => setPeso("")}
              keyboardType='decimal-pad'
            />
          </View>

          <Text style={[styles.digiteSuaAltura, styles.digiteTypo]}>
            Digite sua altura:
          </Text>
          <View style={[styles.telacadastro2Inner, styles.telacadastro2Layout]}>
            <TextInput 
                placeholder="Altura"
                fontSize={15}
                value={altura}
                maxLength={4}
                style={styles.campoPreenchido}
                onChangeText = {text => setAltura(text)}
                onFocus = {() => setAltura("")}
                keyboardType='decimal-pad'
              />
          </View>

          <Text style={[styles.digiteSuaIdade, styles.digiteTypo]}>
            Digite sua idade:
          </Text>
          <View style={[styles.rectangleView, styles.telacadastro2Layout]}>
            <TextInput 
              placeholder="Idade"
              fontSize={15}
              value={idade}
              maxLength={2}
              style={styles.campoPreenchido}
              onChangeText = {text => setIdade(text)}
              onFocus = {() => setIdade("")}
              keyboardType='numeric'
              onSubmitEditing={proximaTela}
            />
          </View>
          
          <Pressable
            style={styles.image3}
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
    padding:9
  },
  pesoTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  telacadastro2Layout: {
    height: 39,
    width: 267,
    backgroundColor: Color.gainsboro_200,
    borderRadius: Border.br_31xl,
    position: "absolute",
  },
  wrapperLayout: {
    height: 25,
    position: "absolute",
    overflow: "hidden",
  },
  digiteTypo: {
    fontSize: FontSize.size_3xl,
    left: 75,
    color: Color.dimgray_200,
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
  telacadastro2Child: {
    top: 564,
    left: 42,
    width: 291,
    height: 57,
    borderRadius: Border.br_31xl,
    backgroundColor: Color.chocolate,
    position: "absolute",
  },
  prximo: {
    top: 578,
    left: 142,
    fontSize: FontSize.size_5xl,
    color: Color.white,
  },
  vamosPegarMaisContainer: {
    top: 160,
    left: 10,
    fontSize: FontSize.size_4xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtrabold,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  telacadastro2Item: {
    top: 304,
    left: 56,
    width: 267,
    backgroundColor: Color.gainsboro_200,
  },
  peso: {
    fontSize: FontSize.size_2xl,
    color: Color.dimgray_300,
    left: 0,
    fontFamily: FontFamily.interRegular,
    top: 0,
  },
  pesoWrapper: {
    top: 310,
    width: 49,
    left: 84,
    height: 25,
  },
  digiteSeuPeso: {
    top: 271,
  },
  telacadastro2Inner: {
    top: 397,
    left: 56,
    width: 267,
    backgroundColor: Color.gainsboro_200,
  },
  alturaWrapper: {
    top: 402,
    width: 59,
    left: 84,
    height: 25,
  },
  digiteSuaAltura: {
    top: 364,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image3: {
    left: 8,
    top: 116,
    width: 34,
    height: 40,
    position: "absolute",
  },
  rectangleView: {
    top: 492,
    left: 52,
  },
  senhaWrapper: {
    top: 497,
    left: 80,
    width: 56,
  },
  digiteSuaIdade: {
    top: 457,
  },
  telacadastro2: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro2;
