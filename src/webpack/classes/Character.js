import CharacterMaster from '../data/characters';

class Character {
  constructor(id) {
    this.charaId = id;
    this.imgUrl = '';
    this.rarity = 0;
    this.exp = 0;
    this.class = 0;
    this.isActive = true;
    this.power = 0;
    this.lv = 0;
    this.next = 0;
    this.canClassChange = false;

    this.init();
  }

  init() {
    this.updateStatus();
  }

  updateStatus() {
    const characterData = CharacterMaster.find(character => character.id === this.charaId);

    // name
    this.name = characterData.name;

    // 画像
    this.imgUrl = characterData.imgUrl;

    this.rarity = characterData.rarity;

    // レベル
    for (let lv = 0; lv < 100; lv += 1) {
      if (this.exp >= this.calcRequireExp(lv)) {
        this.lv = lv;
      } else {
        break;
      }
    }

    // power
    this.power = this.calcPower(this.lv);

    // next
    this.next = this.calcRequireExp(this.lv + 1);

    this.canClassChange = this.calcCanClassChange();
  }

  addExp(exp) {
    this.exp += exp;

    this.updateStatus();
  }

  classUp() {
    if (this.calcCanClassChange() === false) throw new Error('can not class change');

    this.class += 1;
    this.updateStatus();
  }

  calcCanClassChange() {
    return (this.class < this.rarity) && this.lv >= 20;
  }

  calcPower(lv) {
    const characterData = CharacterMaster.find(character => character.id === this.charaId);
    const { cardinalPower, indexPower } = characterData;
    const power = Math.floor(lv * Math.pow(cardinalPower, indexPower * (this.class + 1)));

    return power;
  }

  calcRequireExp(lv) {
    if (lv === 1) return 0;
    const characterData = CharacterMaster.find(character => character.id === this.charaId);
    const { baseExpIdx, subExpIdx } = characterData;
    const requireExp = Math.floor(Math.pow(lv, 1 / (baseExpIdx - (subExpIdx * (this.class + 1)))));

    return requireExp;
  }
}

export default Character;
