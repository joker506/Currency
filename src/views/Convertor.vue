<template>
  <div class="">
    <v-card class="mx-auto" max-width="544" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-card-subtitle class="text-overline col-6"
              >{{ firstVal.name ? firstVal.name : nameVal }}
            </v-card-subtitle>
            <v-card-subtitle class="text-overline col-6"
              >{{
                secondVal.currencyName ? secondVal.currencyName : nameValSecond
              }}
            </v-card-subtitle>
          </v-row>
          <v-row>
            <v-col class="d-flex">
              <v-row>
                <v-col class="d-flex align-top" cols="5">
                  <v-text-field
                    class="text-align-center pa-1"
                    type="number"
                    v-model="valRate"
                  />

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
                  <span class="pa-3">{{ getCourse.toFixed(4) }}</span>
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
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Corrector',
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
    getCourse() {
      return this.valueСourse * this.valRate
    },
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
