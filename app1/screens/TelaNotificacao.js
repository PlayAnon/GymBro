import * as React from "react";
import { Image, StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const TelaNotificacao = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.telanotificacao}>
      <View style={styles.logoquadradogymbro2Wrapper}>
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <View style={styles.telanotificacaoChild} />
      <Pressable
        style={[styles.image19, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaChat")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-10.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image14, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaBusca1")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
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
        source={require("../assets/image-16.png")}
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
      <Text style={styles.notificaes}>Notificações</Text>
      <View style={styles.frameParent}>

        {/*Utilizar para criar "Solicitação nova"*/}
        <View style={[styles.image18Group, styles.image18Border]}>
          <Image
            style={styles.image18Icon}
            resizeMode="cover"
            source={require("../assets/image-182.png")}
          />
          <Text style={styles.usuarioQuerSer}>
            Usuario quer ser seu parceiro
          </Text>
        </View>

        {/*Utilizar para criar "Msg nova"*/}
        <View style={[styles.image18Group, styles.image18Border]}>
          <Image
            style={styles.image18Icon}
            resizeMode="cover"
            source={require("../assets/image-183.png")}
          />
          <Text style={styles.usuarioQuerSer}>
            Usuario te enviou uma mensagem
          </Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageLayout: {
    height: 32,
    width: 32,
    bottom:6,
    position: "absolute",
  },
  image18Border: {
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: Padding.p_3xs,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
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
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  telanotificacaoChild: {
    width: '100%',
    top:735,
    height:'100%',
    backgroundColor: Color.gainsboro_100,
    left: 0,
    position: "absolute",
  },
  icon: {
    height: "100%",
    opacity: 0.25,
    width: "100%",
  },
  image19: {
    left: 249,
  },
  image14: {
    left: 172,
  },
  image15: {
    left: 95,
  },
  image16Icon: {
    left: 326,
  },
  image17: {
    left: 18,
  },
  notificaes: {
    top: 148,
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
    width: 28,
    height: 27,
  },
  usuarioQuerSer: {
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.interRegular,
    color: Color.black,
    textAlign: "left",
    marginLeft: 10,
  },
  image18Group: {
    marginTop: 19,
    left:-8,
  },
  frameParent: {
    top: 233,
    left: 13,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  telanotificacao: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaNotificacao;
