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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentView: TopView,
    characters: [],
    stages: [],
    selectedStageIndex: 0,
    gold: 0,
  },
  getters: {
    totalPower(state) {
      let out = 0;
      state.characters.forEach((character) => {
        out += character.power;
      });

      return out;
    },
    availableStages(state) {
      return state.stages.filter(stage => stage.isAvailable);
    },
    income(state, getters) {
      return Math.ceil(getters.totalPower / 10) / 10;
    },
    dispGold(state) {
      return Math.floor(state.gold);
    },
  },
  actions: {
    mainLoop(context) {
      const { state, getters } = context;
      const selectedStage = state.stages[state.selectedStageIndex];
      const characterNum = state.characters.length;
      const personalExp = Math.floor(selectedStage.exp / characterNum);

      const restExp = selectedStage.exp - (personalExp * characterNum);
      state.characters.forEach((character, index) => {
        let addExp = personalExp;
        if (index < restExp) addExp += 1;
        character.addExp(addExp);
      });

      selectedStage.addProgress();

      state.gold += getters.income;
    },
    stageComplete(context, index) {
      const { state } = context;
      const stage = state.stages[index];
      stage.complete(context);
    },
  },
  mutations: {
    init(state) {
      StageMaster.forEach((stage) => {
        state.stages.push(new Stage(stage.id));
      });

      state.gold = 40;
    },
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
  },
});
