<template>
  <v-app-bar scroll-behavior="collapse hide">
    <v-app-bar-nav-icon variant="text" @click="testAuth" ></v-app-bar-nav-icon>

    <v-toolbar-title>Название проекта</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" icon="mdi:mdi-magnify"></v-btn>

    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
  >
    <v-list>
      <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Хани"
          subtitle="Юзверь"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="(item, index) in navList" :prepend-icon="item.icon" :title="item.title" @click="$router.push({name: item.value})" :key="index" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {g} from "@/05-entities/global"
export default {
  name: "Header",
  data () {
    return {
      drawer: null,
      navList: [
        {
          icon:  "mdi-folder",
          title: 'Профиль',
          value: 'Characters'
        },
        {
          icon:  "mdi-folder",
          title: 'Пурсонажи',
          value: 'Characters'
        },
        {
          icon:  "mdi-folder",
          title: 'Гмштуки',
          value: 'Characters'
        },
      ],
    }
  },
  methods: {
    testAuth(){
      g.userStore().$patch((state) => {
        state.isAuthenticated = !state.isAuthenticated
      })
    }
  }
}
</script>

<style scoped>

</style>