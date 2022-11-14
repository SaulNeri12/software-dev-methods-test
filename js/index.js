import { loadMethodsInfo } from "./content.loader.js";

const $ = id => document.querySelector(id);

loadMethodsInfo();

$("#menu-btn").onclick = function() {
  $(".content-menu").classList.toggle("is-active");
};

$(".content-menu").onclick = function(e) {
  this.classList.toggle("is-active");
}

