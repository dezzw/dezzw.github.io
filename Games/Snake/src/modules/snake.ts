class Snake {
  // 表示蛇的元素
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div")!;
    this.bodies = this.element.getElementsByTagName("div");
  }

  // 获取蛇的坐标（蛇头坐标）
  get x() {
    return this.head.offsetLeft;
  }

  get y() {
    return this.head.offsetTop;
  }

  set x(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.x === value) {
      return;
    }

    // x值的合法范围
    if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error("The Snake hit the wall!");
    }

    // 修改x时，就是修改水平坐标，蛇在左右移动
    // 蛇不能掉头
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      // console.log("水平方向发生了掉头");
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.x) {
        // 如果新值大于旧值，说明蛇向有走，此时不能掉头，继续向左走
        value = this.x - 10;
      } else {
        value = this.x + 10;
      }
    }

    // 移动身体
    this.moveBody();

    this.head.style.left = `${value}px`;

    this.checkHeadHitBody();
  }

  set y(value: number) {
    if (this.y === value) {
      return;
    }

    // x值的合法范围
    if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error("The Snake hit the wall!");
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log("水平方向发生了掉头");
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.y) {
        // 如果新值大于旧值，，此时不能掉头，继续走
        value = this.y - 10;
      } else {
        value = this.y + 10;
      }
    }

    // 移动身体
    this.moveBody();

    this.head.style.top = `${value}px`;

    this.checkHeadHitBody();
  }

  // 蛇增加身体的方法
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 蛇的身体的移动方法
  moveBody() {
    // 将后边的身体的位置设置为前边身体的位置
    // 遍历所有身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获得前边身体的位置
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身上
      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }

  checkHeadHitBody() {
    // 获取所有的身体。检查其是否和蛇头的坐标重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let snakeBody = this.bodies[i] as HTMLElement;
      if (this.x === snakeBody.offsetLeft && this.y === snakeBody.offsetTop) {
        // 进入判断说明蛇头撞到了身体，游戏结束
        throw new Error("The Snake hit the body!");
      }
    }
  }
}

export default Snake;
