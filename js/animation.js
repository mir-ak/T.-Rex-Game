class Animation {
  constructor(position, size, imageUri) {
    this.position = position;
    this.size = size;
    this.image = new Image(size.w, size.h);
    this.image.src = imageUri;
    this.rect = {w: size.w, h: size.w, x: 0, y: 0};
    this.animation = 0;
  }
  setRect(rect, offset) {
    this.animation = offset;
    this.rect = rect;
  }
  draw(ctx) {
    if (this.animation) {
      if ((this.rect.x + this.animation) >= this.size.w)
        this.rect.x = 0;
      else
        this.rect.x += this.animation;
    }
    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.w,
      this.rect.h,
      this.position.x,
      this.position.y,
      this.size.w,
      this.size.h,
    );
  }
}
class Player extends Animation {
  constructor() {
    super(
      {x: 145, y: 294},
      {w: 92, h: 108},
      'images/dino.png'
      );
    this.setRect({w: 91, h: 108, x: 0, y: 0}, 91);
    this.Jumping = false;
    document.addEventListener("keyup", (e) => {
      if (e.keyCode != 32 || this.Jumping)
        return;
      this.position.y = 120;
      this.Jumping = true;
      setTimeout(() => {
        this.Jumping = false;
        this.position.y = 294;
      }, 400);
    }, false);
  }
}
class Sol extends Animation {
  constructor() {
    super(
      {x: 0, y: 370},
      {w: 1000, h: 92},
      'images/terrain.png'
    );
    this.setRect({w: 1000, h: 95, x: 0, y: 0}, 20);
  }
}
class Cactus extends Animation {
  constructor(StepPoint, killpoint) {
    super(
      {x: StepPoint, y: 294},
      {w: 102, h: 99},
      'images/cactus.png'
    );
    this.StepPoint = StepPoint;
    this.killPlayer = killpoint;
  }
  update(ctx) {
    this.draw(ctx);
    if ((this.position.x > 100 && this.position.x < 225) && this.killPlayer())
      this.position.x = this.StepPoint;
    if (this.position.x)
      this.position.x -= 20;
    else
      this.position.x = this.StepPoint;
  }
}
class Cloud extends Animation {
  constructor(StepPoint, killpoint) {
    super(
      {x: StepPoint, y: 120},
      {w: 92, h: 99},
      'images/cloud.png'
    );
    this.StepPoint = StepPoint;
    this.killPlayer = killpoint;
  }
  update(ctx) {
    this.draw(ctx);
    if ((this.position.x > 100 && this.position.x < 225) && this.killPlayer())
      this.position.x = this.StepPoint;
    if (this.position.x)
      this.position.x -= 10;
    else
      this.position.x = this.StepPoint;
  }
}