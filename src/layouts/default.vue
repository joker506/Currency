<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <List />
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import List from '@/components/List'
export default {
  name: 'default',
  data: () => ({
    drawer: true
  }),
  components: {
    List
  }
}
</script>

<style lang="scss" scoped></style>
