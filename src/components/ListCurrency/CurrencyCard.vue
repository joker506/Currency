<template>
  <v-card class="mx-auto" max-width="544" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-row>
          <v-card-subtitle class="text-overline"
            >{{ firstVal.currencyName ? firstVal.currencyName : nameVal }}
          </v-card-subtitle>

          <v-spacer></v-spacer>
          <v-card-subtitle>
            <div>
              <CurrencyRate :val="diffCurrency[0]" />
            </div>
          </v-card-subtitle>
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <v-row>
              <v-col class="d-flex align-top" cols="5">
                <span class="pa-3">1</span>
                <div class="">
                  <AutoCompleat
                    :value="firstVal.name"
                    :currencyItems="newArr"
                    @onSend="sendFirstVal"
                  />
                  <span>{{ firstVal.name }}</span>
                </div>
              </v-col>
              <v-col cols="2" class="text-center ">
                <Button
                  class="btn_small"
                  title=""
                  iconElement="mdi-arrow-left-right"
                  colorIcon="#f3f3f3"
                  @click="toggleVal"
                />
              </v-col>

              <v-col class="d-flex align-top" cols="5">
                <span class="pa-3">{{ String(valueСourse) }}</span>
                <div class="">
                  <AutoCompleat
                    :value="secondVal.name"
                    :currencyItems="newArr"
                    @onSend="sendSecondVal"
                  />
                  <span>{{ secondVal.name }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <!-- <BarChat
      :chartdata="this.$store.state.historyCurrency"
      :options="chartOptions"
    /> -->
  </v-card>
</template>

<script>
import Button from '@/components/UI/Button'
import AutoCompleat from '@/components/UI/AutoCompleat'
//import BarChat from '@/components/ListCurrency/BarChat'
import CurrencyRate from '@/components/ListCurrency/CurrencyRate'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'CurrencyCard',
  data: () => ({
    chartData: {
      // labels: [
      //   'January',
      //   'February',
      //   'March',
      //   'April',
      //   'May',
      //   'June',
      //   'July',
      //   'August',
      //   'September',
      //   'October',
      //   'November',
      //   'December'
      // ]
    },

    options: { responsive: true, maintainAspectRatio: false },

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
  components: {
    CurrencyRate,
    AutoCompleat,
    Button

    //BarChat
  },

  created() {
    this.getVal(),
      this.setVal({
        first: this.firstVal.name,
        second: this.secondVal.name
      }),
      this.getHistoryCourse({
        first: this.firstVal.name,
        second: this.secondVal.name,
        date: this.getDate
      })
  },

  methods: {
    sendFirstVal(e) {
      console.log(e)
      this.firstVal.name = e.name
      this.firstVal.currencyName = e.currencyName
      this.sendVal()
    },
    sendSecondVal(e) {
      console.log(e)
      this.secondVal.name = e.name
      this.secondVal.currencyName = e.currencyName

      this.sendVal()
    },

    sendVal(e) {
      console.log(e)
      this.$store.commit('currency/CHECK_CURRENCY', e)
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
      [this.firstVal.name, this.secondVal.name] = [
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
  },
  computed: {
    getDate() {
      let d = new Date()
      d.setDate(d.getDate() - 1)
      return d.toLocaleDateString('fr-CA')
    },
    diffCurrency() {
      return Object.entries(this.historyCurrency).map(element => {
        return element[1] - this.valueСourse
      })
    },
    ...mapState({
      listCurrency: state => state.currency.listCurrency,
      valueСourse: state => state.currency.valueСourse,
      historyCurrency: state => state.currency.historyCurrency
    }),
    ...mapGetters({
      newArr: 'currency/newArr'
    })
  }
}
</script>

<style lang="scss" scoped></style>
