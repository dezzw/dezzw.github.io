import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./score_panel";

// 游戏控制器控制其他的类
class GameControl {
  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 创建一个属性储存蛇的移动方向
  direction: string = "";

  // 创造一个属性记录是否存活
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  init() {
    // 绑定键盘按下事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));

    this.run();
  }

  // 创建一个键盘按下的响应函数
  keydownHandler(e: KeyboardEvent) {
    // 检查按键是否合法

    // 修改direction属性
    this.direction = e.key;
  }

  // 创建一个控制蛇移动的方法
  run() {
    // 根据方向来使蛇的位置改变
    // 获取目前坐标
    let x = this.snake.x;
    let y = this.snake.y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
    }

    // 检查蛇是否吃到食物
    this.checkEat(x, y);

    // 判断游戏结束
    try {
      // 修改x，y的值
      this.snake.x = x;
      this.snake.y = y;
    } catch (e) {
      // 游戏结束，弹窗提示
      alert(e.message + " GAME OVER!");
      // 将isLive设置为false
      this.isLive = false;
    }

    // 开启一个定时调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义一个方法检查蛇是否吃到食物
  checkEat(x: number, y: number) {
    if (x === this.food.x && y === this.food.y) {
      // console.log("The Snake ate the food!");
      // 食物位置重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇要增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;
