export default {
  methods: {
    selectStage(index) {
      const stage = this.$store.state.stages[index];
      const { totalPower } = this.$store.getters;

      if (totalPower < stage.enemyPower) return;

      this.$store.commit('selectStage', index);
    },
  },
};
