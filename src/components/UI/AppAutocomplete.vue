<template>
  <div>
    <v-autocomplete
      :value="value"
      :items="currencyItems"
      item-text="name"
      item-value="name"
      return-object
      dense
      filled
      @input="onSend"
    />
  </div>
</template>

<script>
export default {
  name: 'AppAutocomplete',

  props: {
    value: {
      type: String,
      default: 'None'
    },
    currencyItems: {
      type: Array,
      default: () => {}
    },
    itemText: {
      type: String,
      default: 'None'
    },
    itemValue: {
      type: String,
      default: 'None'
    }
  },
  methods: {
    onSend(event) {
      this.$emit('onSend', event)
    }
  }
}
</script>
