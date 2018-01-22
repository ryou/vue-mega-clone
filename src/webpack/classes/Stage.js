import StageMaster from '../data/stages';

class Stage {
  constructor(id) {
    const stage = StageMaster.find(val => val.id === id);

    this.stageId = id;
    this.name = stage.name;
    this.enemyPower = stage.enemyPower;
    this.exp = stage.exp;
    this.capacity = stage.capacity;
    this.dropItems = stage.dropItems;
    this.currentProgress = 0;
    this.maxProgress = stage.maxProgress;

    this.isCompleted = stage.isCompleted || false;
    this.isAvailable = stage.isAvailable || false;
    this.onComplete = stage.onComplete || null;
    this.canSelect = false;
    this.progress = 0;
  }

  addProgress() {
    this.currentProgress += 1;
    this.progress = 100 * (this.currentProgress / this.maxProgress);
    this.progress = Math.floor(this.progress);
    if (this.progress > 100) this.progress = 100;
  }

  complete(context) {
    this.isCompleted = true;
    if (this.onComplete) this.onComplete(context);
  }

  open() {
    this.isAvailable = true;
  }
}

export default Stage;
