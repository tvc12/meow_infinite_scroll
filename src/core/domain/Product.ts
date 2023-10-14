export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  constructor(props: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.price = props.price;
    this.discountPercentage = props.discountPercentage;
    this.rating = props.rating;
    this.stock = props.stock;
    this.brand = props.brand;
    this.category = props.category;
    this.thumbnail = props.thumbnail;
    this.images = props.images;
  }

  static fromObject(json: any): Product {
    return new Product(json);
  }
}
