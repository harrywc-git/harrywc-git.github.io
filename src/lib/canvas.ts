export interface CircleParams {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
  increase: boolean;
}

export class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
  fill: boolean;
  increase: boolean;

  constructor(circleParams: CircleParams, fill = true) {
    this.x = circleParams.x;
    this.y = circleParams.y;
    this.dx = circleParams.dx;
    this.dy = circleParams.dy;
    this.radius = circleParams.radius;
    this.color = circleParams.color;
    this.increase = circleParams.increase;
    this.fill = fill;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  };
}

export class Canvas {
  circles: Array<Circle>;
  htmlElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    canvasElem: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.circles = [];
    this.htmlElement = canvasElem;
    this.context = context;
  }

  constrainSize(parentNode: HTMLElement) {
    this.htmlElement.width = parentNode.clientWidth;
    this.htmlElement.height = parentNode.clientHeight;

    window.addEventListener("resize", () => {
      this.htmlElement.width = parentNode.clientWidth;
      this.htmlElement.height = parentNode.clientHeight;
    });
  }

  drawCircles() {
    this.circles.forEach((circle) => {
      circle.draw(this.context);
    });
  }

  addCircle(circle: Circle) {
    this.circles.push(circle);
  }

  animate(
    callback: (canvas: Canvas, context: CanvasRenderingContext2D) => void
  ) {
    const canvas = this;
    const context = this.context;
    function _animate() {
      requestAnimationFrame(_animate);
      callback(canvas, context);
    }
    _animate();
  }
}

export function createCanvas(
  width = window.innerWidth,
  height = window.innerHeight
): Canvas {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  return new Canvas(canvas, context as CanvasRenderingContext2D);
}
