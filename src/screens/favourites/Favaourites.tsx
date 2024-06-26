/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../typings/route';
import CustomIcon from '../../components/Icon/Icon';
import Snackbar from 'react-native-snackbar';
import {removeFromFav} from '../../redux/slices/FavSlice';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

const Favaourites = () => {
  const favItems = useSelector((state: RootState) => state.fav);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const handleRemoveToFav = (idMeal: string) => {
    dispatch(removeFromFav(idMeal));
    Snackbar.show({
      text: 'Item Removed',
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInUp.delay(100).springify().damping(5)}
        style={styles.headContainer}>
        <CustomIcon
          name="arrowleft"
          type="AntIcons"
          size={30}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Favourites</Text>
      </Animated.View>
      {favItems.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            borderWidth: 0,
            borderColor: 'white',
            width: '100%',
          }}>
          {favItems.map((item, index) => (
            <Animated.View
              entering={FadeInDown.delay(100 * index)
                .springify()
                .damping(5)}
              key={item.idMeal}
              style={styles.infoContainer}>
              <Image source={{uri: item.strMealThumb}} style={styles.image} />
              <View style={styles.detailContainer}>
                <Text style={styles.text}>
                  {item.strMeal.length > 20
                    ? item.strMeal.slice(0, 20) + '...'
                    : item.strMeal}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', flex: 1, marginRight: 10}}>
                <CustomIcon
                  type="MaterialCommunityIcons"
                  name="heart-broken"
                  size={20}
                  onPress={() => handleRemoveToFav(item.idMeal)}
                />
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      ) : (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={{fontSize: 50, fontFamily: 'cursive'}}>
            No Data Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favaourites;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 20,
    flex: 1,
    gap: 20,
    alignItems: 'center',
  },
  headContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    borderRadius: 20,
    backgroundColor: '#F7B527',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'cursive',
    color: 'black',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 20,
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    margin: 10,
    // Elevation for Android
    elevation: 5,
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  detailContainer: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
});
