import {RecipeTypes} from './indext';
export type RootStackParams = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: {userEmail: string};
  Details: {item: RecipeTypes};
  Favourites: undefined;
};
