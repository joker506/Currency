<template>
  <div>
    <v-chip class="ma-2" :color="arrowUpDown" label text-color="white">
      <v-icon left>
        {{ val > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
      </v-icon>
      {{ val.toFixed(6) }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'CurrencyRate',
  props: {
    val: {
      type: Number,
      default: 0
    }
  },

  computed: {
    arrowUpDown() {
      if (this.val > 0) {
        return 'green'
      } else {
        return 'pink'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
