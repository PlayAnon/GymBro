import * as React from "react";
import { StyleSheet, View, Image, Pressable, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import Swiper from "react-native-deck-swiper";
import { Api } from "../Api";
import { useCookies } from "react-cookie";

const TelaBusca1 = () => {

  const navigation = useNavigation();

  const [user, setUser] = React.useState({})

  const [profiles,setProfiles] = React.useState([])
  
  const swipeRef = React.useRef(null); 

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId;

  function calcularDistancia(user, profiles) {
  return profiles.map(element => {
    const distancia = Math.sqrt(Math.pow(element.lat - user.lat, 2) + Math.pow(element.lon - user.lon, 2));
    return { perfil: element, distancia };
  });
}

function encontrarUsuariosProximos(user, profiles) {

  const perfisComDistancias = calcularDistancia(user, profiles);

  perfisComDistancias.sort((a, b) => {
    // Compara o objetivo do usuário com o objetivo de referência
    const aObjetivoIgual = a.perfil.objetivoP === user.objetivoP;
    const bObjetivoIgual = b.perfil.objetivoP === user.objetivoP;

    // Verifica se a distância de a e b é menor que 5
    const aIsClose = a.distancia < 5;
    const bIsClose = b.distancia < 5;

    // Se apenas um deles estiver perto (menos de 5), retorna o que está mais próximo
    if (aIsClose && !bIsClose) return -1;
    if (!aIsClose && bIsClose) return 1;

    // Se ambos estiverem próximos ou ambos estiverem longe, verifica o objetivo
    if (aObjetivoIgual && !bObjetivoIgual) return -1;
    if (!aObjetivoIgual && bObjetivoIgual) return 1;

    // Em caso de empate em ambas as distâncias e objetivos
    return a.distancia - b.distancia;

  
  });

  const usuariosProximos = perfisComDistancias.slice(0, profiles.length).map(element => element.perfil);

  return usuariosProximos;
}



  React.useEffect(()=>{

    Api.get(`/users/getProfiles/${userId}`).then(res =>{

      const usersProfiles = res.data;
      //setProfiles(usersProfiles);

      Api.patch(`/users/findOne/${cookies.UserId}`).then(res =>{
        setUser(res.data);
  
        const usuariosProximos = encontrarUsuariosProximos(user, usersProfiles);
        setProfiles(usuariosProximos);
    
      }).catch(error =>{
        console.log(error.response.data.error);
      })
  
    }).catch(error =>{
      Alert.alert("Alerta", error.response.data.error);
    })
  }, []);
  

  const updateSwipes = async (swipedUserId) =>{

    Api.put('/users/addswipe', {userId, swipedUserId}).catch(error =>{
      console.log(error.response.data.error);
    })
   
  }

  const updatePasses = async (passesUserId) =>{

    Api.put('/users/addpasses', {userId, passesUserId}).catch(error =>{
      console.log(error.response.data.error);
    })
  
  }

  const swipeLeft = async (cardIndex) =>{
    if(!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const userSwipedId = userSwiped._id;

    updateSwipes(userSwipedId)

    Api.get(`/matches/matchUsers/${userId}/${userSwipedId}`).then(res =>{

      if(res.status===201){
        const userLogged = res.data.users[0];
        const userProfile = res.data.users[1];

        Api.put('/users/addmatches', {userId, userSwipedId}).catch(error =>{
          console.log(error.response.data.error);
        })
 
        navigation.navigate('MatchedScreen', {userLogged, userProfile});
      }
      
    }).catch(error =>{
      console.log(error.response.data.error);
    })
  }

  const swipeRight = async (cardIndex) =>{
    if(!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    updatePasses(userSwiped._id) 
  }
   
  return (
    <View style={styles.telabusca1}>
      <View style={[styles.telabusca1Child, styles.telabusca1ChildLayout]} />
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

      <View style={{flex:1, marginTop: 70,}}>
        <Swiper
          ref={ swipeRef }
          containerStyle={{backgroundColor:'transparent'}}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedLeft={(cardIndex)=>{
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex)=>{
            swipeRight(cardIndex)
          }}
          overlayLabels={{
            left: {
              title: "MATCH",
              style:{
                label:{
                  textAlign:'right',
                  color:'#4DED30',
                },
              },
            },
            right: {
              title: "NOPE",
              style:{
                label:{
                  color:'red',
                },
              },
            },
          }}
          renderCard={(card)=> card ? (
            <View key={card.id} style={{position:'relative', backgroundColor: Color.chocolate, height: '75%', borderRadius: 10,}}>
              {
                !card.uriImg
                ?
                <Image
                  style={{position:'absolute', top:0, width:'100%', height:'100%', borderRadius: 10}}
                  source={require("../assets/image-18.png")}
                />
                :
                <Image
                style={{position:'absolute', top:0, width:'100%', height:'100%', borderRadius: 10}}
                source={{uri: card.uriImg}}
              />
              }
         
              <View style={[{
                position:'absolute', justifyContent:'space-between',
                justifyContent:'space-between', flexDirection:'row', 
                bottom:0, backgroundColor:'white',
                width:'100%', height:'20%',
                paddingHorizontal: 10, paddingVertical: 30
              }, styles.cardShadow]}>
                <Text style={{fontSize: 25,fontWeight: 'bold'}}>{card.nome}</Text>
                <Text style={{fontSize: 27,fontWeight: 'bold'}}>{card.idade}</Text>
                
              </View>
              <Pressable
                  style={{}}
                  onPress={() => navigation.navigate("TelaDescricaoUsuario", {visible:true,card})}
                >
                  <Image
                    style={{alignSelf:'flex-end',top:350}}
                    resizeMode="cover"
                    source={require("../assets/image-22.png")}
                  />
                </Pressable>
            </View>
          ):(
              <View style={{position:'relative', backgroundColor:'white', height: '75%',borderRadius: 10,justifyContent:'center',alignItems:'center' }}>
                <Text style={{fontWeight: 'bold',paddingBottom: 20,}}>Não possui parceiros por perto</Text>
                <Image
                  style={{}}
                  height={100}
                  width={100}
                  source={{uri:"https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/Not_found_the_recipient-no_found-person-user-search-searching-4-512.png"}}
                />                
              </View>              
            )}
        />
      </View>    

      <Pressable 
        style={[styles.image20Icon, styles.iconLayout]}
        onPress={()=>{swipeRef.current.swipeLeft()}}
      >
        <Image
          resizeMode="cover"
          source={require("../assets/image-20.png")}
        />
      </Pressable>

      <Pressable
        style={[styles.image21Icon, styles.iconLayout]}
        onPress={()=>{swipeRef.current.swipeRight()}}
      >
        <Image
          resizeMode="cover"
          source={require("../assets/image-21.png")}
        />
      </Pressable>

      <Pressable
        style={[styles.image9, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaPerfil1", {user})}
      >
        <Image
          style={styles.iconLayout1}
          resizeMode="cover"
          source={require("../assets/image-9.png")}
        />
      </Pressable>

      
      <Pressable
        style={[styles.image18, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaChat", {userLogged:user})}
      >
        <Image
          style={[styles.icon2, styles.iconLayout1]}
          resizeMode="cover"
          source={require("../assets/image-10.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image181, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaInfo1")}
      >
        <Image
          style={[styles.icon2, styles.iconLayout1]}
          resizeMode="cover"
          source={require("../assets/image-12.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.image19, styles.imageLayout]}
        onPress={() => navigation.navigate("TelaLogout")}
      >
        <Image
          style={[styles.icon2, styles.iconLayout1]}
          resizeMode="cover"
          source={require("../assets/image-191.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation:2,
  },
  telabusca1ChildLayout: {
    width: '100%',
    left: 0,
    top: 735,
  },
  logoquadradogymbro2Position: {
    top: 0,
    position: "absolute",
  },
  imageLayout: {
    height: 32,
    width: 32,
    bottom: 6,
    position: "absolute",
  },
  iconLayout: {
    opacity:0.8,
    height: 62,
    width: 62,
    top: 650,
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  telabusca1Child: {
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
    width:'100%',
    left: 0,
    overflow: "hidden",
  },
  image8Icon: {
    left: 172,
  },
  image9: {
    left: 95,
  },
  image20Icon: {
    left: 211,
  },
  image21Icon: {
    left: 103,
  },
  image22: {
    left: 322,
    top: 475,
    width: 43,
    height: 43,
    position: "absolute",
  },
  icon2: {
    opacity: 0.25,
  },
  image18: {
    left: 249,
  },
  image181: {
    left: 18,
  },
  image19: {
    left: 326,
  },
  telabusca1: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaBusca1;
