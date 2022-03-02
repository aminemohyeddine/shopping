export interface ProductInterface {
  _id: string;
  id: number;
  title: string;
  details: string;
  imageUrl: string[];
  description: string;
  price: number;
  category: string;
  countInStock: number;
  qty: number;
  __v: number;
  comments: [
    {
      rating: number;
      _id: string;
      userName: string;
      description: string;
    }
  ];
}
