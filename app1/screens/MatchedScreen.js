import * as React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MatchedScreen = ({ route }) => {
    const navigation = useNavigation();

    const { userLogged, userProfile } = route.params;

    return (
        <View style={{ height: '100%', backgroundColor: '#c86701', paddingTop: 80}}>
            <View style={{ justifyContent: 'center', paddingLeft: 40, paddingRight: 40, paddingTop: 100 }}>
                <Image 
                    style={{
                        alignSelf:'center',
                        width: 208,
                        height: 120,
                        top: -30,
                        position: "absolute",
                    }} 
                    source={require("../assets/logoquadradogymbro-2.png")}
                />
            </View>

            <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 25, fontSize:20 }}>
                Você e {userProfile.nome} agora são GYMBRO'S
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>
                <Image
                    style={{ height: 160, width: 160, borderRadius: 80 }}
                    source={{ uri: userLogged.uriImg }}

                />
                <Image
                    style={{ height: 160, width: 160, borderRadius: 80 }}
                    source={{ uri: userProfile.uriImg }}

                />
            </View>

            <TouchableOpacity
                style={{ backgroundColor: '#ffffff', margin: 25, paddingLeft: 50, paddingRight: 50, paddingTop: 40, paddingBottom: 40, borderRadius: 1000, marginTop: 100, }}
                onPress={() => {
                    //navigation.goBack();
                    navigation.navigate("TelaChat", {userLogged});
                }}
            >
                <Text style={{ textAlign: 'center', fontSize:20 }}>
                    Mande uma mensagem
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default MatchedScreen;