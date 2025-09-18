const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

const images = [
  { src: "https://picsum.photos/id/237/200/300", cls: "img1" },
  { src: "https://picsum.photos/seed/picsum/200/300", cls: "img2" },
  { src: "https://picsum.photos/200/300?grayscale", cls: "img3" },
  { src: "https://picsum.photos/200/300/", cls: "img4" },
  { src: "https://picsum.photos/200/300.jpg", cls: "img5" }
];

let chosen = [];
let selected = [];

function loadImages() {
  container.innerHTML = "";
  para.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  chosen = [];
  selected = [];

  let imgs = [...images];
  let dup = imgs[Math.floor(Math.random() * imgs.length)];
  imgs.push(dup);

  imgs.sort(() => Math.random() - 0.5);

  imgs.forEach(obj => {
    let img = document.createElement("img");
    img.src = obj.src;
    img.classList.add(obj.cls);   // ✅ Add class for Cypress tests
    img.onclick = () => selectImage(img, obj.cls);
    container.appendChild(img);
  });
}

function selectImage(img, cls) {
  if (selected.length < 2 && !selected.includes(img)) {
    img.classList.add("selected");
    selected.push(img);
    chosen.push(cls);
    resetBtn.style.display = "inline";
  }

  if (selected.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.onclick = loadImages;

verifyBtn.onclick = () => {
  verifyBtn.style.display = "none";
  if (chosen[0] === chosen[1]) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
};

loadImages();
