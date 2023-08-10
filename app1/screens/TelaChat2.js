import * as React from "react";
import { Image, StyleSheet, View, Pressable, Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import SenderMessage from "../componentes/senderMessage";
import ReceiverMessage from "../componentes/receiverMessage";
import { Api } from "../Api";
import { useCookies } from "react-cookie";
import {io} from "socket.io-client";

const TelaChat2 = ({ route }) => {
  const navigation = useNavigation();

  const { userSwiped } = route.params;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [socket, setSocket] = React.useState(null);

  const flatListRef = React.useRef();

  React.useEffect(() => {
    Api.get(`/matches/getMessages/${cookies.UserId}/${userSwiped._id}`).then(res => {
      setMessages(res.data);
      flatListRef.current?.scrollToEnd();
    }).catch((err)=>{console.log(err)})
  }, []);

  React.useEffect(() => {
    const socketIo = io("http://192.168.1.106:3000", {transports:["websocket"]});
    setSocket(socketIo);
    
    return () => {
      socketIo.disconnect();
    };
  }, []);


  React.useEffect(() => {
    if(socket) {
      socket.emit('register', cookies.UserId);

      socket.on("receiveMessage", data => {
        setMessages(data);

        Api.get(`/matches/getMessages/${cookies.UserId}/${userSwiped._id}`).then(res => {
          setMessages(res.data);
          flatListRef.current?.scrollToEnd();
        }).catch((err)=>{console.log(err)})

      });
    }
  }, [socket]);

  

  const sendMessage = () => {
    // Enviar uma mensagem privada
    socket.emit('privateMessage', { sender: cookies.UserId, receiver: userSwiped._id, message: input });
    setInput('');
    Api.get(`/matches/getMessages/${cookies.UserId}/${userSwiped._id}`).then(res => {
      setMessages(res.data);
      flatListRef.current?.scrollToEnd();
      
    }).catch((err)=>{console.log(err)})
  
  };

  return (
    <SafeAreaView style={styles.telachat2}>
      <View style={{flex:1, maxHeight:150}}>
        <View
          style={[
            styles.logoquadradogymbro2Wrapper,
            styles.telachat2ChildPosition,
          ]}
        >
          <Image
            style={styles.logoquadradogymbro2Icon}
            resizeMode="cover"
            source={require("../assets/logoquadradogymbro-2.png")}
          />
        </View>
        <Pressable
          style={styles.image18}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/image-2.png")}
          />
        </Pressable>

        <View style={[styles.image18Parent, styles.parentFlexBox]}>
          <Text style={[styles.nomeUsuario]}>
            {userSwiped.nome}
          </Text>
        </View>

      </View>


      <View style={{flex:1}}>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={10}
        >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              ref={flatListRef}
              style={{ paddingLeft: 4, }}
              keyExtractor={item => item.timestamp}
              renderItem={({ item: message }) =>
                message.sender === cookies.UserId ? (
                  <SenderMessage key={message.timestamp} message={message} />
                ) : (
                  <ReceiverMessage key={message.timestamp} message={message} userSwiped={userSwiped} />
                )
              }
            />
          </TouchableWithoutFeedback>


          <View
            style={{
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingLeft: 20, paddingRight: 25,
              paddingTop: 5, paddingBottom: 5, backgroundColor: '#ffffff'
            }}
          >
            <TextInput
              style={{ height: 50, fontSize: 18 }}
              placeholder="Digite sua mensagem..."
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Button onPress={sendMessage} title="Enviar" color="#c86701" />
          </View>
        </KeyboardAvoidingView>

      </View>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  telachat2ChildPosition: {
    width: '100%',
    left: 0,
    position: "absolute",
  },
  image28IconLayout: {
    height: 25,
    position: "absolute",
  },
  parentFlexBox: {
    justifyContent: "center",
    position: "absolute",
  },
  oiTudoBemTypo: {
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
  },
  pmTypo: {
    textAlign: "right",
    color: Color.dimgray_100,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
  },
  parentBorder: {
    backgroundColor: Color.sandybrown,
    borderBottomLeftRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: Padding.p_3xs,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
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
  icon: {
    height: "100%",
    width: "100%",
  },
  image18: {
    left: 8,
    top: 116,
    width: 34,
    height: 40,
    position: "absolute",
  },
  telachat2Child: {
    top: 735,
    height: 46,
  },
  image27Icon: {
    bottom: 6,
    left: 329,
    width: 39,
    height: 39,
    position: "absolute",
  },
  escrevaUmaMensagem: {
    color: "#a7a1a1",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_2xl,
    left: 0,
    top: 0,
    position: "absolute",
  },
  escrevaUmaMensagemWrapper: {
    bottom: 15,
    left: 78,
    width: 110,
    overflow: "hidden",
  },
  image28Icon: {
    bottom: 12,
    left: 300,
    width: 25,
  },
  image29Icon: {
    bottom: 15,
    left: 13,
    width: 22,
    height: 22,
    position: "absolute",
  },
  oiTudoBem: {
    fontSize: FontSize.size_2xl,
    color: Color.black,
  },
  oiTudoBemParent: {
    top: 233,
    width: 162,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: Padding.p_3xs,
    height: 56,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: Color.gainsboro_100,
    borderBottomRightRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    left: 27,
  },
  boraSimManoParent: {
    top: 499,
    width: 166,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: Padding.p_3xs,
    height: 56,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: Color.gainsboro_100,
    borderBottomRightRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    left: 27,
  },
  pm2: {
    display: "none",
  },
  boraTreinarAmanhaParent: {
    marginTop: 11,
  },
  frameParent: {
    top: 313,
    left: 128,
    width: 216,
    height: 162,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  image18Icon: {
    borderRadius: Border.br_981xl,
    width: 50,
    height: 50,
  },
  nomeUsuario: {
    fontSize: 20,
    top: 0,
    left: 15,
    alignSelf: 'center',
    bottom: 12
  },
  image18Parent: {
    top: 120,
    left: 50,
    borderRadius: Border.br_3xs,
    flexDirection: "row",
  },
  telachat2: {
    backgroundColor: Color.whitesmoke,
    flex: 1,
    height: '100%',
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaChat2;
