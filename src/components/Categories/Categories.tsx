/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {CatTypes} from '../../typings/indext';

const Categories = ({
  categories,
  activeCategory,
  handleChangeCategory,
}: any) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.Categoriescontnr}
        contentContainerStyle={{gap: 20, paddingEnd: 15}}>
        {categories.map((cat: CatTypes, index: number) => {
          let isActive = cat.strCategory === activeCategory;
          let activeClassButton = isActive ? '#F1B52F' : '#DFE0DD';
          return (
            <TouchableOpacity
              key={index}
              style={styles.touchable}
              onPress={() => handleChangeCategory(cat.strCategory)}>
              <View
                style={{
                  borderRadius: wp(10),
                  borderColor: '#ddd',
                  backgroundColor: activeClassButton,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  padding: 5,
                }}>
                <Image
                  source={{uri: cat.strCategoryThumb}}
                  style={styles.image}
                />
              </View>
              <Text style={{color: '#464946', fontSize: hp(1.6)}}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  Categoriescontnr: {},
  image: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(10),
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
});
