const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TelaInicial from "./screens/TelaInicial";
import TelaLogin from "./screens/TelaLogin";
import TelaCadastro1 from "./screens/TelaCadastro1";
import TelaCadastro3 from "./screens/TelaCadastro3";
import TelaCadastro2 from "./screens/TelaCadastro2";
import TelaCadastro4 from "./screens/TelaCadastro4";
import TelaCadastro6 from "./screens/TelaCadastro6";
import TelaCadastro5 from "./screens/TelaCadastro5";
import TelaCadastro7 from "./screens/TelaCadastro7";
import TelaHome from "./screens/TelaHome";
import TelaBusca1 from "./screens/TelaBusca1";
import MatchedScreen from "./screens/MatchedScreen";
import TelaDescricaoUsuario from "./screens/TelaDescricaoUsuario";
import TelaPerfil from "./screens/TelaPerfil";
import TelaPerfil1 from "./screens/TelaPerfil1";
import TelaLogout from "./screens/TelaLogout";
import TelaInfo1 from "./screens/TelaInfo1";
import TelaChat2 from "./screens/TelaChat2";
import TelaChat from "./screens/TelaChat";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="TelaInicial"
              component={TelaInicial}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaLogin"
              component={TelaLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro1"
              component={TelaCadastro1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro3"
              component={TelaCadastro3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro2"
              component={TelaCadastro2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro4"
              component={TelaCadastro4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro6"
              component={TelaCadastro6}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro5"
              component={TelaCadastro5}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaCadastro7"
              component={TelaCadastro7}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaHome"
              component={TelaHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaBusca1"
              component={TelaBusca1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MatchedScreen"
              component={MatchedScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaDescricaoUsuario"
              component={TelaDescricaoUsuario}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaPerfil"
              component={TelaPerfil}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaPerfil1"
              component={TelaPerfil1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaLogout"
              component={TelaLogout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaInfo1"
              component={TelaInfo1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaChat2"
              component={TelaChat2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaChat"
              component={TelaChat}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
