// define class Food
class Food {
  // 定义一个属性表示食物对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中food元素
    this.element = document.getElementById("food")!;
  }

  // 定义一个获取食物x轴坐标的方法
  get x() {
    return this.element.offsetLeft;
  }

  // 定义一个获取食物Y轴坐标的方法
  get y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 随机生成一个位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一次就是一格（10px），所以要求食物坐标必须是整10

    let x = Math.round(Math.random() * 29) * 10;
    let y = Math.round(Math.random() * 29) * 10;

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}

// Test
// const food = new Food();
// console.log(food.x, food.y);
// food.change();
// console.log(food.x, food.y);

export default Food;
