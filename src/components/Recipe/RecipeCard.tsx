/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../typings/route';
import {RecipeTypes} from '../../typings/indext';
import {CachedImage} from '../../helpers/image';

interface RecipeCardProps {
  item: RecipeTypes;
  index: number;
  navigation: NativeStackNavigationProp<RootStackParams>;
}

const RecipeCard: React.FC<RecipeCardProps> = ({item, index, navigation}) => {
  let isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          marginBottom: 10,
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={() => navigation.navigate('Details', {item})}>
        <Animated.Image
          source={{uri: item.strMealThumb}}
          sharedTransitionTag={item.strMealThumb}
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(25) : hp(35),
            backgroundColor: '#D6D8D5',
            borderRadius: 40,
          }}
        />
        <Text style={styles.description}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  description: {
    fontWeight: '600',
    color: '#40403E',
  },
});
