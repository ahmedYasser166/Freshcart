export interface Order {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    cartItems: {
      count: number;
      price: number;
      product: {
        _id: string;
        title: string;
        imageCover: string;
        ratingsAverage: number;
        ratingsQuantity: number;
        brand: {
          _id: string;
          name: string;
          image: string;
        };
        category: {
          _id: string;
          name: string;
          image: string;
        };
      };
    }[];
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    shippingAddress: {
      city: string;
      details: string;
      phone: string;
    };
    createdAt: string;
  }
  