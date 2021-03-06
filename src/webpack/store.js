/* eslint-disable no-param-reassign */
/*
  ■ no-param-reassignを無効にする理由
  vuexでは、
  mutationFunc: (state) {
   ~
  }
  のように、mutationでstateを引数として渡され、公式のサンプルコードで
  引数stateを利用してstateを変更している。
  そのため、vuexの作法に則るためには引数の再代入を禁止するno-param-reassignを
  無効化する必要があるため。
*/

import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import TopView from './views/Top/template.vue';

import Character from './classes/Character';
import CharacterMaster from './data/characters';
import Stage from './classes/Stage';
import StageMaster from './data/stages';
import Gacha from './classes/Gacha';
import GachaMaster from './data/gachas';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pastSeconds: 0,
    currentView: TopView,
    characters: [],
    stages: [],
    gachas: [],
    selectedStageIndex: 0,
    gold: 0,
  },
  getters: {
    totalPower(state, getters) {
      let out = 0;
      getters.activeCharacters.forEach((character) => {
        out += character.power;
      });

      return out;
    },
    availableStages(state) {
      return state.stages.filter(stage => stage.isAvailable);
    },
    availableGachas(state) {
      return state.gachas.filter(gacha => gacha.isAvailable);
    },
    income(state, getters) {
      return Math.ceil(getters.totalPower / 10) / 10;
    },
    dispGold(state) {
      return Math.floor(state.gold).toLocaleString();
    },
    activeCharacters(state) {
      return state.characters.filter(character => character.isActive);
    },
    pastTime(state) {
      return `${Math.floor(state.pastSeconds / 60)}:${state.pastSeconds % 60}`;
    },
  },
  actions: {
    init(context) {
      const { state, commit } = context;
      StageMaster.forEach((stage) => {
        state.stages.push(new Stage(stage.id));
      });

      state.gold = 40;

      GachaMaster.forEach((gacha) => {
        state.gachas.push(new Gacha(gacha));
      });

      commit('gacha', 'first');
    },
    mainLoop(context) {
      const { state, getters } = context;
      const selectedStage = state.stages[state.selectedStageIndex];

      if (getters.totalPower >= selectedStage.enemyPower) {
        selectedStage.addProgress();

        const characterNum = getters.activeCharacters.length;
        const personalExp = Math.floor(selectedStage.exp / characterNum);

        const restExp = selectedStage.exp - (personalExp * characterNum);
        getters.activeCharacters.forEach((character, index) => {
          let addExp = personalExp;
          if (index < restExp) addExp += 1;
          character.addExp(addExp);
        });

        state.gold += getters.income;
      }

      state.pastSeconds += 1;
    },
    stageComplete(context, index) {
      const { state } = context;
      const stage = state.stages[index];
      stage.complete(context);
    },
    sortCharacters(context, { value, isDesc }) {
      const { state } = context;
      state.characters = _.sortBy(state.characters, [value]);
      if (isDesc) state.characters = _.reverse(state.characters);
    },
  },
  mutations: {
    addCharacterRandom(state) {
      if (state.gold < 40) return;
      state.gold -= 40;
      const totalCharacterNum = CharacterMaster.length;
      const index = _.random(0, totalCharacterNum - 1);
      const newCharacter = CharacterMaster[index];
      const character = new Character(newCharacter.id);
      state.characters.push(character);
    },
    selectStage(state, index) {
      state.selectedStageIndex = index;
    },
    openStage(state, id) {
      const stage = state.stages.find(val => val.stageId === id);
      if (stage === undefined) throw new Error('cannot find stage');
      stage.open();
    },
    openGacha(state, id) {
      const gacha = state.gachas.find(val => val.id === id);
      if (gacha === undefined) throw new Error('cannot find gacha');
      gacha.isAvailable = true;
    },
    gacha(state, id) {
      const targetGacha = state.gachas.find(gacha => gacha.id === id);
      if (state.gold >= targetGacha.cost) {
        state.gold -= targetGacha.cost;
        const newCharacter = new Character(targetGacha.gacha());
        state.characters.push(newCharacter);
      }
    },
  },
});
