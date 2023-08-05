import * as React from "react";
import { StyleSheet, View, Image, Pressable, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import FastImage from 'react-native-fast-image';

const TelaHome = () => {
  const navigation = useNavigation();


  React.useEffect(() => {
   
    navigation.navigate("TelaBusca1"); 

  }, []);

  return (
    <View style={styles.telahome}>
      <View style={[styles.telahomeChild, styles.telahomeChildLayout]} />
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
      <Image
        style={[styles.image8Icon, styles.imageLayout]}
        resizeMode="cover"
        source={require("../assets/image-8.png")}
      />
      <Pressable
        style={[styles.image9, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaPerfil1")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-9.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image10, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaChat")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-10.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image12, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaInfo1")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-12.png")}
        />
      </Pressable>
      <Text style={styles.buscandoSeuParceiroDeContainer}>
        Buscando seu parceiro de treino...
      </Text>
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
      <FastImage
        source={require('../assets/busulagif.gif')}
        style={styles.busulaGif1Icon}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  telahomeChildLayout: {
    width: '100%',
    top:735,
    height:'100%',
    left: 0,
  },
  logoquadradogymbro2Position: {
    top: 0,
    position: "absolute",
  },
  imageLayout: {
    height: 32,
    width: 32,
    bottom:6,
    position: "absolute",
  },
  telahomeChild: {
    top: 621,
    backgroundColor: Color.gainsboro_100,
    height: 46,
    position: "absolute",
  },
  logoquadradogymbro2Icon: {
    left: 114,
    width: 148,
    height: 120,
  },
  logoquadradogymbro2Wrapper: {
    backgroundColor: Color.chocolate,
    height: 113,
    width: '100%',
    left: 0,
    overflow: "hidden",
  },
  image8Icon: {
    left: 172,
  },
  icon: {
    height: "100%",
    opacity: 0.25,
    width: "100%",
  },
  image9: {
    left: 95,
  },
  image10: {
    left: 249,
  },
  image12: {
    left: 18,
  },
  buscandoSeuParceiroDeContainer: {
    top: 221,
    left: 37,
    fontSize: 28,
    fontFamily: FontFamily.interRegular,
    color: Color.dimgray_200,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    position: "absolute",
  },
  image19: {
    left: 326,
  },
  busulaGif1Icon: {
    top: 341,
    left: 119,
    width: 137,
    height: 163,
    position: "absolute",
  },
  telahome: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaHome;
