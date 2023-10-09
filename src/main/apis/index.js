export const categories = [
  {
    id: 1,
    name: 'Fine dining',
    image: require('../assets/images/pizzaIcon.png'),
  },
  {
    id: 2,
    name: 'Casual',
    image: require('../assets/images/pizzaIcon.png'),
  },
  {
    id: 3,
    name: 'Fast food',
    image: require('../assets/images/pizzaIcon.png'),
  },
  {
    id: 4,
    name: 'Cafe',
    image: require('../assets/images/pizzaIcon.png'),
  },
  {
    id: 5,
    name: 'Drinks',
    image: require('../assets/images/pizzaIcon.png'),
  },
  {
    id: 6,
    name: 'Sweets',
    image: require('../assets/images/pizzaIcon.png'),
  },
];

export const rentals = [
  {
    id: 1,
    title: 'trọ ông bà',
    images: [],
    description: 'phòng trọ giá rẻ cho sinh viên,',
    address: 'Khu KCN Hoà Lạc ,Thạch Thất, Hà Nội',
    contactNumber: '012345678',
    contantName: 'ms G',
    policy: ['Cấm thú cưng ', 'Cấm hút thuốc', 'Đóng cửa lúc 10h'],
    rooms: [
      {
        id: 1,
        type: 'Single Room',
        size: 25,
        available: 10,
        bedCount: 1,
        maxOccupancy: 1,
        amenities: ['Sân phơi đồ', 'Nhà để xe', 'TV'],
        price: 8000000,
      },
      {
        id: 2,
        type: 'Double Room',
        size: 50,
        available: 10,
        bedCount: 2,
        maxOccupancy: 2,
        amenities: ['Wifi', 'Air Conditioning', 'TV'],
        price: 900000,
      },
    ],

    reviews: [
      {
        usersId: 1,
        reviewDate: '2023-09-07',
        rating: 5,
        reviewContent: 'thoáng mát sạch sẽ',
      },
      {
        usersId: 3,
        reviewDate: '2023-09-07',
        rating: 5,
        reviewContent: 'thoáng mát sạch sẽ',
      },
    ],
  },
  {
    id: 2,
    title: 'Nhà trọ Min House',
    images: [],
    description:
      'phòng trọ giá rẻ cho sinh viên, cách đại học fpt 10 phút đi bộ ',
    address: 'Thôn Phú hữu,  tân xã, thạch Thất',
    contactNumber: '012345678',
    contantName: 'ms H',
    policy: [],
    rooms: [
      {
        id: 3,
        type: 'Single Room',
        size: 25,
        available: 10,
        bedCount: 1,
        maxOccupancy: 1,
        amenities: ['Sân phơi đồ', 'Nhà để xe', 'TV'],
        price: 200000,
      },
      {
        id: 4,
        type: 'Double Room',
        size: 50,
        available: 10,
        bedCount: 2,
        maxOccupancy: 2,
        amenities: ['Wifi', 'Air Conditioning', 'TV'],
        price: 1200000,
      },
    ],

    reviews: [
      {
        usersId: 1,
        reviewDate: '2023-09-07',
        rating: 5,
        reviewContent: 'thoáng mát sạch sẽ',
      },
      {
        usersId: 3,
        reviewDate: '2023-09-07',
        rating: 5,
        reviewContent: 'thoáng mát sạch sẽ',
      },
    ],
  },
  {
    id: 3,
    title: 'Nhà trọ Tuấn Cường ',
    images: [],
    description: 'phòng trọ hiện đại ',
    address: 'Khu KCN Hoà Lạc ,Thạch Thất, Hà Nội',
    contactNumber: '012345678',
    contantName: 'mr B',
    policy: [],
    rooms: [
      {
        id: 5,
        type: 'Single Room',
        size: 25,
        available: 10,
        bedCount: 1,
        maxOccupancy: 1,
        amenities: ['Sân phơi đồ', 'Nhà để xe', 'TV'],
        price: 2500000,
      },
      {
        id: 6,
        type: 'Double Room',
        size: 50,
        available: 10,
        bedCount: 2,
        maxOccupancy: 2,
        amenities: ['Wifi', 'Air Conditioning', 'TV'],
        price: 900000,
      },
    ],

    reviews: [
      {
        usersId: 1,
        reviewDate: '2023-09-07',
        rating: 5,
        reviewContent: 'thoáng mát sạch sẽ',
      },
      {
        usersId: 3,
        reviewDate: '2023-09-07',
        rating: 4,
        reviewContent: 'thoáng mát sạch sẽ',
      },
    ],
  },
  {
    id: 4,
    title: 'Chung cư Phenikaa ',
    images: [],
    description: 'phòng trọ hiện đại gần trung tâm',
    address: 'Khu KCN Hoà Lạc ,Thạch Thất, Hà Nội',
    contactNumber: '012345678',
    contantName: 'mr A',
    policy: [],
    rooms: [
      {
        id: 7,
        type: 'Single Room',
        size: 25,
        available: 10,
        bedCount: 1,
        maxOccupancy: 1,
        amenities: ['Sân phơi đồ', 'Nhà để xe', 'TV'],
        price: 10000000,
      },
      {
        id: 8,
        type: 'Double Room',
        size: 50,
        available: 10,
        bedCount: 2,
        maxOccupancy: 2,
        amenities: ['Wifi', 'Air Conditioning', 'TV'],
        price: 1250000,
      },
    ],

    reviews: [
      {
        usersId: 1,
        reviewDate: '2023-09-07',
        rating: 4,
        reviewContent: 'thoáng mát sạch sẽ',
      },
      {
        usersId: 3,
        reviewDate: '2023-09-07',
        rating: 4,
        reviewContent: 'thoáng mát sạch sẽ',
      },
    ],
  },
];

