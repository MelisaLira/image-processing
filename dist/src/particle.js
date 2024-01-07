var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
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
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
var StarRain = /** @class */ (function () {
    function StarRain(x, y, size, ctx, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.velocityY = Math.random() * 2 + 1; // Velocidad vertical aleatoria
        this.color = color;
    }
    StarRain.prototype.update = function () {
        this.y += this.velocityY;
        // Reinicia la posición si llega al fondo del lienzo
        if (this.y > this.ctx.canvas.height) {
            this.y = 0;
        }
    };
    StarRain.prototype.draw = function () {
        var x = this.x;
        var y = this.y;
        var size = this.size;
        var ctx = this.ctx;
        var color = this.color;
        ctx.fillStyle = color;
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
            var angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            var xPoint = x + size * Math.cos(angle);
            var yPoint = y + size * Math.sin(angle);
            ctx.lineTo(xPoint, yPoint);
        }
        ctx.closePath();
        ctx.fill();
    };
    return StarRain;
}());
export { StarRain };
var TetrisBlock = /** @class */ (function () {
    function TetrisBlock(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    TetrisBlock.prototype.isAtBottom = function (canvasHeight) {
        return this.y + 1 >= canvasHeight / this.size;
    };
    // Método para mover el bloque hacia abajo
    TetrisBlock.prototype.moveDown = function (speed) {
        if (speed === void 0) { speed = 1; }
        this.y += speed;
    };
    // Método para dibujar el bloque en el lienzo
    TetrisBlock.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    };
    return TetrisBlock;
}());
export { TetrisBlock };
var Cloud = /** @class */ (function () {
    function Cloud(x, y, size, ctx, color, numCircles) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.velocityX = Math.random() * 0.2 + 0.1; // Velocidad horizontal aleatoria y más lenta
        this.color = color;
        this.numCircles = numCircles;
    }
    Cloud.prototype.update = function () {
        this.x += this.velocityX;
        // Reinicia la posición si la nube se sale del lienzo
        if (this.x > this.ctx.canvas.width + this.size) {
            this.x = -this.size;
        }
    };
    Cloud.prototype.draw = function () {
        for (var i = 0; i < this.numCircles; i++) {
            var offsetX = (Math.random() - 0.5) * this.size;
            var offsetY = (Math.random() - 0.5) * this.size;
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.x + offsetX, this.y + offsetY, this.size / 2, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
        }
    };
    return Cloud;
}());
export { Cloud };
var RainFromCloud = /** @class */ (function () {
    function RainFromCloud(x, y, length, ctx) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.ctx = ctx;
        this.velocityY = Math.random() * 5 + 2; // Velocidad vertical aleatoria
    }
    RainFromCloud.prototype.update = function () {
        this.y += this.velocityY;
        // Reinicia la posición si la gota de lluvia llega al fondo del lienzo
        if (this.y > this.ctx.canvas.height + this.length) {
            this.y = -this.length;
        }
    };
    RainFromCloud.prototype.draw = function () {
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y + this.length);
        this.ctx.stroke();
    };
    return RainFromCloud;
}());
export { RainFromCloud };
