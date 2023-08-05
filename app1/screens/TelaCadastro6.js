import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Alert, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {Api} from "../Api";

const TelaCadastro6 = ({route}) => {
  const navigation = useNavigation();

  // Dados da tela anterior
  const {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP,uriImg} = route.params;

  const [descricao,setDescricao] = React.useState('');

  const proximaTela = ()=>{
    if(descricao === '')
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
    }
    else
    {
      navigation.navigate("TelaCadastro7", {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP,uriImg,descricao})
    }
  }

  return (
    <View style={styles.telacadastro6}>
      <View
        style={[styles.logoquadradogymbro2Wrapper, styles.telacadastro6ItemBg]}
      >
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <Text style={styles.faaUmaBreveContainer}>
        Faça uma breve descrição sobre você: (Suas metas, rotina de treino)
      </Text>
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
      
      <View style={styles.telacadastro6Child}>
        <TextInput
          style={[styles.cliqueParaEditar]}
          placeholder="Clique para editar"
          multiline={true}
          textAlignVertical="center"
          value={descricao}
          onChangeText = {text => setDescricao(text)}
          onFocus = {() => setDescricao("")}
          maxLength={170}
        >
        </TextInput>
      </View>
      
      <Pressable
        style={[styles.telacadastro6Item, styles.telacadastro6ItemBg]}
        onPress={ proximaTela }
        >
          <Text style={styles.textCenterInput}>Cadastrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textCenterInput: {
    alignSelf: 'center', color: Color.white,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xl, top: 10
  },
  telacadastro6ItemBg: {
    backgroundColor: Color.chocolate,
    position: "absolute",
  },
  prximoTypo: {
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
    left: 0,
    width: '100%',
    height: 113,
    top: 0,
    overflow: "hidden",
  },
  faaUmaBreveContainer: {
    top: 174,
    left: 3,
    fontWeight: "800",
    fontFamily: FontFamily.interExtrabold,
    color: Color.dimgray_200,
    width: 370,
    height: 96,
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    position: "absolute",
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
  telacadastro6Child: {
    top: 286,
    left: 40,
    backgroundColor: Color.gainsboro_200,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: 296,
    height: 248,
    position: "absolute",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  telacadastro6Item: {
    top: 564,
    left: 42,
    borderRadius: Border.br_31xl,
    width: 291,
    height: 57,
  },
  prximo: {
    top: 578,
    left: 142,
    color: Color.white,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
  },
  cliqueParaEditar: {
    fontSize: FontSize.size_3xl,
    color: "#8d8d8d",
    textAlign:'center',
    flexGrow:1,
    height:'100%',
    width:'100%',
    flex: 1,
    textAlignVertical: 'top',
  },
  telacadastro6: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro6;
