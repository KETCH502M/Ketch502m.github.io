const list3n = document.querySelectorAll(".list");
function activeLink() {
  list3n.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list3n.forEach((item) => item.addEventListener("click", activeLink));
