export default {
  data() {
    return {
      sortOptions: [
        {
          text: '強さ（降順）',
          value: 'power',
          isDesc: true,
        },
        {
          text: '強さ（昇順）',
          value: 'power',
          isDesc: false,
        },
        {
          text: 'レベル（降順）',
          value: 'lv',
          isDesc: true,
        },
        {
          text: 'レベル（昇順）',
          value: 'lv',
          isDesc: false,
        },
        {
          text: '経験値（降順）',
          value: 'exp',
          isDesc: true,
        },
        {
          text: '経験値（昇順）',
          value: 'exp',
          isDesc: false,
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
