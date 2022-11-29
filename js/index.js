import { 
  loadMethodsInfo, 
  loadMajorInfo, 
  loadMenuContent,
  loadFinalConclusion
} from "./content.loader.js";

const $ = id => document.querySelector(id);

document.addEventListener("DOMContentLoaded", () => {
  loadMajorInfo(() => {
	loadMethodsInfo(() => {
	  loadFinalConclusion(() => {
		loadMenuContent();
	  });
	});
  })
});


$("#menu-btn").onclick = function() {
  $(".content-menu").classList.toggle("is-active");
};

