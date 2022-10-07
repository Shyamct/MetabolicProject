
function changeArrowColor(path) {
    var selectedColor = localStorage.getItem("arrowColor");
    path.removeAttribute("class");
    path.setAttribute("fill", selectedColor);
}