export const featured = {
  id: 1,
  title: 'Hot and Spicy',
  description: 'soft and tender fried chicken',
  restaurants: [
    {
      id: 1,
      title: 'Nha hang chicken',
      image:
        'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Frestaurant1.jpg?alt=media&token=b2441291-b26a-452a-990d-21530d7a9d4f',
      description: 'chuyen phuc vu cac mon ga',
      lng: 105.518078841269,
      lat: 21.00726429072866,
      address: '434 second street',
      phone: '0123456789',
      rating: 4,
      category: 'Fast Food',
      dishes: [
        {
          id: 1,
          title: 'Pepperoni Pizzaaa',
          description:
            '1 1/2 cups (355 ml) warm water (105°F-115°F) 1 package (2 1/4 teaspoons) active dry yeast 3 3/4 cups (490g) bread flour 2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven) 2 teaspoons kosher salt 1 teaspoon sugar',
          price: 10000000,
          image:
            'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/49/37/71/caption.jpg?w=1200&h=700&s=1&cx=640&cy=426&chk=v1_a8a02a2598257f2aba66',
          optional: [{'Soy milk': '10.000', milo: '10.000'}],
        },
        {
          id: 2,
          title: 'Cơm tấm',
          description: 'com tam',
          price: 69,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
          optional: [{'Soy milk': '10.000', milo: '10.000'}],
        },
        {
          id: 3,
          title: 'Phở bò',
          description: 'phobo',
          price: 888,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fph%E1%BB%9F%20b%C3%B2%2Fphobo.jpg?alt=media&token=40add022-973b-490f-ad4c-bf6cce36aad3',
          optional: [{'Soy milk': '10.000', milo: '10.000'}],
        },
      ],
      reviews: [
        {
          usersId: 1,
          reviewDate: '2023-09-07',
          rating: 4,
          reviewContent: '',
        },
        {
          usersId: 3,
          reviewDate: '2023-09-07',
          rating: 4,
          reviewContent: 'thoáng mát sạch sẽ',
        },
      ],
    },
    {
      id: 2,
      title: 'pho thin',
      image:
        'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant2%2Frestaurant2.jpg?alt=media&token=33b8d2f6-4203-4b6a-9510-6168a2de0cb2',
      description: 'Hot and spicy pizzas',
      lng: 105.51806073635817,
      lat: 21.009634560266647,
      address: '1 main street',
      phone: '0123456789',
      rating: 4,
      category: 'Fine Dining',

      dishes: [
        {
          id: 1,
          title: 'pizza1',
          description: 'cheezy garlic pizza',
          price: 10,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
        },
        {
          id: 2,
          title: 'pizza',
          description: 'cheezy garlic pizza',
          price: 10,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
        },
        {
          id: 3,
          title: 'pizza',
          description: 'cheezy garlic pizza',
          price: 10,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
        },
      ],
      reviews: [
        {
          usersId: 1,
          reviewDate: '2023-09-07',
          rating: 4,
          reviewContent: '',
        },
        {
          usersId: 3,
          reviewDate: '2023-09-07',
          rating: 4,
          reviewContent: 'thoáng mát sạch sẽ',
        },
      ],
    },
    {
      id: 3,
      title: 'nha hang com tam hai san thit cho mam tom dau hu mi tom',
      image:
        'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant3%2Frestaurant3.jpg?alt=media&token=9af492bc-a302-42cc-8cd5-34c57f4d6eca',

      description: 'Hot and spicy pizzas',
      lng: 105.51816835999487,
      lat: 21.00899731733111,
      address: '434 second street',
      phone: '0123456789',
      rating: 4,
      category: 'Casual',
      dishes: [
        {
          id: 1,
          title: 'pizza',
          description: 'cheezy garlic pizza',
          price: 10,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
        },
        {
          id: 2,
          title: 'pizza',
          description: 'cheezy garlic pizza',
          price: 10,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
        },
        {
          id: 3,
          title: 'pizza',
          description: 'cheezy garlic pizza',
          price: 10,
          image:
            'https://firebasestorage.googleapis.com/v0/b/cocdoi-75bdb.appspot.com/o/restaurant1%2Fdishes%2Fcom%20tam%2Fcom%20tam.jpg?alt=media&token=cfcf4cd9-f335-461d-ba45-d1e53a3e8e71',
        },
      ],
      reviews: [
        {
          usersId: 1,
          reviewDate: '2023-09-07',
          rating: 4,
          reviewContent: '',
        },
        {
          usersId: 3,
          reviewDate: '2023-09-07',
          rating: 4,
          reviewContent: 'thoáng mát sạch sẽ',
        },
      ],
    },
  ],
};

export const orders = [
  {
    id: 1,
    sellerID: 1,
    FoodID: 'Pizza',
    quantity: 2,
  },
];
