// developed by Aykut Akgün | requested by Kabarza
// https://twitter.com/AutumnLight20

try {
  // this is the element where the elements will be viewn later on
  const viewContainer = document.getElementById("viewContainer");
  // this is the storage element inside of webflow
  const storageElement = document.getElementById("storageElement");
  // This is an Element which gets shown / hidden once all elements are in viewContainer
  const endMenuElement = document.getElementById("endMenu");
  // This is the reset Button which deletes all element on press
  const resetElement = document.getElementById("reset");
  // the name of the image downloard
  const imageElement = document.getElementById("image");
  const imageDownloardName = "mainImage";

  //--- do not touch anything under here !!! ---

  // this is a variable to hold the current element
  let currentElement = undefined;

  // These are the current mouse offsets and values
  const data = {
    mouseOffsetX: 0,
    mouseOffsetY: 0,
    mouseX: 0,
    mouseY: 0,
    relMouseX: 0,
    relMouseY: 0,
  };

  // function which launches on start, it sets the offset of the view element to the mouse and selects the first element
  function init() {
    // checking if everything is setup correctly
    if (viewContainer === null) {
      alert(
        "warning, the viewContainer is not found, either you run the code not at the end of the body or you wrote the id wrong"
      );
      throw "error";
    } else if (storageElement === null) {
      alert("warning, the storageElement which contains the append Elements is not found");
      throw "error";
    } else if (storageElement.children.length === 0) {
      alert(
        "warning, the storage Element which contains the append Elements is empty, you need atleast one Element in it"
      );
      throw "error";
    } else if (resetElement === null) {
      alert("warning, there is no Element with the Id: 'resetElement' to reset the board");
      throw "error";
    } else if (endMenuElement === null) {
      alert("warning, there is no Element with the Id: 'endMenuElement' to toggle a menu on all elements shown");
      throw "error";
    } else if (imageElement === null) {
      alert("warning, there is no Element with the Id: 'imageElement' to downloard images");
      throw "error";
    }
    const boundings = viewContainer.getBoundingClientRect();
    data.mouseOffsetX = boundings.x + window.scrollX;
    data.mouseOffsetY = boundings.y + window.scrollY;
    currentElement = storageElement.children[0];

    for (let i = 0; i < storageElement.children.length; i++) {
      storageElement.children[i].classList.add("dropElement");
    }

    viewContainer.appendChild(currentElement);
    document.getElementById("endMenu").style.display = "none";
  }
  init();

  document.addEventListener("scroll", calculateRelativeMousepos);

  viewContainer.addEventListener("click", nextText);
  function nextText() {
    if (storageElement.children.length === 0) {
      currentElement = undefined;
      endMenuElement.style.display = "block";
    } else {
      currentElement = storageElement.children[0];
      viewContainer.appendChild(currentElement);
    }
  }

  // mouse event
  viewContainer.addEventListener("mousemove", moveText);
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
  }

  // function to take an image of the viewContainer
  imageElement.addEventListener("click", downloardImage);
  function downloardImage() {
    const element = viewContainer;
    domtoimage.toPng(element).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = imageDownloardName + ".png";
      link.href = dataUrl;
      link.click();
    });
  }

  // function to reset all elements in the viewContainer
  resetElement.addEventListener("click", reset);
  function reset() {
    let length = viewContainer.children.length;
    for (let i = 0; i < length; i++) {
      storageElement.appendChild(viewContainer.children[0]);
    }
    currentElement = storageElement.children[0];
    viewContainer.appendChild(currentElement);
    endMenuElement.style.display = "none";
  }
} catch (err) {
  console.log(err);
}
