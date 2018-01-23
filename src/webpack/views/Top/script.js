export default {
  data() {
    return {
      sortOptions: [
        {
          text: '強さ',
          value: 'power',
        },
        {
          text: 'レベル',
          value: 'lv',
        },
        {
          text: '経験値',
          value: 'exp',
        },
      ],
    };
  },
  methods: {
    selectStage(index) {
      const stage = this.$store.state.stages[index];
      const { totalPower } = this.$store.getters;

      if (totalPower < stage.enemyPower) return;

      this.$store.commit('selectStage', index);
    },
  },
};
