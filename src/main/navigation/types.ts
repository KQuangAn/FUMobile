import type {Timestamp} from 'firebase/firestore';

interface Dish {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  active: boolean;
  optional: {[key: string]: string};
}

interface Review {
  usersId: number;
  reviewDate: Timestamp;
  rating: number;
  reviewContent: string;
}

export type RestaurantProps = {
  id: string;
  title: string;
  image: string[];
  category: string;
  address: string;
  phone: string;
  description: string;
  dishes: Dish[];
  reviews: Review[];
  lat: string;
  lng: string;
  rating: number;
  numberOfReviews: number;
  active: boolean;
};

export type HomeStackParams = {
  Restaurant: undefined;
  RestaurantDishes: {
    restaurantData: RestaurantProps;
    distance: number | undefined;
  };
  DishDetail: {
    dishes: string[];
  };
};
