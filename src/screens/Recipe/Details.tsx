/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../typings/route';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/Icon/Icon';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import {Text} from 'react-native';
import {ClockIcon, FireIcon} from 'react-native-heroicons/outline';
import {Square3Stack3DIcon, UsersIcon} from 'react-native-heroicons/solid';
import YoutubeIframe from 'react-native-youtube-iframe';
import {Meal, MealApiResponse, RecipeTypes} from '../../typings/indext'; // Import the types
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {addToFav} from '../../redux/slices/FavSlice';
import Snackbar from 'react-native-snackbar';
import {CachedImage} from '../../helpers/image';

type DetailsProps = NativeStackScreenProps<RootStackParams, 'Details'>;

const Details: React.FC<DetailsProps> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {item} = route.params;
  // const [isFav, setIsFav] = useState(false);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favItems = useSelector((state: RootState) => state.fav);
  const isFavorite = favItems.some(favItem => favItem.idMeal === item.idMeal);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id: string) => {
    try {
      const response = await axios.get<MealApiResponse>(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      if (response.data.meals && response.data.meals.length > 0) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error fetching recipes: ', err.message);
    }
  };

  const ingredientsIndexes = (meal: Meal | null) => {
    if (!meal) {
      return [];
    } else {
      let indexes = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}` as keyof Meal]) {
          indexes.push(i);
        }
      }
      return indexes;
    }
  };

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  const handleAddToFav = (item: RecipeTypes) => {
    const isAlreadyAdded = favItems.some(
      favItem => favItem.idMeal === item.idMeal,
    );
    if (!isAlreadyAdded) {
      dispatch(addToFav(item));
      Snackbar.show({
        text: 'Added to favorites',
        textColor: '#fff',
      });
    } else {
      Snackbar.show({
        text: 'Item Already Added',
        textColor: 'red',
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: meal?.strYoutube ? 5 : 20,
        alignItems: 'center',
      }}>
      <View style={styles.content}>
        <Animated.Image
          source={{uri: item.strMealThumb}}
          style={styles.image}
          sharedTransitionTag={item.strMealThumb}
        />
        {/* <CachedImage
          // uri={item.strMealThumb}
          source={{uri: item.strMealThumb}}
          style={styles.image}
          sharedTransitionTag={item.strMealThumb}
        /> */}
      </View>
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={styles.icons}>
        <TouchableOpacity
          style={{backgroundColor: '#FFFFFF', borderRadius: 30}}>
          <CustomIcon
            name="keyboard-arrow-left"
            type="MaterialIcons"
            size={50}
            color="#E7B842"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            padding: 15,
          }}
          onPress={() => handleAddToFav(item)}>
          <CustomIcon
            name="heart"
            type="AntIcons"
            size={20}
            color={isFavorite ? '#E7B842' : 'gray'}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {loading ? (
        <Loading size="large" style={{marginTop: 40}} />
      ) : (
        <View
          style={{
            paddingTop: 20,
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            style={{
              columnGap: 10,
              alignItems: 'flex-start',
              gap: 8,
            }}>
            <Text
              style={{
                color: '#383B38',
                fontWeight: 'bold',
                fontSize: hp(3),
              }}>
              {meal?.strMeal}
            </Text>
            <Text
              style={{
                color: '#626562',
                fontWeight: 'bold',
                fontSize: hp(2),
              }}>
              {meal?.strArea}
            </Text>
          </Animated.View>

          {/* miscellaneous */}
          <Animated.View
            entering={FadeInDown.delay(150)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around mt-4">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  35
                </Text>
                <Text
                  style={{fontSize: hp(1.5)}}
                  className="font-bold text-neutral-700">
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  03
                </Text>
                <Text
                  style={{fontSize: hp(1.5)}}
                  className="font-bold text-neutral-700">
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  103
                </Text>
                <Text
                  style={{fontSize: hp(1.5)}}
                  className="font-bold text-neutral-700">
                  Cal
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex items-center justify-center">
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={'#525252'}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{fontSize: hp(1.5)}}
                  className="font-bold text-neutral-700 pt-3">
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>
          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4 mt-4">
            <Text
              style={{fontSize: hp(2.5), fontWeight: 'bold', color: '#383B38'}}>
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map(i => (
                <View key={i} className="flex-row space-x-4">
                  <View
                    style={{height: hp(1.5), width: wp(3)}}
                    className="bg-amber-300 rounded-full"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      className="font-extrabold text-neutral-700"
                      style={{color: 'black', fontSize: hp(1.7)}}>
                      {meal[`strMeasure${i}` as keyof Meal]}
                    </Text>
                    <Text
                      className="font-medium text-neutral-600"
                      style={{color: 'black', fontSize: hp(1.7)}}>
                      {meal[`strIngredient${i}` as keyof Meal]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
          {/* instructions */}
          <Animated.View
            entering={FadeInDown.delay(450)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-2 mt-2">
            <Text
              style={{fontSize: hp(2.5), fontWeight: 'bold', color: '#383B38'}}>
              Instructions
            </Text>
            <Text style={{fontSize: hp(1.5)}} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe Video */}
          {meal?.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(600)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-2 mt-2">
              <Text
                style={{
                  fontSize: hp(2.5),
                  fontWeight: 'bold',
                  color: '#383B38',
                }}>
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube) || ''}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  content: {},
  image: {
    height: hp(50),
    width: wp('97%'),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  icons: {
    position: 'absolute',
    flexDirection: 'row',
    paddingVertical: 15,
    flex: 1,
    gap: 250,
    marginLeft: 25,
  },
});
