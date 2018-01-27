import _ from 'lodash';

export default class {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.cost = data.cost;
    this.contents = data.contents;
    this.isAvailable = false;
  }

  gacha() {
    let tmp = _.random(1, 100);

    const character = this.contents.find((content) => {
      tmp -= content.rate;
      if (tmp <= 0) {
        return true;
      }
      return false;
    });

    if (typeof character === 'undefined') throw new Error('gacha error');

    return character.id;
  }
}
