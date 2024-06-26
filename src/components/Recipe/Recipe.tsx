/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from '../loading/Loading';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../typings/route';
import {useNavigation} from '@react-navigation/native';
import RecipeCard from './RecipeCard';
import {RecipeTypes} from '../../typings/indext';

interface RecipeProps {
  categories: string[];
  meals: RecipeTypes[];
}

const Recipe: React.FC<RecipeProps> = ({categories, meals}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Recipes</Text>
      <View style={{marginTop: 20}}>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" style={{marginTop: 40}} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={item => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headText: {
    color: '#454845',
    fontSize: hp(3),
    fontWeight: '600',
  },
});
