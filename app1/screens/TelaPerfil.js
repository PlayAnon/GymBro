import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";
import { Api } from "../Api";

const TelaPerfil = ({route}) => {
  const navigation = useNavigation();

  let user = route.params.user;

  // Nome do usuario
  const [nome, setNome] = React.useState(user.nome);

  // Peso do usuario
  const [peso, setPeso] = React.useState(String(user.peso));

  // Altura do usuario
  const [altura, setAltura] = React.useState(String(user.altura));

  // Idade do usuario
  const [idade, setIdade] = React.useState(String(user.idade));

  // Objetivo do usuario
  const [objetivoP, setObjetivoP] = React.useState(String(user.objetivoP));

  // Descrição do usuario
  const [descricao, setDescricao] = React.useState(String(user.descricao));

  // Tempo de treino do usuario
  const [tempoTreino, setTempoTreino] = React.useState(String(user.tempoTreino));

  const verificaObjetivoPrincipal= ()=>{
    if(objetivoP==='E'){
      return 'Emagrecimento'
    }else{
      return 'Ganho de massa'
    }
  }

  const atualizaUsuario = ()=>{

    Api.patch(`/users/${user._id}`, {nome, peso, altura, idade, objetivoP, descricao, tempoTreino}).then(res =>{
      let user = res.data
      navigation.navigate("TelaPerfil1")
    }).catch(error =>{
      Alert.alert("Alerta", error.response.data.error);
    })   
  }

  return (
    <View style={styles.telaperfil}>
      <View style={styles.logoquadradogymbro2Wrapper}>
        <Image
          style={styles.logoquadradogymbro2Icon}
          resizeMode="cover"
          source={require("../assets/logoquadradogymbro-2.png")}
        />
      </View>
      <Text style={[styles.editarPerfil, styles.nomeClr]}>Editar Perfil</Text>
      <Pressable
        style={[styles.image31Parent, styles.parentFlexBox]}
        onPress={() => atualizaUsuario()}
      >
        <Image
          style={styles.image31Icon}
          resizeMode="cover"
          source={require("../assets/image-31.png")}
        />
        <Text style={styles.salvar}>Salvar</Text>
      </Pressable>
      <Image
        style={[styles.telaperfilChild, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.telaperfilItem, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.telaperfilInner, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.lineIcon, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <View style={styles.frameParent}>
        <View style={styles.nomeParent}>
          <Text style={[styles.nome, styles.nomeClr]}>Nome</Text>
          <TextInput style={[styles.nomeText, styles.mTypo]} placeholder={user.nome} value={nome} onChangeText={text => setNome(text)} onFocus={()=>setNome("")}/>
        </View>
        <View style={[styles.nomeParent, {top:-22}]}>
          <Text style={[styles.nome, styles.nomeClr]}>Peso</Text>
          <TextInput style={[styles.nomeText, styles.mTypo]} placeholder={String(user.peso)} keyboardType="decimal-pad" maxLength={4} value={peso} onChangeText={text => setPeso(text)} onFocus={()=>setPeso("")}/>
        </View>
        <View style={[styles.nomeParent, {top:-44}]}>
          <Text style={[styles.nome, styles.nomeClr]}>Altura</Text>
          <TextInput style={[styles.nomeText, styles.mTypo]} placeholder={String(user.altura)} keyboardType="decimal-pad" maxLength={4} value={altura} onChangeText={text => setAltura(text)} onFocus={()=>setAltura("")}/>
        </View>
        <View style={[styles.nomeParent, {top:-66}]}>
          <Text style={[styles.nome, styles.nomeClr]}>Idade</Text>
          <TextInput style={[styles.nomeText, styles.mTypo]} placeholder={String(user.idade)} keyboardType="numeric" maxLength={2} value={idade} onChangeText={text => setIdade(text)} onFocus={()=>setIdade("")}/>
        </View>
        <View style={styles.pesoParent}>
          <Text style={[styles.nome, styles.nomeClr]}>Tempo de treino</Text>
          <View style={[styles.mesesParent, styles.parentFlexBox]}>
            <Pressable
              onPress={()=>{setTempoTreino('0')}}
            >
              <Text style={tempoTreino==='0'?[styles.selectTxt, styles.anos1Typo]:[styles.notSelectTxt, styles.anos1Typo]}>0 meses</Text>
            </Pressable>
        
            <Pressable
              onPress={()=>{setTempoTreino('1')}}
            >
              <Text style={tempoTreino==='1'?[styles.selectTxt, styles.anos1Typo]:[styles.notSelectTxt, styles.anos1Typo]}>1-12 meses</Text>
            </Pressable>
            <Pressable
              onPress={()=>{setTempoTreino('2')}}
            >
              <Text style={tempoTreino==='2'?[styles.selectTxt, styles.anos1Typo]:[styles.notSelectTxt, styles.anos1Typo]}>1-2 anos</Text>
            </Pressable>
            <Pressable
              onPress={()=>{setTempoTreino('3')}}
            >
              <Text style={tempoTreino==='3'?[styles.selectTxt, styles.anos1Typo]:[styles.notSelectTxt, styles.anos1Typo]}>2-3 anos</Text>
            </Pressable>
            <Pressable
              onPress={()=>{setTempoTreino('4')}}
            >
              <Text style={tempoTreino==='4'?[styles.selectTxt, styles.anos1Typo]:[styles.notSelectTxt, styles.anos1Typo]}>+3 anos</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.pesoParent2}>
          <Text style={[styles.nome, styles.nomeClr]}>Objetivo</Text>
          <Text style={[styles.m, styles.mTypoSelect]}>{verificaObjetivoPrincipal()}</Text>
            {
              verificaObjetivoPrincipal() ==="Emagrecimento"
              ? 
                <Pressable
                  onPress={()=>{setObjetivoP('G')}}
                >
                  <Text style={[styles.mAux, styles.mTypo]}>Ganho de massa</Text>
                </Pressable>
              :
                <Pressable
                  onPress={()=>{setObjetivoP('E')}}
                >
                  <Text style={[styles.mAux, styles.mTypo]}>Emagrecimento</Text>
                </Pressable>
            }
           
          
          
        </View>
        <View style={styles.pesoParent3}>
          <Text style={[styles.nome, styles.nomeClr]}>Descrição</Text>
          <TextInput style={[styles.descricao, styles.mTypo]} placeholder={String(user.descricao)} value={descricao} onChangeText={text => setDescricao(text)} onFocus={()=>setDescricao("")}/>
        </View>
      </View>
      <Image
        style={[styles.telaperfilChild1, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.telaperfilChild2, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Image
        style={[styles.telaperfilChild3, styles.telaperfilChildLayout]}
        resizeMode="cover"
        source={require("../assets/line-1.png")}
      />
      <Pressable
        style={styles.image30}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/image-2.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  nomeClr: {
    color: Color.dimgray_200,
    textAlign: "left",
  },
  parentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  telaperfilChildLayout: {
    height: 2,
    width: '100%',
    position: "absolute",
  },
  mTypo: {
    fontSize: FontSize.size_lg,
    color: Color.darkslategray,
    fontFamily: FontFamily.interRegular,
  },
  mTypoSelect: {
    fontSize: FontSize.size_lg,
    color: Color.chocolate,
    fontFamily: FontFamily.interRegular,
  },
  anos1Typo: {
    marginLeft: 9,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
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
  editarPerfil: {
    top: 127,
    alignSelf:'center',
    fontSize: FontSize.size_7xl,
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: FontFamily.interExtraboldItalic,
    position: "absolute",
  },
  image31Icon: {
    width: 30,
    height: 30,
    opacity: 0.75,
  },
  salvar: {
    fontSize: FontSize.size_mid,
    color: Color.black,
    marginLeft: 10,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
  },
  image31Parent: {
    top: 680,
    alignSelf:'center',
    borderTopLeftRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    backgroundColor: Color.gainsboro_100,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: 140,
    height: 40,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    position: "absolute",
  },
  telaperfilChild: {
    top: 299,
  },
  telaperfilItem: {
    top: 240,
  },
  telaperfilInner: {
    top: 361,
  },
  lineIcon: {
    top: 420,
  },
  nome: {
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  nomeText: {
    top:-12,
    marginTop: 5,
    color: Color.darkslategray,
    textAlign: "left",
  },
  nomeParent: {
    justifyContent: "center",
  },
  kg: {
    marginTop: 7,
    color: Color.darkslategray,
    textAlign: "left",
  },
  pesoParent: {
    top:-91,

    justifyContent: "center",
  },
  pesoParent2: {
    top:-92,

    justifyContent: "center",
  },
  pesoParent3: {
    top:-89,

    justifyContent: "center",
  },
  descricao: {
    marginTop: -8,
    color: Color.darkslategray,
    textAlign: "left",
  },
  mAux: {
    marginTop: -24,
    left:150,
    color: Color.darkslategray,
    textAlign: "left",
  },
  meses: {
    fontSize: FontSize.size_sm,
    color: Color.darkslategray,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  notSelectTxt: {
    color: Color.darkslategray,
  },
  selectTxt: {
    color: Color.chocolate,
  },
  mesesParent: {
    marginTop: 5,
    justifyContent: "left",
  },
  frameParent: {
    top: 180,
    left: 13,
    justifyContent: "center",
    position: "absolute",
  },
  telaperfilChild1: {
    top: 475,
  },
  telaperfilChild2: {
    top: 534,
  },
  telaperfilChild3: {
    top: 591,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image30: {
    left: 8,
    top: 116,
    width: 34,
    height: 40,
    position: "absolute",
  },
  telaperfil: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaPerfil;
