import { ProductListingResponse } from "@/core/domain/response/ProductListingResponse";

export class ProductRepository {
  async getProducts(keyword: string, from: number, size: number): Promise<ProductListingResponse> {
    const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=${size}&skip=${from}`);
    const jsonObject: any = await response.json();
    return ProductListingResponse.fromObject(jsonObject);
  }
}
