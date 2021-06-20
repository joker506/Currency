<template>
  <v-app>
    <Default />
    <!-- <v-main>
      <router-view />
    </v-main> -->
  </v-app>
</template>

<script>
import Default from '../src/layouts/default.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Default
  }
}
</script>
