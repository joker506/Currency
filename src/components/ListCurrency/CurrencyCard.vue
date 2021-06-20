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
            <div class="">
              <CurrencyRate :val="diffCurrency[0]" />
            </div>
          </v-card-subtitle>
        </v-row>
        <v-row>
          <v-col class="d-flex">
            <v-row>
              <v-col class="d-flex align-top" cols="5">
                <span class="pa-3">1</span>
                <v-autocomplete
                  v-model="firstVal.name"
                  :items="newArr"
                  item-text="name"
                  item-value="name"
                  dense
                  filled
                  @input="sendVal"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2" class="text-center mt-1"
                ><v-btn @click="toggleVal">
                  <v-icon>mdi-arrow-left-right</v-icon>
                </v-btn></v-col
              >

              <v-col class="d-flex align-top" cols="5">
                <span class="pa-3">{{ String(valueСourse) }}</span>
                <v-autocomplete
                  v-model="secondVal.name"
                  :items="newArr"
                  item-text="name"
                  item-value="name"
                  dense
                  filled
                  @input="sendVal"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- <button @click="getVal">getVal</button> -->
            <!-- <v-list-item-subtitle class="text-center pa-3"
              ><span>12</span> {{ secondVal }}
            </v-list-item-subtitle> -->
          </v-col>
        </v-row>
      </v-list-item-content>
      <!-- <p>{{ newArr }}</p> -->
      <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
    </v-list-item>
  </v-card>
</template>

<script>
import CurrencyRate from '@/components/ListCurrency/CurrencyRate'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'CurrencyCard',
  data: () => ({
    nameVal: 'EURO',
    firstVal: {
      name: 'EUR'
    },
    secondVal: {
      name: 'RUB'
    },
    items: []
  }),
  components: {
    CurrencyRate
  },

  created() {
    //this.getCurr(),
    this.getVal(),
      this.setVal({ first: this.firstVal.name, second: this.secondVal.name }),
      //this.$store.commit('currency/CHECK_CURRENCY', 'EUR')
      this.getHistoryCourse({
        first: this.firstVal.name,
        second: this.secondVal.name,
        date: this.getDate
      })
  },

  methods: {
    sendVal(e) {
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
      //getCurr: 'currency/getCurrency',
      getVal: 'currency/getVal',
      setVal: 'currency/setVal',
      getHistoryCourse: 'currency/getHistoryCourse'
    })
  },
  computed: {
    getDate() {
      let d = new Date()
      d.setDate(d.getDate() - 3)
      return d.toLocaleDateString('fr-CA')
    },
    diffCurrency() {
      return Object.entries(this.historyCurrency).map(element => {
        return element[1] - this.valueСourse
      })
    },
    ...mapState({
      //currencyState: state => state.currency.checkCurrency,
      // correct: state => state.currency.correct,
      // currency: state => state.currency.currency,
      listCurrency: state => state.currency.listCurrency,
      valueСourse: state => state.currency.valueСourse,
      historyCurrency: state => state.currency.historyCurrency
    }),
    ...mapGetters({
      //getListCurrency: state => state.currency.getListCurrency
      //check: 'currency/getSelectParam',
      newArr: 'currency/newArr'
    })
  }
}
</script>

<style lang="scss" scoped></style>
