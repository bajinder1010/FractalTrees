import Tree from "./tree.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let tree = null;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ctx.translate(canvas.width / 2, canvas.height);
const trees = [];
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;

  // RESET canvas transform BEFORE drawing
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // optional: clear old drawing
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move origin to ground center
  ctx.translate(canvas.width / 2, canvas.height);

  tree = new Tree(
    Math.floor(Math.random() * (150 - 40 + 1)) + 40,
    0.6,
    0.8,
    x - canvas.width / 2,
    0,
    Math.floor(Math.random() * (150 - 40 + 1)) + 10,
  );

  trees.push(tree);

  drawAllTrees();
});

function drawAllTrees() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const tree of trees) {
    tree.display(ctx);
  }
}

// const tree = new Tree(150, 0.6, 0.8, 0, 0);

// const tree2 = new Tree(70, 0.6, 0.8, 200, 0);

// const tree3 = new Tree(100, 0.6, 0.8, 400, 0);

// const tree5 = new Tree(40, 0.6, 0.8, -200, 0);

// const tree6 = new Tree(100, 0.6, 0.8, -400, 0);

// function animate() {
//   ctx.setTransform(1, 0, 0, 1, 0, 0);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.translate(canvas.width / 2, canvas.height);

//   drawAllTrees();

//   requestAnimationFrame(animate);
// }

// animate();

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   if (tree) {
//     tree.len += 2; // growth speed

//     tree.display(ctx);
//   }

//   requestAnimationFrame(animate);
// }

// animate();

// tree.display(ctx);
// tree2.display(ctx);
// tree3.display(ctx);

// tree5.display(ctx);
// tree6.display(ctx);
