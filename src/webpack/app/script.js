import env from '../../../.env';
import LoopController from '../libs/LoopController';

const fps = env.game.fps || 1;

export default {
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
  },
  created() {
    this.$store.dispatch('init');

    const loopController = new LoopController(() => {
      this.$store.dispatch('mainLoop');
    }, fps);
    loopController.start();
  },
};
