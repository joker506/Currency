<template>
  <v-card
    class="mx-auto"
    max-width="544"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-row>
          <v-card-subtitle class="text-overline">
            {{ firstVal.currencyName ? firstVal.currencyName : nameVal }}
          </v-card-subtitle>

          <v-spacer />
          <v-card-subtitle>
            <div>
              <CurrencyRate :diff-value="diffCurrency[0]" />
            </div>
          </v-card-subtitle>
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <v-row>
              <v-col
                class="d-flex align-top"
                cols="5"
              >
                <span class="pa-3">1</span>
                <div class="">
                  <AppAutocomplete
                    v-model="firstVal.name"
                    :currency-items="newArr"
                    @onSend="sendFirstVal"
                  />
                </div>
              </v-col>
              <v-col
                cols="2"
                class="text-center "
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
                <span class="pa-3">{{ valueCourses }}</span>
                <div class="">
                  <AppAutocomplete
                    v-model="secondVal.name"
                    :currency-items="newArr"
                    @onSend="sendSecondVal"
                  />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import AppAutocomplete from '@/components/UI/AppAutocomplete'
import CurrencyRate from '@/components/ListCurrency/CurrencyRate'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListCurrency',
  components: {
    CurrencyRate,
    AppAutocomplete,
    AppButton
  },
  data: () => ({
    nameVal: 'EURO',
    firstVal: {
      name: 'EUR',
      currencyName: ''
    },
    secondVal: {
      name: 'RUB',
      currencyName: ''
    },
    items: []
  }),
  computed: {
    getDate() {
      let d = new Date()
      d.setDate(d.getDate() - 1)
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
    sendFirstVal(e) {
      this.firstVal.name = e.name
      this.firstVal.currencyName = e.currencyName
      this.sendVal(e.name)
    },
    sendSecondVal(e) {
      this.secondVal.name = e.name
      this.secondVal.currencyName = e.currencyName
      this.sendVal()
    },

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
