<template>
  <div class="product-screen">
    <div class="product-screen--header">
      <div style="margin-right: 4px">Search </div>
      <input type="text" v-model="keyword" placeholder="Product name..." @keydown.enter="onKeywordChanged" />
    </div>
    <div class="product-screen--listing">
      <VueBloc :bloc="productBloc" :renderWhen="isLoadedState" class="bloc">
        <template #default="{ state }">
          <ProductListing
            :products="state.products"
            @onLoadMore="handleLoadMore"
          />
        </template>
      </VueBloc>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ProductBloc } from "@/screens/ProductManagement/Bloc/ProductBloc";
import ProductListing from "@/screens/ProductManagement/Components/ProductListing.vue";
import { ProductRepository } from "@/core/repository/ProductRepository";
import { LoadedState, ProductState } from "@/screens/ProductManagement/Bloc/ProductState";
import { InitProducts, LoadMoreProducts, SearchProducts } from "@/screens/ProductManagement/Bloc/ProductEvent";
import { DeboundAction } from "@/core/misc/annotation/DeboundAction";
import { AtomicAction } from "@/core/misc/annotation";

@Component({
  components: { ProductListing }
})
export default class ProductScreen extends Vue {

  protected productBloc = new ProductBloc(new ProductRepository());


  protected keyword = "";

  @DeboundAction(300)
  @Watch("keyword")
  protected onKeywordChanged(): void {
    console.log(`keyword changed, ${this.keyword}}`);
    this.productBloc.add(new SearchProducts(this.keyword));
  }

  mounted(): void {
    this.productBloc.add(new InitProducts(this.keyword));
  }

  handleLoadMore(): void {
    if (!this.productBloc.isLoading && this.productBloc.canLoadMore) {
      this.productBloc.add(new LoadMoreProducts(this.keyword));
    }
  }

  protected isLoadedState(state: ProductState): boolean {
    return state instanceof LoadedState;
  }
}
</script>

<style lang="scss">
.product-screen {
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  .product-screen--header {
    display: flex;
  }

  .product-screen--listing {
    flex: 1;
    overflow: hidden;
  }
}
</style>
