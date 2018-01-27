<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <p>Gold: {{ $store.getters.dispGold }}G ({{ $store.getters.income }}G/秒)</p>
            <p>総戦力：{{ $store.getters.totalPower }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm6 xs12>

        <v-card class="card--flex-toolbar">
          <v-toolbar card color="white" prominent>
            <v-toolbar-title class="body-2 grey--text">キャラクター</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom left>
              <v-btn icon slot="activator">
                <v-icon>sort</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  v-for="sortOption in sortOptions"
                  @click="$store.dispatch('sortCharacters', sortOption)"
                >
                  <v-list-tile-title>{{ sortOption.text }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>

            <v-list three-line>
              <template v-for="character in $store.state.characters">
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img class="grey lighten-3" :src="`./assets/images/characters/${character.imgUrl}`"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ character.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>Lv: {{ character.lv }} / Exp: {{ character.exp }} ({{ character.next }})</v-list-tile-sub-title>
                    <v-list-tile-sub-title>つよさ: {{ character.power }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn v-if="character.canClassChange" large icon @click="character.classUp()">
                      <v-icon large color="blue">trending_up</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn large icon @click="character.isActive = !character.isActive">
                      <v-icon large color="green" v-if="character.isActive">directions_run</v-icon>
                      <v-icon large color="grey lighten-2" v-else>local_hotel</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              flat
              v-for="gacha in $store.getters.availableGachas"
              @click="$store.commit('gacha', gacha.id)"
            >{{ gacha.name }}</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
      <v-flex sm6 xs12>

        <v-card class="card--flex-toolbar">
          <v-toolbar card color="white" prominent>
            <v-toolbar-title class="body-2 grey--text">ステージ</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>

            <v-list three-line>
              <template  v-for="(stage, index) in $store.getters.availableStages">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-btn icon @click="selectStage(index)">
                      <v-icon v-if="$store.state.selectedStageIndex === index" color="green">check_box</v-icon>
                      <v-icon v-else color="grey">check_box_outline_blank</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ stage.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>必要戦力: {{ stage.enemyPower }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>取得経験値: {{ stage.exp }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <template v-if="stage.isCompleted === false">
                    <v-list-tile-action v-if="stage.progress < 100">
                      <v-progress-circular
                        :size="50"
                        :width="10"
                        :rotate="270"
                        :value="stage.progress"
                        color="teal"
                      >
                        {{ stage.progress }}
                      </v-progress-circular>
                    </v-list-tile-action>
                    <v-list-tile-action v-else>
                      <v-btn icon @click="$store.dispatch('stageComplete', index)">
                        <v-icon color="blue">done</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </template>
                </v-list-tile>
              </template>
            </v-list>

          </v-card-text>
        </v-card>

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

.Character {
  display: flex;
}
.Character__figure {
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100px;

  margin-right: 20px;
}
.Character__info {
  flex-grow: 1;
  flex-shrink: 1;
}

.Stages__item {
  padding: 10px 0;
  border-bottom: 1px solid #000;
}
.Stage.-active {
  background: #faa;
}
</style>
