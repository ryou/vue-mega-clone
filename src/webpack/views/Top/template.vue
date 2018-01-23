<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <p>Gold: {{ $store.getters.dispGold }}G ({{ $store.getters.income }}G/秒)</p>
        <p>総戦力：{{ $store.getters.totalPower }}</p>

        <v-menu offset-y>
          <v-btn color="primary" dark slot="activator">ソート</v-btn>
          <v-list>
            <v-list-tile
              v-for="sortOption in sortOptions"
              @click="$store.dispatch('sortCharacters', sortOption.value)"
            >
              <v-list-tile-title>{{ sortOption.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <div class="Characters">
          <div v-for="character in $store.state.characters" class="Characters__item">
            <div class="Character">
              <div class="Character__figure">
                <v-avatar
                  size="100px"
                  class="grey lighten-3"
                ><img :src="`./assets/images/characters/${character.imgUrl}`"></v-avatar>
              </div>
              <div class="Character__name">{{ character.name }}</div>
              <div class="Character__lv">{{ character.lv }}</div>
              <div class="Character__power">{{ character.power }}</div>
              <div class="Character__exp">
                {{ character.exp }}
                ({{ character.next }})
              </div>
              <div v-if="character.canClassChange">
                <v-btn @click="character.classUp()">ClassChange</v-btn>
              </div>
            </div>
          </div>
        </div>
        <div>
          <v-btn @click="$store.commit('addCharacterRandom')">+ Character(40G)</v-btn>
        </div>
      </v-flex>
      <v-flex xs6>
        <div class="Stages">
          <div v-for="(stage, index) in $store.getters.availableStages" class="Stages__item">
            <div
              class="Stage"
              :class="{
                '-active': $store.state.selectedStageIndex === index,
              }"
              @click="selectStage(index)"
            >
              <div class="Stage__name">{{ stage.name }}</div>
              <div class="Stage__power">{{ stage.enemyPower }}</div>
              <div class="Stage__exp">{{ stage.exp }}</div>
              <template v-if="stage.isCompleted === false">
                <div v-if="stage.progress < 100" class="Stage__progress">
                  <v-progress-circular
                    :size="50"
                    :width="10"
                    :rotate="270"
                    :value="stage.progress"
                    color="teal"
                  >
                    {{ stage.progress }}
                  </v-progress-circular>
                </div>
                <v-btn v-else @click="$store.dispatch('stageComplete', index)">完了</v-btn>
              </template>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./script.js"></script>

<style scoped>
.Characters {
  border-top: 1px solid #000;
}
.Characters__item {
  padding: 10px 0;
  border-bottom: 1px solid #000;
}

.Stages__item {
  padding: 10px 0;
  border-bottom: 1px solid #000;
}
.Stage.-active {
  background: #faa;
}
</style>
