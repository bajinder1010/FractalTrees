export default class Tree {
  constructor(len, angle, reduction, x, y, seed = 1) {
    this.len = len;
    this.angle = angle;
    this.reduction = reduction;
    this.x = x;
    this.y = y;
    this.fruitProb = 30;
    this.seed = seed;
    this.hue = Math.floor(Math.random() * 360);
    this.random = Math.floor(Math.random() * 101);
    this.phase = Math.random() * Math.PI * 2;
    this.sway = 0;
    this.limit = Math.floor(Math.random() * (200 - 40 + 1)) + 20;
  }

  update(time) {
    this.sway = Math.sin(time * 0.01 + this.phase) * 10;
    if (this.len < this.limit) {
      this.len = this.len + 0.1;
    }
  }

  fruit(ctx) {
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(0.5 * 10 + this.sway * 0.2, 0, 3, 0, 2 * Math.PI);
    ctx.fill();
  }

  leaf(ctx) {
    ctx.beginPath();
    ctx.ellipse(0 + this.sway * 0.2, 0, 5, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();

    // vein
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(0 + this.sway * 0.2, 12);
    ctx.strokeStyle = "#224400";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  branches(l, ctx, depth) {
    if (l < 10 || depth > 8) {
      if (this.random < this.fruitProb) {
        this.fruit(ctx);
      } else {
        this.leaf(ctx);
      }

      return;
    }

    const saturation = 30 + depth * 5;
    ctx.strokeStyle = `hsl(${this.hue}, 90%, ${saturation}%)`;

    // Right Tree
    const branchSeed = hash(this.seed, 10, depth, 1, 1);
    const angle = (branchSeed % 1000) / 1000;

    ctx.save();
    ctx.beginPath();
    ctx.rotate(this.angle * angle);
    ctx.lineWidth = l * 0.2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.sway * 0.2, -l);
    ctx.stroke();
    ctx.translate(0, -l);
    this.branches(l * this.reduction, ctx, depth + 1);
    ctx.restore();

    // Left Tree
    const branchSeedL = hash(this.seed, -10, depth, 1, -1);
    const angleL = (branchSeedL % 1000) / 1000;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(-this.angle * angleL);
    ctx.lineWidth = l * 0.2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.sway * 0.2, -l);
    ctx.stroke();
    ctx.translate(0, -l);
    this.branches(l * this.reduction, ctx, depth + 1);
    ctx.restore();
  }

  trunk(ctx) {
    ctx.save();
    ctx.strokeStyle = `hsl(${this.hue}, 100%,20%)`;
    ctx.lineCap = "round";
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.lineWidth = this.len * 0.2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -this.len);
    ctx.stroke();
    ctx.translate(0, -this.len);

    this.branches(this.len * this.reduction, ctx, 0);
    ctx.restore();
  }

  display(ctx) {
    ctx.save();
    this.trunk(ctx);
    ctx.restore();
  }
}
function hash(seed, x, y, depth, side) {
  let h = seed;
  h = Math.imul(h ^ x, 2654435761);
  h = Math.imul(h ^ y, 1597334677);
  h = Math.imul(h ^ depth, 97531);
  h = Math.imul(h ^ side, 1013904223);
  return h >>> 0;
}
