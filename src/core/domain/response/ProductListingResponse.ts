import { Product } from "@/core/domain/Product";

export class ProductListingResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;

  constructor(products: Product[], total: number, skip: number, limit: number) {
    this.products = products;
    this.total = total;
    this.skip = skip;
    this.limit = limit;
  }

  static fromObject(json: any): ProductListingResponse {
    const products = json.products.map((product: any) => Product.fromObject(product));
    return new ProductListingResponse(products, json.total, json.skip, json.limit);
  }
}
