<template>
  <v-footer
      class="bg-indigo-lighten-1 text-center footer"
  >
    <v-row class="footer__nav" justify="center" no-gutters>
    <div>
      Модное описание правил {{ new Date().getFullYear() }} — <strong>Buer</strong>
    </div>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style lang="scss">
.footer {
  padding: 12px 0 24px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px !important;
  max-height: 80px;
  /*background: var(--white);
  border-top: 1px solid var(--gray2);*/
  z-index: 3;

  &__nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    grid-gap: 20px;
  }
}
</style>