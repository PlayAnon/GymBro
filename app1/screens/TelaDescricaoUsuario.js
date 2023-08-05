import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const TelaDescricaoUsuario = ({route}) => {
  const navigation = useNavigation();

  
  const [visible,setVisible] = React.useState(route.params.visible);
  const [card,setCard] = React.useState(route.params.card);
 

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
    >
      <View style={styles.teladescricaousuario}>
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
        {
          !card.nomeLocal
          ?
            <Text/>
          :
          <View>
            <Text style={[styles.academia, styles.nomeAcademia]}>
              {card.nomeLocal}
            </Text>
            <Image
                style={styles.image20Icon}
                resizeMode="cover"
                source={require("../assets/image-201.png")}
              />
          
          </View>
        }
  
        <Text
          style={[styles.descricao, styles.nomeAcademia]}
        >{card.descricao}</Text>
        <Text style={styles.descrio}>Descrição</Text>
        
       {/* <Image
          style={[styles.image23Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-20.png")}
        />
        <Image
          style={[styles.image24Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-21.png")}
      />*/}
        <Pressable
          style={styles.image3}
          onPress={() => {
            setVisible(false)
            navigation.goBack()
          }}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/image-2.png")}
          />
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logoquadradogymbro2Position: {
    top: 0,
    position: "absolute",
  },
  nomeAcademia: {
    width: 263,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  iconLayout: {
    height: 62,
    width: 62,
    top: 600,
    position: "absolute",
  },
  logoquadradogymbro2Icon: {
    left: 114,
    width: 148,
    height: 120,
  },
  logoquadradogymbro2Wrapper: {
    left: 0,
    backgroundColor: Color.chocolate,
    width: '100%',
    height: 113,
    overflow: "hidden",
  },
  academia: {
    top: 550,
    alignSelf:'center',
    height: 32,
  },
  descricao: {
    top: 250,
    alignSelf:'center',
    height: 207,
  },
  descrio: {
    top: 170,
    alignSelf:'center',
    fontSize: FontSize.size_7xl,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.interExtraboldItalic,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  image20Icon: {
    alignSelf:'center',
    top:600,
    width: 40,
    height: 40,
    position:'absolute'
  },
  image23Icon: {
    left: 211,
  },
  image24Icon: {
    left: 103,
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
  teladescricaousuario: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaDescricaoUsuario;
