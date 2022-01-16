<template>
  <div class="">
    <v-card
      class="mx-auto"
      max-width="544"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-card-subtitle class="text-overline col-6">
              {{ firstVal.name ? firstVal.name : nameVal }}
            </v-card-subtitle>
            <v-card-subtitle class="text-overline col-6">
              {{
                secondVal.currencyName ? secondVal.currencyName : nameValSecond
              }}
            </v-card-subtitle>
          </v-row>
          <v-row>
            <v-col class="d-flex">
              <v-row>
                <v-col
                  class="d-flex align-top"
                  cols="5"
                >
                  <v-text-field
                    v-model="valRate"
                    class="text-align-center pa-1"
                    type="number"
                  />
                  <AppAutocomplete
                    v-model="firstVal.name"
                    :currency-items="newArr"
                    @onSend="sendVal"
                  />
                </v-col>
                <v-col
                  cols="2"
                  class="text-center"
                >
                  <AppButton
                    class="btn_small"
                    icon-element="mdi-arrow-left-right"
                    color-icon="#f3f3f3"
                    @click="toggleVal"
                  />
                </v-col>
                <v-col
                  class="d-flex align-top"
                  cols="5"
                >
                  <span class="pa-3">{{ getCourse.toFixed(4) }}</span>
                  <AppAutocomplete
                    v-model="secondVal.name"
                    :currency-items="newArr"
                    @onSend="sendVal"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import AppAutocomplete from '@/components/UI/AppAutocomplete'
import AppButton from '@/components/UI/AppButton'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Convertor',
  components: {
    AppAutocomplete,
    AppButton
  },
  data: () => ({
    valRate: 1,
    nameVal: 'EURO',
    firstVal: {
      name: 'EUR'
    },
    nameValSecond: 'RUB',
    secondVal: {
      name: 'RUB'
    },
    items: []
  }),
  computed: {
    getCourse() {
      return this.valueCourses * this.valRate
    },
    getDate() {
      let d = new Date()
      d.setDate(d.getDate() - 3)
      return d.toLocaleDateString('fr-CA')
    },
    diffCurrency() {
      return Object.entries(this.historyCurrency).map(element => {
        return element[1] - this.valueCourses
      })
    },
    ...mapState({
      listCurrency: state => state.currency.listCurrency,
      valueCourses: state => state.currency.valueСourse,
      historyCurrency: state => state.currency.historyCurrency
    }),
    ...mapGetters({
      newArr: 'currency/newArr'
    })
  },
  created() {
    this.getVal()
    this.setVal({
      first: this.firstVal.name,
      second: this.secondVal.name
    })
    this.getHistoryCourse({
      first: this.firstVal.name,
      second: this.secondVal.name,
      date: this.getDate
    })
  },

  methods: {
    sendVal(e) {
      this.$store.commit('currency/check_currency', e)
      this.setVal({
        first: this.firstVal.name,
        second: this.secondVal.name
      })
      this.getHistoryCourse({
        first: this.firstVal.name,
        second: this.secondVal.name,
        date: this.getDate
      })
    },
    toggleVal() {
      ;[this.firstVal.name, this.secondVal.name] = [
        this.secondVal.name,
        this.firstVal.name
      ]
      this.setVal({
        first: this.firstVal.name,
        second: this.secondVal.name
      })
      this.getHistoryCourse({
        first: this.firstVal.name,
        second: this.secondVal.name,
        date: this.getDate
      })
    },
    ...mapActions({
      getVal: 'currency/getVal',
      setVal: 'currency/setVal',
      getHistoryCourse: 'currency/getHistoryCourse'
    })
  }
}
</script>
