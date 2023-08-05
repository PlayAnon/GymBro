import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const TelaLogout = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.telainfo}>
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
      <Text style={styles.desejaRealmenteSair}>Deseja realmente sair?</Text>
      <Pressable
        style={[styles.image20, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaLogin")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-20.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image21, styles.imageLayout]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-21.png")}
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
  imageLayout: {
    height: 62,
    width: 62,
    top: 376,
    position: "absolute",
  },
  logoquadradogymbro2Icon: {
    width: 148,
    height: 120,
    left: 114,
  },
  logoquadradogymbro2Wrapper: {
    left: 0,
    backgroundColor: Color.chocolate,
    width: '100%',
    height: 113,
    overflow: "hidden",
  },
  desejaRealmenteSair: {
    top: 320,
    alignSelf:'center',
    fontSize: FontSize.size_7xl,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.interExtraboldItalic,
    color: Color.dimgray_200,
    textAlign: "center",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image20: {
    left: 204,
  },
  image21: {
    left: 114,
  },
  telainfo: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaLogout;
