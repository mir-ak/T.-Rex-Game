class Game {
  constructor() {
    this.cactuses = [];
    this.cloud = [];
    this.score = 0;
    this.Canvas();
    this.animations();
  }
  Canvas() {
    this.canvas = document.getElementById('Canvas');
    this.canvas.width = 1000;
    this.canvas.height = 400;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = "25px Arial";
  }
  animations() {
    this.player = new Player();
    this.sol = new Sol();
    this.cactuses.push(new Cactus(1000, () => {
      if (this.player.position.y == 294) {
        this.score = 0;
        alert("Game Over!")
        this.cactuses.push(new Cactus);
        return (true);
      }
      return (false);
    }));
    this.cloud.push(new Cloud(1000, () => {
      if (this.player.position.y == 120) {
        this.cactuses.push(new Cloud);
        return (true);
      }
      return (false);
    }));
  }
  update() {
    this.ctx.clearRect(0, 0, 1000, 400);
    this.ctx.fillText(`SCORE: ${this.score++}`, 450, 50);
    this.ctx.fillText(`Press Space to jump !`, 395 , 90);
    this.sol.draw(this.ctx);
    this.player.draw(this.ctx);
    this.cactuses.forEach((element) => {
      element.update(this.ctx);
    })
    this.cloud.forEach((element) => {
      element.update(this.ctx);
    })
  }
  start() {
    setInterval(() => {
      this.update();
    }, 50);
  }
}

new Game().start();