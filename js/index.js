import { loadMethodsInfo, loadMajorInfo, loadMenuContent } from "./content.loader.js";

const $ = id => document.querySelector(id);

document.addEventListener("DOMContentLoaded", () => {
  loadMajorInfo(() => {
	loadMethodsInfo(() => {
	  loadMenuContent();
	});
  })
});


$("#menu-btn").onclick = function() {
  $(".content-menu").classList.toggle("is-active");
};

