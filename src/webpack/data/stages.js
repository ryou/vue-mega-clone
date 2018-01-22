export default [
  {
    id: 'town',
    name: '街',
    enemyPower: 0,
    exp: 0,
    capacity: -1,
    maxProgress: 10,
    dropItems: [],
    isAvailable: true,
    isCompleted: true,
  },
  {
    id: 'first',
    name: 'はじまり',
    enemyPower: 0,
    exp: 1,
    capacity: -1,
    maxProgress: 10,
    dropItems: [],
    isAvailable: true,
    isCompleted: false,
    onComplete({ commit }) {
      commit('openStage', 'second');
    },
  },
  {
    id: 'second',
    name: 'にこめ',
    enemyPower: 20,
    exp: 2,
    capacity: -1,
    maxProgress: 20,
    dropItems: [],
    onComplete({ commit }) {
      commit('openStage', 'third');
    },
  },
  {
    id: 'third',
    name: 'さんこめ',
    enemyPower: 120,
    exp: 4,
    capacity: -1,
    maxProgress: 30,
    dropItems: [],
    onComplete({ commit }) {
      commit('openStage', 'forth');
    },
  },
  {
    id: 'forth',
    name: 'よんこめ',
    enemyPower: 300,
    exp: 4,
    capacity: -1,
    maxProgress: 40,
    dropItems: [],
    onComplete({ commit }) {
      commit('openStage', 'fifth');
    },
  },
  {
    id: 'fifth',
    name: 'ごこめ',
    enemyPower: 500,
    exp: 6,
    capacity: -1,
    maxProgress: 40,
    dropItems: [],
  },
];
