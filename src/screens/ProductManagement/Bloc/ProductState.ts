import { Product } from "@/core/domain/Product";

export abstract class ProductState {
}


export class LoadingState extends ProductState {
}

export class LoadMoreState extends ProductState {
}

export class LoadedState extends ProductState {
  constructor(readonly products: Product[] = []) {
    super();
  }
}

export class DefaultState extends LoadedState {
  constructor(products: Product[] = []) {
    super(products);
  }
}

export class ErrorState extends ProductState {
  constructor(readonly exception: Error) {
    super();
  }

  get message(): string {
    return this.exception.message ?? "Internal error";
  }
}
