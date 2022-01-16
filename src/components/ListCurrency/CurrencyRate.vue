<template>
  <div>
    <v-chip
      class="ma-2"
      :color="arrowUpDownColor"
      label
      text-color="white"
    >
      <v-icon left>
        {{ arrowUpDownIcon }}
      </v-icon>
      {{ diffValue.toFixed(6) }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'CurrencyRate',
  props: {
    diffValue: {
      type: Number,
      default: 0
    }
  },
  computed: {
    arrowUpDownColor() {
      return this.diffValue > 0 ? 'green' : 'pink'
    },
    arrowUpDownIcon() {
      return this.diffValue > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'
    }
  }
}
</script>
