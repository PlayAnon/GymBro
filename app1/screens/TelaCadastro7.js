import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Api } from "../Api";


const TelaCadastro7 = ({ route }) => {
  const navigation = useNavigation();

  // Dados da tela anterior
  const { email, senha, nome, peso, altura, idade, tempoTreino, objetivoP, uriImg, descricao } = route.params;

  const [lat, setLatitude] = React.useState(0)
  const [lon, setLongitude] = React.useState(0)
  const [nomeLocal, setNomeLocal] = React.useState("")
  const [user, setUser] = React.useState([])


  async function cadastrarUser2() {
  try {
    const pos = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 120000,
        maximumAge: 1000,
      });
    });

    setLatitude(pos.coords.latitude);
    setLongitude(pos.coords.longitude);

    if (lat !== 0 && lon !== 0) {
      const res = await Api.post("/users/create", {
        email, senha, nome, peso, altura, idade, tempoTreino, objetivoP, uriImg, descricao, nomeLocal, lat, lon
      });

      setUser(res.data.user);
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      navigation.navigate("TelaHome", { user });
    }
  } catch (error) {
      if (error.code === error.PERMISSION_DENIED) {
        Alert.alert('Erro', 'Permissão de localização negada. Verifique as configurações do dispositivo.');
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        Alert.alert('Erro', 'Informações de localização não estão disponíveis no momento.');
      } else if (error.code === error.TIMEOUT) {
        Alert.alert('Erro', 'Tempo limite excedido ao obter a localização.');
      } else {
        Alert.alert('Erro', 'Erro ao obter a localização do usuário: ' + error.message);
      }
  }
}
/*
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          Alert.alert('Erro', 'Permissão de localização negada. Verifique as configurações do dispositivo.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          Alert.alert('Erro', 'Informações de localização não estão disponíveis no momento.');
        } else if (error.code === error.TIMEOUT) {
          Alert.alert('Erro', 'Tempo limite excedido ao obter a localização.');
          } else {
            Alert.alert('Erro', 'Erro ao obter a localização do usuário: ' + error.message);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 120000,
          maximumAge: 1000,
        }
      );
    }, []);
    */


  async function setDadosLocal(details = null) {
    setNomeLocal(details.name);
    setLatitude(details.geometry.location.lat);
    setLongitude(details.geometry.location.lng);

    if (lat !== 0 && lon !== 0 && nomeLocal !== "") {
      await Api.post("/users/create", {
        email, senha, nome, peso, altura, idade, tempoTreino, objetivoP, uriImg, descricao, nomeLocal, lat, lon
      })
        .then(res => {
          setUser(res.data.user);
          Alert.alert("Sucesso", "Usuário criado com sucesso!");
          navigation.navigate("TelaHome", { user });
        })
        .catch(error => {
          Alert.alert("Alerta", error.message());
          return error;
        });
    }
  }

  return (
    <View style={styles.telacadastro7}>
      <View style={styles.logoquadradogymbro2Wrapper}>
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>

      <Text style={styles.selecioneAondeDesejaContainer}>
        Pesquise pela sua academia ou{"\n"} selecione o botão para buscar todos usuários por perto
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

      <View style={{ flex: 1, top: 300, padding: 10, }}>
        <GooglePlacesAutocomplete
          placeholder='Pesquisar academia...'
          onPress={(data, details = null) => {
            if (details && details.geometry && details.geometry.location) {
              setDadosLocal(details)
              /*setNomeLocal(details.name);
              setLatitude(details.geometry.location.lat);
              setLongitude(details.geometry.location.lng);
              navigation.navigate("TelaHome", {email,senha,nome,peso,altura,idade,tempoTreino,objetivoP,uriImg,descricao,nomeLocal,lat,lon})*/

            }
          }}
          query={{
            key: 'AIzaSyCstJwaPtmoOr3A9W6D2pEKT12ycJkZZeI',
            language: 'pt-BR',
            types: 'gym',
            radius: 5000, // Raio de busca em metros
            location: (lat && lon) ? `${lat},${lon}` : undefined,
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
        />
      </View>


      <View style={[styles.telacadastro7Inner, styles.telacadastro7Bg, { top: 600 }]} />
      <Pressable
        style={styles.buscarEmTodasAsRedesWrapper}
        onPress={() => { cadastrarUser2() }}
      >
        <Text
          style={[styles.buscarEmTodasContainer, styles.localizarAcademiaTypo]}
        >
          Buscar todos usuários próximos
        </Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  telacadastro7Bg: {
    backgroundColor: Color.chocolate,
    borderRadius: Border.br_31xl,
    position: "absolute",
  },
  localizarAcademiaTypo: {
    color: Color.white,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_2xl,
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
    backgroundColor: Color.chocolate,
    width: '100%',
    height: 113,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  selecioneAondeDesejaContainer: {
    top: 190,
    left: 20,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtrabold,
    color: Color.dimgray_200,
    textAlign: "center",
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
  telacadastro7Child: {
    top: 353,
    left: 53,
    width: 276,
    height: 41,
  },
  localizarAcademia: {
    alignSelf: 'center',
    textAlign: "left",
    top: 5
  },
  telacadastro7Inner: {
    top: 412,
    left: 46,
    width: 291,
    height: 68,
  },
  buscarEmTodasContainer: {
    left: 25,
    textAlign: "center",
    top: 0,
  },
  buscarEmTodasAsRedesWrapper: {
    top: 610,
    left: 63,
    width: 257,
    height: 50,
    position: "absolute",
    overflow: "hidden",
  },
  telacadastro7: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaCadastro7;
