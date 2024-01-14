<template>
  <div>
    <v-select
        :items="items"
        density="comfortable"
        label="Выбрать персонажа"
    ></v-select>
  </div>
  <v-card>
    <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
    >
      <v-tab v-for="(item, index) in navList" :value="item.value" :key="index">{{item.title}}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
          v-for="n in 3"
          :key="n"
          :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
                v-for="i in 6"
                :key="i"
                cols="12"
                md="4"
            >
              <v-img
                  :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                  aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
export default {
  name: "Character",
  data: () => ({
    tab: null,
    items: ['Снайперша', 'Буба', 'Фортуна', 'Кролик'],
    navList: [
      {
        title: 'Профиль',
        value: '1',
      },
      {
        title: 'Навыки',
        value: '2',
      },
      {
        title: 'Настройки',
        value: '3',
      },
    ]
  }),
}
</script>

<style scoped>

</style>