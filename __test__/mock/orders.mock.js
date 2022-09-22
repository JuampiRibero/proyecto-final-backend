const response = [
  {
    _id: "61db6550cf5bfea9e7cdf858mock1",
    productsOnCart: [
      {
        product: {
          id: "6144c8bc5dd28c2628026a33mock1",
          title: "Producto 1 mock",
          price: 100,
          thumbnail:
            "Imagen producto 2 mock",
          timestamp: "21/09/2022",
          description: "Descripción de producto 1 mock",
          category: "Producto 1",
          code: "123456789",
          stock: 10,
          __v: 0,
        },
        quantity: 1,
        _id: "61db6550cf5bfea9e7cdf859mock1"
      },
    ],
    orderNumber: 1,
    timestamp: "2022-09-21",
    state: "generated",
    email: "jp@mock.com",
    __v: 0,
  },

  {
    _id: "61db6550cf5bfea9e7cdf858mock2",
    productsOnCart: [
      {
        product: {
          id: "6144c8bc5dd28c2628026a33mock2",
          title: "Producto 2 mock",
          price: 200,
          thumbnail:
            "Imagen producto 2 mock",
          timestamp: "21/09/2022",
          description: "Descripción de Producto 2 mock",
          category: "Producto 2",
          code: "987654321",
          stock: 20,
          __v: 0,
        },
        quantity: 1,
        _id: "61db6550cf5bfea9e7cdf859mock2"
      },
    ],
    orderNumber: 2,
    timestamp: "2022-09-21",
    state: "generated",
    email: "jp@mock.com",
    __v: 0,
  },
];
module.exports = response;
