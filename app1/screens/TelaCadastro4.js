import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const TelaCadastro4 = ({route}) => {
  const navigation = useNavigation();

  // Dados da tela anterior
  const {email,senha,nome,peso,altura,idade,tempoTreino} = route.params;
  
  // Objetivo principal do usuario
  const [objetivoP, setObjetivoP] = React.useState("");

  return (
    <View style={styles.telacadastro4}>
      <View
        style={[
          styles.logoquadradogymbro2Wrapper,
          styles.emagrecimentoPosition,
        ]}
      >
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <Text style={styles.selecioneSeuPrincipalContainer}>
        {`Selecione seu principal objetivo:`}
      </Text>
      <View style={[styles.emagrecimentoWrapper, styles.wrapperLayout]}>
        <Text style={[styles.emagrecimento, styles.emagrecimentoPosition]}>
          Emagrecimento
        </Text>
      </View>
      <View style={[styles.ganhoDeMassaWrapper, styles.wrapperLayout]}>
        <Text style={[styles.emagrecimento, styles.emagrecimentoPosition]}>
          Ganho de massa
        </Text>
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
      <Pressable
        style={styles.image6}
        onPress={() => {
          navigation.navigate("TelaCadastro5", {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP:"E"})
      }}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-6.png")}
        />
      </Pressable>
      <Pressable
        style={styles.image5}
        onPress={() => {
          navigation.navigate("TelaCadastro5", {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP:"G"})
      }}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-5.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  emagrecimentoPosition: {
    left: 0,
    top: -5,
    position: "absolute",
  },
  wrapperLayout: {
    height: 25,
    position: "absolute",
    overflow: "hidden",
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
    width: '100%',
    height: 113,
    overflow: "hidden",
  },
  selecioneSeuPrincipalContainer: {
    top: 171,
    left: 15,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtrabold,
    color: Color.dimgray_200,
    textAlign: "center",
    position: "absolute",
  },
  emagrecimento: {
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.interRegular,
    color: Color.dimgray_300,
    textAlign: "left",
  },
  emagrecimentoWrapper: {
    top: 266,
    left: 109,
    width: 155,
  },
  ganhoDeMassaWrapper: {
    top: 474,
    left: 117,
    width: 166,
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
  image5: {
    left: 133,
    top: 508,
    width: 99,
    height: 105,
    position: "absolute",
  },
  image6: {
    left: 123,
    top: 305,
    width: 114,
    height: 116,
    position: "absolute",
  },
  telacadastro4: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro4;
