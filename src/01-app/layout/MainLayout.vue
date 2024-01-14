<template>
    <Header/>
    <v-main>
      <v-container>
      <router-view />
      </v-container>
    </v-main>
    <Footer />
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "MainLayout",
  components: {Footer, Header}
}
</script>

<style scoped>

</style>