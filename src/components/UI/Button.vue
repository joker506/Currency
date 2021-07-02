<template>
  <div class="btn" :class="[`btn_${size}`]" @click="clickBtn">
    <v-icon :color="colorIcon">{{ iconElement }}</v-icon>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    iconElement: {
      type: String
    },
    colorIcon: {
      type: String,
      default: '#fff'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    clickBtn(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &_small {
    padding: 10px 16px;
    background: rgb(112, 206, 93);
    border-radius: 7%;
    &:hover {
      background: rgb(105, 201, 132);
    }
  }
  &_medium {
    padding: 20px 26px;
    background: darkcyan;
  }
}
</style>
