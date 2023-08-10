import * as React from "react";
import { StyleSheet, View, Image, Pressable, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Api } from "../Api";
import { useCookies } from "react-cookie";

const TelaPerfil1 = ({route}) => {
  const navigation = useNavigation();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId;
  
  const [carregado, setCarregado] = React.useState(false);
  const [user, setUser] =  React.useState("");

  React.useEffect(() => {
    async function buscarDados() {
      Api.patch(`/users/findOne/${userId}`).then(res =>{

        setUser(res.data);
        setCarregado(true);

      }).catch(error =>{
        console.log(error.response.data.error);
      })
    }

    buscarDados();
  }, [user]);

  const verificaTempoTreino = ()=>{
    if(user.tempoTreino===0){
      return '0 meses'
    }else if(user.tempoTreino===1){
      return '1-12 meses'
    }else if(user.tempoTreino===2){
      return '1-2 anos'
    }else if(user.tempoTreino===3){
      return '2-3 anos'
    }else if(user.tempoTreino===4){
      return 'Mais de 3 anos'
    }
  }

  const verificaObjetivoPrincipal= ()=>{
    if(user.objetivoP==='E'){
      return 'Emagrecimento'
    }else{
      return 'Ganho de massa'
    }
  }

  const atualizaFotoUser = (uriImg)=>{
    Api.patch(`/users/${user._id}`, {uriImg}).then(res =>{

    }).catch(error =>{
      Alert.alert("Alerta", error.response.data.error);
    })
  }

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
    const uriImg = String(result.assets[0].uri)

    atualizaFotoUser(uriImg)
  }

  const getFotoCamera = async ()=>{
    const options = {
      mediaType:'photo',
      cameraType: 'front',
    }

    const result = await launchCamera(options).catch((error) => {
      console.log('Erro ao capturar a foto da camera:', error);
    });
    const uriImg = String(result.assets[0].uri)
    atualizaFotoUser(uriImg)
  }

  if(!carregado){
    return <View></View>
  }

  return (
    <View style={styles.telaperfil}>
      <View style={[styles.telaperfilChild, styles.telaperfilChildPosition1]} />
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
      <View>
        {
          !user.uriImg
          ?
            <Image
              style={styles.image18Icon}
              resizeMode="cover"
              source={require("../assets/image-181.png")}
            />
          :
            <Image
              style={styles.image18Icon}
              resizeMode="cover"
              source={{ uri: user.uriImg }}
            />
        }
    
      </View>
      
      <Text style={[styles.meuPerfil, styles.meuPerfilFlexBox]}>
        Meu Perfil
      </Text>
      <Text style={[styles.pesoKg, styles.pesoKgPosition]}>
        <Text style={styles.peso}>{`Peso: `}</Text>
        <Text style={styles.kgTypo}>{user.peso}kg</Text>
      </Text>
      <Text style={[styles.nome, styles.anosTypo]}>
        {user.nome}
      </Text>
      <Text style={[styles.alturaMetro, styles.pesoKgPosition]}>
        <Text style={styles.peso}>{`Altura: `}</Text>
        <Text style={styles.kgTypo}>{user.altura}m</Text>
      </Text>
      <Text style={[styles.anos, styles.anosTypo]}>{user.idade} anos</Text>
      <Text style={[styles.tempoDeTreinoContainer, styles.containerPosition]}>
        <Text style={styles.peso}>{`Tempo de treino: `}</Text>
        <Text style={styles.kgTypo}>{verificaTempoTreino()}</Text>
      </Text>
      <View style={styles.container}>
        <Text style={[styles.descricao, styles.meuPerfilFlexBox]}>
          <Text>
            <Text style={styles.descrio}>{`Descrição: `}</Text>
            <Text style={[styles.descricaoText, styles.kgTypo]}>
              {user.descricao}
            </Text>
          </Text>
        </Text>
        <Image
          style={[styles.telaperfilItem, styles.telaperfilChildPosition]}
          resizeMode="cover"
          source={require("../assets/line-1.png")}
        />
      </View>
      <Text style={[styles.objetivoGanhoDeContainer, styles.containerPosition]}>
        <Text style={styles.peso}>{`Objetivo: `}</Text>
        <Text style={styles.kgTypo}>{verificaObjetivoPrincipal()}</Text>
      </Text>
      <Pressable
        style={[styles.image30Parent, styles.imageLayout2]}
        onPress={() => navigation.navigate("TelaPerfil", { user })}
      >
        <Image
          style={styles.image30Icon}
          resizeMode="cover"
          source={require("../assets/image-30.png")}
        />
        <Text style={styles.editarPerfil}>Editar perfil</Text>
      </Pressable>
      <Pressable
        style={[styles.image8, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaBusca1")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-81.png")}
        />
      </Pressable>
      <Image
        style={[styles.image9Icon, styles.imageLayout]}
        resizeMode="cover"
        source={require("../assets/image-91.png")}
      />
      <Pressable
        style={[styles.image10, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaChat", {user})}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-10.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image12, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaInfo1")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-12.png")}
        />
      </Pressable>
  
      <Pressable
        style={[styles.image20, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaLogout")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-191.png")}
        />
      </Pressable>

      <Pressable
        onPress={setFotoPerfil}
        style={styles.image25Icon}
      >
        <Image
          resizeMode="cover"
          source={require("../assets/image-25.png")}
        />
      </Pressable>
    
      <Image
        style={[styles.telaperfilInner, styles.telaperfilChildPosition]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.lineIcon, styles.telaperfilChildPosition]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.telaperfilChild1, styles.telaperfilChildPosition]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.telaperfilChild2, styles.telaperfilChildPosition]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  telaperfilChildPosition1: {
    left: 0,
    width: '100%',
    top:735,
  },
  logoquadradogymbro2Position: {
    top: 0,
    position: "absolute",
  },
  imageLayout: {
    height: 32,
    width: 32,
    top:746,
    position: "absolute",
  },
  imageLayout2: {
    height: 40,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
 
  imagePosition: {
    left: 326,
    height: 32,
    width: 32,
    position: "absolute",
  },
  meuPerfilFlexBox: {
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  pesoKgPosition: {
    top: 334,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  anosTypo: {
    top: 305,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  containerPosition: {
    left: 54,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.dimgray_200,
    position: "absolute",
  },
  kgTypo: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
  },
  telaperfilChildPosition: {
    height: 2,
    left: 0,
    position: "absolute",
  },
  telaperfilChild: {
    height:'100%',
    backgroundColor: Color.gainsboro_100,
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
    overflow: "hidden",
  },
  icon: {
    opacity: 0.25,
  },
  image8: {
    left: 172,
    width: 32,
    height: 32,
    top: 628,
  },
  image9Icon: {
    left: 95,
    width: 32,
    height: 32,
    top: 628,
  },
  image10: {
    left: 249,
    width: 32,
    height: 32,
    top: 628,
  },
  image12: {
    left: 18,
    width: 32,
    height: 32,
    top: 628,
  },
  icon3: {
    opacity: 0.75,
  },
  image19: {
    top: 148,
  },
  image18Icon: {
    top: 174,
    alignSelf:'center',
    borderRadius: Border.br_981xl,
    width: 93,
    height: 91,
    position: "absolute",
  },
  meuPerfil: {
    top: 134,
    left: 122,
    fontSize: FontSize.size_7xl,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.interExtraboldItalic,
  },
  peso: {
    fontFamily: FontFamily.interRegular,
  },
  pesoKg: {
    left: 52,
    fontSize: FontSize.size_3xl,
  },
  nome: {
    left: 52,
  },
  alturaMetro: {
    left: 228,
    fontSize: FontSize.size_3xl,
  },
  anos: {
    left: 253,
  },
  tempoDeTreinoContainer: {
    top: 374,
  },
  descrio: {
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_3xl,
  },
  descricaoText: {
    fontSize: FontSize.size_lg,
    flexWrap:'wrap',
  },
  descricao: {
    top: 460,
    alignSelf:'center',
    flexWrap:'wrap',
    padding:5
  },
  objetivoGanhoDeContainer: {
    top: 411,
  },
  image30Icon: {
    width: 15,
    height: 15,
    opacity: 0.75,
  },
  editarPerfil: {
    fontSize: FontSize.size_mid,
    color: Color.black,
    textAlign: "left",
    marginLeft: 10,
    fontFamily: FontFamily.interRegular,
  },
  image30Parent: {
    top: 650,
    alignSelf:'center',
    borderTopLeftRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: 160,
    flexDirection: "row",
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.gainsboro_100,
  },
  image20: {
    top: 628,
    left: 326,
  },
  image25Icon: {
    top: 231,
    left: 219,
    width: 23,
    height: 22,
    position: "absolute",
  },
  telaperfilItem: {
    top: 600,
    width: '100%',
  },
  telaperfilInner: {
    top: 404,
    width: '100%',
  },
  lineIcon: {
    top: 296,
    width: '100%',
  },
  telaperfilChild1: {
    top: 367,
    width: '100%',
  },
  telaperfilChild2: {
    top: 442,
    width: '100%',
  },
  telaperfil: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    width: '100%',
    overflow: "hidden",
  },
});

export default TelaPerfil1;
