import * as React from "react";
import { Image, StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily } from "../GlobalStyles";

const TelaInfo1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.telainfo}>
      <View
        style={[
          styles.logoquadradogymbro2Wrapper,
          styles.telainfoChildPosition,
        ]}
      >
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <View style={[styles.telainfoChild, styles.telainfoChildPosition]} />
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
      <Pressable
        style={[styles.image16, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaChat")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-10.png")}
        />
      </Pressable>
      <Image
        style={[styles.image17Icon, styles.imageLayout]}
        resizeMode="cover"
        source={require("../assets/image-17.png")}
      />
      <Text style={styles.sobre}>Sobre</Text>
      <Text
        style={[
          styles.aplicativoDesenvolvidoParaAContainer,
          styles.desenvolvidoContainerTypo,
        ]}
      >
        Aplicativo desenvolvido para ajudar os praticantes de musculação a
        encontrar um parceiro de treino.
      </Text>
      <Text
        style={[
          styles.desenvolvedor,
          styles.desenvolvidoContainerTypo,
        ]}
      >
        <Text>Desenvolvido por{'\n'}Guilherme Augusto de Deus Maciel{'\n'}{'\n'}2023</Text>
      </Text>
      <Pressable
        style={[styles.image20, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaLogout")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-191.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  telainfoChildPosition: {
    width: '100%',
    left: 0,
    position: "absolute",
  },
  imageLayout: {
    height: 32,
    width: 32,
    bottom:6,
    position: "absolute",
  },
  desenvolvidoContainerTypo: {
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.dimgray_200,
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
    backgroundColor: Color.chocolate,
    height: 113,
    top: 0,
    overflow: "hidden",
  },
  telainfoChild: {
    top: 735,
    backgroundColor: Color.gainsboro_100,
    height: 46,
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
  image16: {
    left: 249,
  },
  image17Icon: {
    left: 18,
  },
  sobre: {
    top: 148,
    alignSelf:'center',
    fontSize: FontSize.size_7xl,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.interExtraboldItalic,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  aplicativoDesenvolvidoParaAContainer: {
    top: 300,
    padding:5,
    alignSelf:'center',
    flexWrap:'wrap',
    fontFamily: FontFamily.interRegular,
  },
  desenvolvedor: {
    top: 450,
    alignSelf:'center',
    padding:10,
  },
  image20: {
    left: 326,
  },
  telainfo: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaInfo1;
