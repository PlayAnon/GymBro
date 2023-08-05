import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const TelaCadastro3 = ({route}) => {
  const navigation = useNavigation();

  // Dados da tela anterior
  const {email,senha,nome,peso,altura,idade} = route.params;
 
  // Tempo de treino do usuario
  const [tempoTreino, setTempoTreino] = React.useState(-1);
  
  return (
    <View style={styles.telacadastro3}>
      <View
        style={[
          styles.logoquadradogymbro2Wrapper,
          styles.logoquadradogymbro2Position,
        ]}
      >
        <Image
          style={[
            styles.logoquadradogymbro2Icon,
            styles.logoquadradogymbro2Position,
          ]}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <Text style={styles.hQuantoTempoVocContainer}>
        Há quanto tempo você treina musculação?
      </Text>
      <Pressable
        style={[styles.telacadastro3Inner, styles.telacadastro3InnerFlexBox]}
        onPress={() => {
          navigation.navigate("TelaCadastro4", {email,senha,nome,peso,altura,idade,tempoTreino:0})
        }}
      >
        <View style={[styles.pesoWrapper, styles.frameViewLayout]}>
          <Text style={[styles.peso, styles.pesoTypo]}>0 meses</Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.telacadastro3Child, styles.telacadastro3InnerFlexBox]}
        onPress={() => {
          navigation.navigate("TelaCadastro4", {email,senha,nome,peso,altura,idade,tempoTreino:1})
        }}
      >
        <View style={[styles.pesoWrapper, styles.frameViewLayout]}>
          <Text style={[styles.peso1, styles.pesoTypo]}>1 - 12 meses</Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.telacadastro3Inner2, styles.telacadastro3InnerFlexBox]}
        onPress={() => {
          navigation.navigate("TelaCadastro4", {email,senha,nome,peso,altura,idade,tempoTreino:2})

        }}
      >
        <View style={[styles.pesoWrapper, styles.frameViewLayout]}>
          <Text style={[styles.peso4, styles.pesoTypo]}>1 - 2 anos</Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.framePressable, styles.telacadastro3InnerFlexBox]}
        onPress={() => {
          navigation.navigate("TelaCadastro4", {email,senha,nome,peso,altura,idade,tempoTreino:3})
        }}
      >
        <View style={[styles.pesoWrapper, styles.frameViewLayout]}>
          <Text style={[styles.peso2, styles.pesoTypo]}>2 - 3 anos</Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.telacadastro3Inner1, styles.telacadastro3InnerFlexBox]}
        onPress={() => {
          navigation.navigate("TelaCadastro4", {email,senha,nome,peso,altura,idade,tempoTreino:4})
        }}
      >
        <View style={[styles.frameView, styles.frameViewLayout]}>
          <Text style={[styles.peso3, styles.pesoTypo]}>Mais de 3 anos</Text>
        </View>
      </Pressable>
      
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
  );
};

const styles = StyleSheet.create({
  logoquadradogymbro2Position: {
    top: 0,
    position: "absolute",
  },
  telacadastro3InnerFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_7xl,
    backgroundColor: Color.gainsboro_200,
    borderRadius: Border.br_31xl,
    position: "absolute",
  },
  frameViewLayout: {
    height: 25,
    overflow: "hidden",
  },
  pesoTypo: {
    textAlign: "left",
    color: Color.dimgray_300,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_2xl,
    top: 0,
    position: "absolute",
  },
  logoquadradogymbro2Icon: {
    left: 114,
    width: 148,
    height: 120,
  },
  logoquadradogymbro2Wrapper: {
    backgroundColor: Color.chocolate,
    width: '100%',
    height: 113,
    left: 0,
    overflow: "hidden",
  },
  hQuantoTempoVocContainer: {
    top: 181,
    left: 35,
    fontSize: FontSize.size_4xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtrabold,
    color: Color.dimgray_200,
    textAlign: "center",
    position: "absolute",
  },
  peso: {
    left: 24,
  },
  pesoWrapper: {
    width: 132,
  },
  telacadastro3Inner: {
    top: 279,
    left: 88,
    alignItems: "center",
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_7xl,
    backgroundColor: Color.gainsboro_200,
    borderRadius: Border.br_31xl,
  },
  peso1: {
    left: 4,
  },
  telacadastro3Child: {
    top: 343,
    left: 88,
    alignItems: "center",
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_7xl,
    backgroundColor: Color.gainsboro_200,
    borderRadius: Border.br_31xl,
  },
  peso2: {
    left: 15,
  },
  framePressable: {
    top: 471,
    left: 88,
    alignItems: "center",
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_7xl,
    backgroundColor: Color.gainsboro_200,
    borderRadius: Border.br_31xl,
  },
  peso3: {
    left: 0,
  },
  frameView: {
    width: 151,
  },
  telacadastro3Inner1: {
    top: 535,
    left: 79,
    width: 201,
  },
  peso4: {
    left: 17,
  },
  telacadastro3Inner2: {
    top: 407,
    left: 88,
    alignItems: "center",
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_7xl,
    backgroundColor: Color.gainsboro_200,
    borderRadius: Border.br_31xl,
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
  telacadastro3: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro3;
