import LoopController from '../libs/LoopController';

export default {
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
  },
  created() {
    this.$store.commit('init');

    const loopController = new LoopController(() => {
      this.$store.dispatch('mainLoop');
    }, 1);
    loopController.start();
  },
};
