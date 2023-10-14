<template>
  <div id="app">
    <ProductScreen></ProductScreen>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductScreen from "@/screens/ProductManagement/ProductScreen.vue";

@Component({
  components: { ProductScreen }
})
export default class App extends Vue {
}
</script>
