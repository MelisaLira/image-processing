export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];
  
  constructor(width: number, height: number,
    screenCanvas: CanvasRenderingContext2D,
    mapImg: number[][][]) {
    this.width = width;
    this.height = height;
    this.ctx = screenCanvas;
    this.x = Math.random() * width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 2.5;
    this.size = Math.random() * 1.5 + 1;
    this._2PI = Math.PI * 2;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.mappedImage = mapImg;
  }

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;
    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = (2.5 - this.speed) + this.velocity;
    }

    this.y += movement;
    
    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.beginPath();
    //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];
  
  constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]) {
    this.ctx = screenCanvas;
    this.x = x;// + 200;
    this.y = y;// - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = ((Math.random() * 30) + 1);
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = (forceDirectionX * force * this.density);
    let directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX ;
      this.y -= directionY ;
    }
    else {
      if (this.x !== this.baseX ) {
          let dx = this.x - this.baseX;
          this.x -= dx/5;
      } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

}

export class StarRain {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected velocityY: number;
  protected color: string;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.velocityY = Math.random() * 2 + 1; // Velocidad vertical aleatoria
    this.color = color;
  }

  public update() {
    this.y += this.velocityY;

    // Reinicia la posición si llega al fondo del lienzo
    if (this.y > this.ctx.canvas.height) {
      this.y = 0;
    }
  }

  public draw() {
    const x = this.x;
    const y = this.y;
    const size = this.size;
    const ctx = this.ctx;
    const color = this.color;

    ctx.fillStyle = color;
    ctx.beginPath();

    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const xPoint = x + size * Math.cos(angle);
      const yPoint = y + size * Math.sin(angle);
      ctx.lineTo(xPoint, yPoint);
    }

    ctx.closePath();
    ctx.fill();
  }
}

export class TetrisBlock {
  x: number;
  y: number;
  size: number;
  color: string;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  
  isAtBottom(canvasHeight: number): boolean {
    return this.y + 1 >= canvasHeight / this.size;
  }
  // Método para mover el bloque hacia abajo
  moveDown(speed: number = 1) {
    this.y += speed;
  }

  // Método para dibujar el bloque en el lienzo
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}


export class Cloud {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected velocityX: number;
  protected color: string;
  protected numCircles: number;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, color: string, numCircles: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.velocityX = Math.random() * 0.2 + 0.1; // Velocidad horizontal aleatoria y más lenta
    this.color = color;
    this.numCircles = numCircles;
  }

  public update() {
    this.x += this.velocityX;

    // Reinicia la posición si la nube se sale del lienzo
    if (this.x > this.ctx.canvas.width + this.size) {
      this.x = -this.size;
    }
  }

  public draw() {
    for (let i = 0; i < this.numCircles; i++) {
      const offsetX = (Math.random() - 0.5) * this.size;
      const offsetY = (Math.random() - 0.5) * this.size;

      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x + offsetX, this.y + offsetY, this.size / 2, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

export class RainFromCloud {
  protected x: number;
  protected y: number;
  protected length: number;
  protected ctx: CanvasRenderingContext2D;
  protected velocityY: number;

  constructor(x: number, y: number, length: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.ctx = ctx;
    this.velocityY = Math.random() * 5 + 2; // Velocidad vertical aleatoria
  }

  public update() {
    this.y += this.velocityY;

    // Reinicia la posición si la gota de lluvia llega al fondo del lienzo
    if (this.y > this.ctx.canvas.height + this.length) {
      this.y = -this.length;
    }
  }

  public draw() {
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + this.length);
    this.ctx.stroke();
  }
}


