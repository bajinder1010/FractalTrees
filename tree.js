export default class Tree {
  constructor(len, angle, reduction, x, y, seed = 1) {
    this.len = len;
    this.angle = angle;
    this.reduction = reduction;
    this.x = x;
    this.y = y;
    this.fruitProb = 20;
    this.seed = seed;
    this.hue = Math.floor(Math.random() * 360);
  }

  fruit(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(0.5 * 10, 0, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  leaf(ctx) {
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 15, 0, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();

    // vein
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(0, 15);
    ctx.strokeStyle = "#224400";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  branches(l, ctx, depth) {
    if (l < 10 || depth > 8) {
      if (Math.floor(Math.random() * 101) < this.fruitProb) {
        this.fruit(ctx);
      } else {
        this.leaf(ctx);
      }

      return;
    }

    const saturation = 30 + depth * 3;
    ctx.strokeStyle = `hsl(${this.hue}, 80%, ${saturation}%)`;

    // Right Tree
    const branchSeed = hash(this.seed, 10, depth, 1, 1);
    const angle = (branchSeed % 1000) / 1000;

    ctx.save();
    ctx.beginPath();
    ctx.rotate(this.angle * angle);
    ctx.lineWidth = l * 0.2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -l);
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
    ctx.lineTo(0, -l);
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
