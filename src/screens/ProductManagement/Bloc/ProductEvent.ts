export abstract class ProductEvent {
  keyword: string;

  protected constructor(keyword: string) {
    this.keyword = keyword;
  }

  toString(): string {
    return `${this.constructor.name}(${this.keyword})`
  }
}

export class InitProducts extends ProductEvent {
  constructor(keyword: string) {
    super(keyword);
  }
}

export class LoadMoreProducts extends ProductEvent {
  constructor(keyword: string) {
    super(keyword);
  }
}


export class SearchProducts extends ProductEvent {
  constructor(keyword: string) {
    super(keyword);
  }
}
