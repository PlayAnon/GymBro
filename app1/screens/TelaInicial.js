import * as React from "react";
import { Image, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../GlobalStyles";
import FastImage from 'react-native-fast-image';

const TelaInicial = () => {
  const navigation = useNavigation();


  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("TelaLogin");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.telainicial}>
      <Image
        style={styles.logoquadradogymbro1Icon}
        resizeMode="cover"
        source={require("../assets/logoquadradogymbro-1.png")}
      />
      <FastImage
        source={require('../assets/loadingGymBroGif.gif')}
        style={styles.loadingGif1Icon}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoquadradogymbro1Icon: {
    top: 57,
    left: 0,
    width: 408,
    height: 409,
    position: "absolute",
  },
  loadingGif1Icon: {
    top: 522,
    left: 147,
    width: 81,
    height: 81,
    position: "absolute",
  },
  telainicial: {
    backgroundColor: Color.chocolate,
    flex: 1,
    width: "100%",
    height: 667,
    overflow: "hidden",
  },
});

export default TelaInicial;
