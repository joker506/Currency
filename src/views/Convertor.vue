<template>
  <div class="">
    <v-card class="mx-auto" max-width="544" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-card-subtitle class="text-overline col-6"
              >{{ firstVal.currencyName ? firstVal.currencyName : nameVal }}
            </v-card-subtitle>
            <!-- <v-spacer></v-spacer> -->
            <v-card-subtitle class="text-overline col-6"
              >{{
                secondVal.currencyName ? secondVal.currencyName : nameValSecond
              }}
            </v-card-subtitle>

            <!-- <v-card-subtitle>
              <div class="" v-for="(i, idx) in historyCurrency" :key="idx">
                <CurrencyRate :val="i" />
              </div>
            </v-card-subtitle> -->
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
                    v-model="firstVal"
                    items="newArr"
                    item-text="name"
                    item-value="name"
                    return-object
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
                  <span class="pa-3">{{
                    String(valueСourse) * this.valRate
                  }}</span>
                  <v-autocomplete
                    v-model="secondVal"
                    items="newArr"
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
          <!-- <div class="">{{ diffCurrency }}</div> -->
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Convertor',
  data() {
    return {
      valRate: 1,
      nameVal: 'EURO',
      nameValSecond: 'RUB',
      firstVal: { name: 'EUR' },
      secondVal: { name: 'RUB' },
      items: []
    }
  }
}
</script>
