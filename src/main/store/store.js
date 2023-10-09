import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {MMKVStorage} from './mmkv';

export const useRentalStore = create(set => ({
  selectedFilter: null,
  setSelectedFilter: filterId => set(() => ({selectedFilter: filterId})),
}));

export const useRestaurantStore = create(
  persist(
    (set, get) => ({
      restaurantData: null, // data from firestore
      setRestaurantData: restaurantData => set({restaurantData}),
    }),
    {
      name: 'restaurantData-store',
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
);

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // user authentication from fb authen
      userInfo: null, // user info from firestore
      login: user => set({user}),
      setUserInfo: userInfo => set({userInfo}),
      logout: () => set({user: null, role: null}),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
);

export const useBasketStore = create(set => ({
  basket: [],
  total: 0,
  addToBasket: (dish, quantity) => {
    set(state => ({
      basket: [...state.basket, {dish, quantity}],
    }));
    set(state => ({
      total: state.basket.reduce(
        (acc, item) => acc + item.dish.price * item.quantity,
        0,
      ),
    }));
  },
  updateBasketItem: (dish, quantity) => {
    set(state => ({
      basket: state.basket.map(item =>
        item.dish.id === dish.id ? {...item, quantity} : item,
      ),
    }));
    set(state => ({
      total: state.basket.reduce(
        (acc, item) => acc + item.dish.price * item.quantity,
        0,
      ),
    }));
  },

  removeFromBasket: dish => {
    set(state => ({
      basket: state.basket.filter(item => item.dish.id !== dish.id),
    }));
    set(state => ({
      total: state.basket.reduce(
        (acc, item) => acc + item.dish.price * item.quantity,
        0,
      ),
    }));
  },

  clearBasket: () => {
    set({basket: []}, {total: 0});
  },
}));

export const useLocationStore = create(
  persist(
    (set, get) => ({
      latitude: null,
      longitude: null,
      setLocation: (latitude, longitude) => set({latitude, longitude}),
    }),
    {
      name: 'location-store',
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
);
