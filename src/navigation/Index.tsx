/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from '../typings/route';
import Splash from '../screens/splash/Splash';
import Home from '../screens/home/Home';
import Details from '../screens/Recipe/Details';
import Favaourites from '../screens/favourites/Favaourites';
import Login from '../screens/login/Login';
import SignUp from '../screens/signUp/SignUp';
import useAuth from '../hooks/useAuth';
const Stack = createNativeStackNavigator<RootStackParams>();
// function RootStackParam() {
//   const {users} = useAuth();
//   if (users) {
//     return (
//       <Stack.Navigator
//         // initialRouteName="Splash"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Splash" component={Splash} />
//         {/* <Stack.Screen name="Login" component={Login} /> */}
//         {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Favourites" component={Favaourites} />
//         <Stack.Screen name="Details" component={Details} />
//       </Stack.Navigator>
//     );
//   } else {
//     return (
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         {/* <Stack.Screen name="Splash" component={Splash} /> */}
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         {/* <Stack.Screen name="Home" component={Home} /> */}
//         {/* <Stack.Screen name="Favourites" component={Favaourites} /> */}
//         {/* <Stack.Screen name="Details" component={Details} /> */}
//       </Stack.Navigator>
//     );
//   }
// }
const Routing = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Favourites" component={Favaourites} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default Routing;
