import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const TelaCadastro5 = ({route}) => {
  const navigation = useNavigation();

  // Dados da tela anterior
  const {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP} = route.params;

  const [uriImg,setUriImg] = React.useState('')

  const setFotoPerfil = ()=>{
    Alert.alert('Selecione', 
      'Selecione de onde você deseja escolher uma foto',
      [
        {
          text:'Galeria',
          onPress:()=>getFotoGaleria(),
        },
        {
          text:'Camera',
          onPress:()=>getFotoCamera(),
        },
      ],
      {
        cancelable:true,
        onDismiss: ()=> null
      }
    )
  }

  const getFotoGaleria = async ()=>{
    const options = {
      mediaType:'photo',
      quality: 1,
    }

    const result = await launchImageLibrary(options).catch((error) => {
      console.log('Erro ao capturar foto da galeria:', error);
    });
    const aux = String(result.assets[0].uri)

    setUriImg(aux)
  }

  const getFotoCamera = async ()=>{
    const options = {
      mediaType:'photo',
      cameraType: 'front',
    }

    const result = await launchCamera(options).catch((error) => {
      console.log('Erro ao capturar a foto da camera:', error);
    });
    const aux = String(result.assets[0].uri)

    setUriImg(aux)
  }

  return (
    <View style={styles.telacadastro5}>
      <View
        style={[styles.logoquadradogymbro2Wrapper, styles.telacadastro5ItemBg]}
      >
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <Text style={[styles.vamosFinalizarA, styles.vamosFinalizarAFlexBox]}>
        Vamos finalizar a criação do seu perfil...
      </Text>
      <Text style={[styles.cliqueAbaixoEEscolhaContainer, styles.prximoTypo]}>
      {`Clique abaixo e escolha uma foto de perfil`}
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
      <Pressable
        onPress={setFotoPerfil}
      >
        <View style={styles.telacadastro5Child} />
            {
              !uriImg
              ?
                <Image
                  style={styles.image26Icon}
                  resizeMode="cover"
                  source={require('../assets/image-26.png')}
                /> 
              :
                <Image
                  style={styles.image26Icon}
                  resizeMode="cover"
                  source={{ uri: uriImg }}
                 />
            }
      </Pressable>
      <Pressable
        style={[styles.telacadastro5Item, styles.telacadastro5ItemBg]}
        onPress={() => navigation.navigate("TelaCadastro6", {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP,uriImg})}>
          <Text style={styles.textCenterInput}>Próximo</Text>
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
  telacadastro5ItemBg: {
    backgroundColor: Color.chocolate,
    position: "absolute",
  },
  vamosFinalizarAFlexBox: {
    textAlign: "center",
    color: Color.dimgray_200,
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
  vamosFinalizarA: {
    top: 174,
    left: 8,
    fontWeight: "800",
    fontFamily: FontFamily.interExtrabold,
    width: 370,
    height: 68,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  cliqueAbaixoEEscolhaContainer: {
    top: 283,
    left: 12,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.dimgray_200,
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
  telacadastro5Child: {
    top: 372,
    left: 76,
    backgroundColor: Color.gainsboro_200,
    width: 224,
    height: 100,
    position: "absolute",
  },
  image26Icon: {
    top: 364,
    left: 133,
    width: 110,
    height: 110,
    position: "absolute",
  },
  telacadastro5Item: {
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
  telacadastro5: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro5;
