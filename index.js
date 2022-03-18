const textElements = ["test1", "test2", "kabarza is gay"];
const textElementsOnDom = [];

const containerElement = document.getElementById("container");

let currentIndex = 0;
let currentElement = undefined;

const data = {
  mouseOffsetX: 0,
  mouseOffsetY: 0,
  mouseX: 0,
  mouseY: 0,
  relMouseX: 0,
  relMouseY: 0,
};

function init() {
  const boundings = containerElement.getBoundingClientRect();
  data.mouseOffsetX = boundings.x + window.scrollX;
  data.mouseOffsetY = boundings.y + window.scrollY;
  currentElement = createTextElement(textElements[0]);
  document.getElementById("endMenu").style.display = "none";
}
init();

document.addEventListener("scroll", calculateRelativeMousepos);

containerElement.addEventListener("click", nextText);
function nextText() {
  currentIndex++;
  if (currentIndex >= textElements.length) {
    currentElement = undefined;
    endElement.style.display = "block";
  } else {
    currentElement = createTextElement(textElements[currentIndex]);
  }
}

containerElement.addEventListener("mousemove", moveText);
function moveText(event) {
  data.mouseX = event.clientX;
  data.mouseY = event.clientY;
  calculateRelativeMousepos();
}

function calculateRelativeMousepos() {
  data.relMouseX = window.scrollX + data.mouseX - data.mouseOffsetX;
  data.relMouseY = window.scrollY + data.mouseY - data.mouseOffsetY;
  if (currentElement !== undefined) {
    currentElement.style.top = data.relMouseY + "px";
    currentElement.style.left = data.relMouseX + "px";
  }
  // console.log(data.relMouseX, data.relMouseY);
}

function createTextElement(text) {
  const textContainer = document.createElement("div");
  textContainer.classList.add("dropElement");
  textContainer.textContent = text;
  containerElement.appendChild(textContainer);
  textElementsOnDom.push(textContainer);
  return textContainer;
}

document.getElementById("image").addEventListener("click", downloardImage);
function downloardImage() {
  const element = containerElement;
  const imageName = "test";
  domtoimage.toPng(element).then(function (dataUrl) {
    var link = document.createElement("a");
    link.download = imageName + ".png";
    link.href = dataUrl;
    link.click();
  });
}
document.getElementById("reset").addEventListener("click", reset);
function reset() {
  for (let i = 0; i < textElementsOnDom.length; i++) {
    textElementsOnDom[i].remove();
  }
  currentElement = createTextElement(textElements[0]);
  currentIndex = 0;
  endElement.style.display = "none";
}

const endElement = document.getElementById("endMenu");
