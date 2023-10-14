<template>
  <div class="product-listing-panel" ref="panel">
    <template v-for="product in products">
      <div :key="product.id" class="product-item">
        <div class="product-item--header">
          <img :src="product.thumbnail" alt=""/>
        </div>
        <div class="product-item--body">
          <div class="product-item--body--title">
            {{ product.title }}
          </div>
          <div class="product-item--body--description">
            {{ product.description }}
          </div>
          <div class="product-item--body--price">
            {{ product.price }}$
          </div>
        </div>
      </div>
    </template>
    <template v-if="products.length === 0">
      <div class="product-item">
        <div class="product-item--body">
          <div class="product-item--body--title">
            No product found
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Prop, Ref, Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { Product } from "@/core/domain/Product";

@Component
export default class ProductListing extends Vue {

  @Prop({ required: true, type: Array })
  private readonly products!: Product[];

  @Ref()
  private readonly panel!: HTMLElement;


  mounted(): void {
    this.panel.addEventListener("scroll", this.handleScroll);
  }

  beforeDestroy(): void {
    this.panel.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll(): void {
    const panel = this.panel;
    const positionInPer: number = (panel.scrollHeight - panel.scrollTop) / panel.clientHeight;
    if (positionInPer > 0.7) {
      this.$emit("onLoadMore");
    }
  }

}
</script>

<style lang="scss">
.product-listing-panel {
  overflow: scroll;
  //background: red;
  width: 100%;
  height: 100%;

  .product-item {
    height: 120px;
    display: flex;
    flex-direction: row;

    margin: 16px;

    &--header {
      width: 240px;
      background: #f5f5f5;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      //height: 60px;
      //background: blue;
      & img {
        border-radius: 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &--body {
      flex: 1;
      padding: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      //background: green;

      &--title {
        font-size: 16px;
        font-weight: bold;
      }

      &--description {
        font-size: 14px;
      }

      &--price {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
