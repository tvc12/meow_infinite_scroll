import { Bloc, DefaultBlocLogger } from "@/Bloc";
import { Product } from "@/core/domain/Product";
import {
  InitProducts,
  LoadMoreProducts,
  ProductEvent,
  SearchProducts
} from "@/screens/ProductManagement/Bloc/ProductEvent";
import {
  DefaultState,
  ErrorState,
  LoadedState,
  LoadingState,
  LoadMoreState,
  ProductState
} from "@/screens/ProductManagement/Bloc/ProductState";
import { ProductRepository } from "@/core/repository/ProductRepository";
import { ProductListingResponse } from "@/core/domain/response/ProductListingResponse";

export class ProductBloc extends Bloc<ProductEvent, ProductState> {
  private static PRODUCT_SIZE = 20;
  private products: Product[];
  private productRepository: ProductRepository;
  public canLoadMore: boolean;
  public isLoading: boolean;

  constructor(repository: ProductRepository) {
    super(new DefaultState(), new DefaultBlocLogger());
    this.products = [];
    this.productRepository = repository;
    this.canLoadMore = true;
    this.isLoading = false;
  }

  get nProducts(): number {
    return this.products.length;
  }

  get from(): number {
    return this.nProducts;
  }

  protected async *mapEventToState(
    event: ProductEvent
  ): AsyncGenerator<ProductState> {
    switch (event.constructor) {
      case InitProducts:
        yield* this.handleSearchProducts(new SearchProducts(event.keyword));
        break;
      case LoadMoreProducts:
        yield* this.handleLoadMoreProducts(event);
        break;
      case SearchProducts:
        yield* this.handleSearchProducts(event);
        break;
    }
  }

  private async *handleLoadMoreProducts(
    event: LoadMoreProducts
  ): AsyncGenerator<ProductState> {
    if (this.isLoading) {
      return;
    }
    try {
      this.isLoading = true;
      console.log("handleLoadMoreProducts");
      yield new LoadMoreState();
      const response: ProductListingResponse =
        await this.productRepository.getProducts(
          event.keyword,
          this.from,
          ProductBloc.PRODUCT_SIZE
        );
      this.products = this.products.concat(response.products);
      this.canLoadMore = this.nProducts < response.total;
      yield new LoadedState(this.products);
    } catch (ex) {
      yield new ErrorState(ex);
    } finally {
      this.isLoading = false;
    }
  }

  private async *handleSearchProducts(
    event: SearchProducts
  ): AsyncGenerator<ProductState> {
    if (this.isLoading) {
      return;
    }
    try {
      this.isLoading = true;
      console.log("searchProducts");
      yield new LoadingState();
      const response: ProductListingResponse =
        await this.productRepository.getProducts(
          event.keyword,
          0,
          ProductBloc.PRODUCT_SIZE
        );
      this.products = response.products;
      this.canLoadMore = this.nProducts < response.total;
      yield new LoadedState(this.products);
    } catch (ex) {
      yield new ErrorState(ex);
    } finally {
      this.isLoading = false;
    }
  }
}
