<template>
  <div>
    <v-autocomplete
      :value="value"
      @input="onSend"
      :items="currencyItems"
      item-text="name"
      item-value="name"
      return-object
      dense
      filled
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'Autocompleat',

  props: {
    value: {
      type: String,
      required: true
    },
    currencyItems: {
      type: Array,
      default: () => {}
    },
    itemText: {
      type: String
    },
    itemValue: {
      type: String
    }
  },
  methods: {
    onSend(event) {
      this.$emit('input', event.name), this.$emit('onSend', event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
