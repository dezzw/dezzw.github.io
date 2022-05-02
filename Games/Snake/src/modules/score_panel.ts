// 定义计分牌类
class ScorePanel {
  score = 0;
  level = 1;

  // 设置一个变量限制等级
  maxLevel: number;
  // 设置一个变量表示多少分数升级
  upScore: number;

  // 分数和等级的元素
  scoreEle: HTMLElement;
  levelELe: HTMLElement;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelELe = document.getElementById("level")!;
  }

  // 设置一个加分的方法
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = `${this.score}`;
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 提升等级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelELe.innerHTML = `${++this.level}`;
    }
  }
}

export default ScorePanel;

// Test
// const scorePanel = new ScorePanel();
// for (let i = 0; i < 200; i++) {
//   scorePanel.addScore();
// }
