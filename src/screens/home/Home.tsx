/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import CustomIcon from '../../components/Icon/Icon';
import {IMAGES} from '../../assets/Images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomInput from '../../components/CustomInput/CustomInput';
import Categories from '../../components/Categories/Categories';
import {getCategories} from '../../components/Apis/Api';
import Recipe from '../../components/Recipe/Recipe';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../typings/route';
import {signOut} from 'firebase/auth';
import {auth} from '../../config/Firebase';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);

  const favItems = useSelector((state: RootState) => state.fav);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const route = useRoute();
  const userEmail = route.params?.userEmail;

  const extractUsernameFromEmail = userEmail => {
    return userEmail.split('@', 1);
  };
  useEffect(() => {
    fetchCategories();
    getRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredMeal = meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredMeals(filteredMeal);
    } else {
      setFilteredMeals(meals); // This resets to show all meals when search term is cleared
    }
  }, [searchTerm, meals]);

  const handleChangeCategory = (category: any) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch ({err}: any) {
      console.log('error: ', err.message);
    }
  };

  const getRecipes = async (category = 'Beef', search = '') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      if (response && response.data) {
        const filteredMeals = response.data.meals.filter(
          (meal: {strMeal: string}) =>
            meal.strMeal.toLowerCase().includes(search.toLowerCase()),
        );
        setMeals(filteredMeals);
      }
    } catch (err) {
      console.error('Error fetching recipes: ', err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 14}}>
        {/* avatar and bell Icon */}
        <View style={styles.headcontainer}>
          <View style={{flex: 1}}>
            <Image source={IMAGES.avatar} style={styles.image} />
          </View>
          <View className="flex-row gap-2">
            <CustomIcon
              type="FontAwesome"
              name="heart-o"
              color={favItems.length > 0 ? '#F7B527' : 'gray'}
              onPress={() => navigation.navigate('Favourites')}
            />
            <CustomIcon
              type="MaterialIcons"
              name="logout"
              color="red"
              onPress={handleLogout}
            />
          </View>
        </View>
        {/* greetings and punchlines */}
        <View>
          <Text style={{fontSize: hp(1.6), color: 'black'}}>
            Hello, {extractUsernameFromEmail(userEmail)} !
          </Text>
          <Text style={{fontSize: hp(4), color: 'black', fontWeight: '500'}}>
            Make your own food,
          </Text>
          <Text style={{fontSize: hp(4), color: 'black', fontWeight: '500'}}>
            stay at <Text style={{color: '#F7B527'}}>home</Text>
          </Text>
        </View>
        {/* search bar */}
        <View>
          <CustomInput
            isRightIcon={true}
            rightIconName="search-outline"
            rightIconType="Ionicons"
            rightIconColor="gray"
            rightIconSize={20}
            inputStyle={{flex: 1, color: 'black', fontSize: 15}}
            mainContStyles={{
              backgroundColor: '#ECEEEC',
              width: '98%',
              paddingHorizontal: 20,
              borderRadius: 50,
              marginVertical: 30,
            }}
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            onTextChange={setSearchTerm}
          />
        </View>
        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        <View>
          {filteredMeals.length > 0 ? (
            <Recipe categories={categories} meals={filteredMeals} />
          ) : searchTerm !== '' ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginTop: 20,
                color: 'gray',
              }}>
              No recipes found for "{searchTerm}"
            </Text>
          ) : (
            <Recipe categories={categories} meals={meals} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
