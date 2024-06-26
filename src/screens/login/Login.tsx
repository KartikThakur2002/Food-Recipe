/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {IMAGES} from '../../assets/Images';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../typings/route';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {Animated as RNAnimated} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/Firebase';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const rotateAnim = useRef(new RNAnimated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const startRotation = () => {
    rotateAnim.setValue(0);
    RNAnimated.loop(
      RNAnimated.timing(rotateAnim, {
        toValue: 1,
        duration: 25000,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    startRotation();
    return () => rotateAnim.stopAnimation();
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '3600deg'],
  });

  const handleSubmit = async () => {
    if (!email || !password) {
      // Check if the fields are empty and set an error message accordingly
      setError('Please enter your email and password.');
      return; // Exit the function early if validation fails
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home', {userEmail: email});
    } catch (err: any) {
      // Reset the error message first
      setError('');

      // Check the error code and set the custom message
      switch (err.code) {
        case 'auth/invalid-email':
          setError('The email address is badly formatted.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/user-disabled':
          setError('This user has been disabled.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid Credentials');
          break;
        default:
          setError('Failed to log in. Please try again later.');
      }
      console.log(err.message);
    }
  };

  return (
    <View className="flex-1 bg-amber-400">
      <StatusBar
        hidden={false}
        backgroundColor={'#fbbf24'}
        barStyle={'dark-content'}
      />
      <Animated.View
        entering={FadeInUp.delay(300).springify().damping(10)}
        className="flex-row justify-center px-10 pt-7">
        <RNAnimated.Image
          source={IMAGES.LoginLogo}
          style={{transform: [{rotate: rotation}]}}
        />
      </Animated.View>
      <ScrollView
        className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <Animated.View
          entering={FadeInDown.delay(200).springify().damping(10)}
          className="form space-y-2">
          <Text className="text-gray-700 ml-4 mb-2">Email Address :</Text>
          <CustomInput
            isRightIcon={true}
            rightIconName="mail"
            rightIconType="Feather"
            rightIconColor="gray"
            rightIconSize={20}
            inputStyle={{flex: 1, color: 'black', fontSize: 15}}
            mainContStyles={{
              backgroundColor: '#ECEEEC',
              paddingHorizontal: 20,
              borderRadius: 50,
            }}
            placeholder="Enter Email"
            placeholderTextColor="gray"
            value={email}
            onTextChange={value => setEmail(value)}
          />
          <Text className="text-gray-700 ml-4 mb-2 pt-3">Password :</Text>
          <CustomInput
            isRightIcon={true}
            rightIconName={!showPassword ? 'eye-off' : 'eye'}
            rightIconType="Feather"
            rightIconColor="gray"
            rightIconSize={20}
            rightIconOnPress={() => setShowPassword(!showPassword)}
            inputStyle={{flex: 1, color: 'black', fontSize: 15}}
            mainContStyles={{
              backgroundColor: '#ECEEEC',
              paddingHorizontal: 20,
              borderRadius: 50,
            }}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={showPassword}
            value={password}
            onTextChange={value => setPassword(value)}
          />
          <Text style={{color: 'red'}}>{error}</Text>
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3 bg-amber-400 rounded-xl">
            <Text className="font-extrabold text-gray-800 text-center">
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Text className="font-bold text-gray-700 text-center text-xl py-5">
          Or
        </Text>
        <Animated.View
          entering={FadeInDown.delay(300).springify().damping(10)}
          className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={IMAGES.Google}
              resizeMode="contain"
              className="w-9 h-9"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={IMAGES.Apple}
              resizeMode="contain"
              className="w-9 h-9"
            />
          </TouchableOpacity>
          <TouchableOpacity className=" p-2 bg-gray-100 rounded-2xl">
            <Image
              source={IMAGES.FaceBook}
              resizeMode="contain"
              className="w-9 h-9"
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(300).springify().damping(10)}
          className="flex-row justify-center mt-7">
          <Text className="text-gray-700 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-amber-500"> SignUp</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Login;
