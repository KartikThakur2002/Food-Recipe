/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './style';
import {IMAGES} from '../../assets/Images';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../typings/route';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    StatusBar.setBackgroundColor('#F3920B');
    StatusBar.setBarStyle('light-content');

    ring1padding.value = 0;
    ring2padding.value = 0;

    const ring1Timeout = setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + 20)),
      100,
    );
    const ring2Timeout = setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + 60)),
      300,
    );
    const navigationTimeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => {
      clearTimeout(ring1Timeout);
      clearTimeout(ring2Timeout);
      clearTimeout(navigationTimeout);
    };
  }, [navigation, ring1padding, ring2padding]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Animated.View
          style={{
            backgroundColor: '#F5A632',
            padding: ring2padding,
            borderRadius: 190,
            marginBottom: 10,
          }}>
          <Animated.View
            style={{
              backgroundColor: '#F5B856',
              padding: ring1padding,
              borderRadius: 150,
            }}>
            <Image source={IMAGES.Splash} style={styles.image} />
          </Animated.View>
        </Animated.View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Foody</Text>
          <Text style={styles.text2}>Food is always right!</Text>
        </View>
      </View>
    </View>
  );
};

export default Splash;
