/**
 * @author: Saul Neri
 */

/**
 * NOTE: RECOMENTACIONES DEL TEXTO
 * 
 * [x] Explica mejor que es SCRUM ya que la definicion es muy breve y nada concisa
 */

/**
 * NOTE: CORRECCIONES DE TEXTO
 *
 * [x] Planning Sprint (Planeacion) -> lleva acento
 * [x] Sprint (Ejecucion) -> lleva acento
 * [x] Daily Meeting (Reunion Diaria) -> lleva acento
 */

const $ = id => document.querySelector(id);

/** @description: Este observador carga el texto una vez y esta haya ocupado al menos un 25% de la pantalla */
const textObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
	if (e.isIntersecting) {
	  e.target.classList.add("is-active")
	  observer.unobserve(e.target);
	}
  })
}, {rootMargin: "0px", threshold: 0.25});

/** @description: Este observador carga la imagen una vez y esta haya ocupado al menos un 25% de la pantalla */
const imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
	if (e.isIntersecting) {
	  e.target.querySelector("img").src = e.target.querySelector("img").getAttribute("data-src");
	  e.target.classList.toggle("is-active");
	  observer.unobserve(e.target);
	}
  })
}, { rootMargin: "0px", threshold: 0.10});

/** @description: Este observador carga el video una vez y esta haya ocupado al menos un 25% de la pantalla */
const videoObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
	if (e.isIntersecting) {
	  e.target.src = e.target.getAttribute("data-src");
	  observer.unobserve(e.target);
	}
  })
}, { rootMargin: "0px", threshold: 0.25});


export const loadMethodsInfo = async callback => {
  fetch("https://raw.githubusercontent.com/SaulNeri12/sadm/main/methods.json").then(data => {
	data.json().then(methods => {
	
	const $softwareMethods = document.createElement("div");
	$softwareMethods.setAttribute("id", "software-methods");
	
	$softwareMethods.innerHTML = `<h1 class="pane-title animated" style="margin: 50vh 0;text-align: center;">Metodologías del desarrollo de Software</h1>`;
	textObserver.observe($softwareMethods.querySelector(".pane-title"));

	methods.forEach(m => {
	  const $method = document.createElement("div");
	  // agregamos clases
	  $method.classList.add("method-info-pane");
	  $method.classList.add("animated");
	  // preparamos el elemento
	  $method.innerHTML += `<h2 class="method-name">${m.name}</h2>`;
	  $method.innerHTML += `<p class="method-desc">${m.description}</p>`;
	  $method.innerHTML += `<div class="method-main-picture"></div>`;
	  // agregamos la imagen principal del elemento
	  const $mainPicture = document.createElement("img");
	  $mainPicture.setAttribute("data-src", m.picture);
	  $method.querySelector(".method-main-picture").appendChild($mainPicture);
	  imgObserver.observe($method.querySelector(".method-main-picture"));


	  // preparamos el video principal
	  if (m.video) {
		const $principalVideoSection = document.createElement("section");
		const $dropDownVideoBtn = document.createElement("h4");
		$dropDownVideoBtn.textContent = `+ Ver: ${m.video.name}`;

		const $principalVideoContainer = document.createElement("div");
		const $principalVideoIframe = document.createElement("iframe");

		$principalVideoIframe.classList.add("video-resource");
		$principalVideoIframe.classList.add("hide");
		$principalVideoIframe.setAttribute("data-src", m.video.link);

		$dropDownVideoBtn.onclick = function (e) {
		  const state = this.textContent[0];
		  // cambia el icono del boton que almacena la informacion de la fase...
		  this.textContent = (state == "+") ? `- Ver: ${m.video.name}` : `+ Ver: ${m.video.name}`;
		  // se muestra u oculta la informacion 
		  $principalVideoIframe.classList.toggle("hide");
		};

		videoObserver.observe($principalVideoIframe);
		$principalVideoContainer.appendChild($principalVideoIframe);
		$principalVideoSection.appendChild($dropDownVideoBtn);
		$principalVideoSection.appendChild($principalVideoContainer);
		$method.appendChild($principalVideoSection);
	  }

	  // creamos la seccion donde se guardan las fases y le damos estilo
	  const $phasesSection = document.createElement("section");
	  $phasesSection.classList.add("method-phases");
	  $phasesSection.innerHTML = `<h2 style="margin-top: 40px;">Fases</h2>`;

	  m.phases.forEach(phase => {
		const $phaseContainer = document.createElement("div");
		const $phaseInfo = document.createElement("div");

		$phaseContainer.classList.add("method-phase");
		$phaseInfo.classList.add("method-phase-info");
		$phaseContainer.innerHTML += `<h4 class="phase-method-name hover-animation">+ ${phase.name}</h4>`;
		
		$phaseContainer.querySelector(".phase-method-name").onclick = function (e) {
		  const state = this.textContent[0];
		  // cambia el icono del boton que almacena la informacion de la fase...
		  this.textContent = (state == "+") ? `- ${phase.name}` : `+ ${phase.name}`;
		  // se muestra u oculta la informacion 
		  $phaseInfo.classList.toggle("hide");
		};

		// escribe la descripcion de cada fase de la metodologia
		phase.description.paragraphs.forEach(paragraph => {
		  $phaseInfo.innerHTML += `<p>${paragraph.text}</p>`;
		  $phaseInfo.classList.add("hide"); // el texto de la fase esta oculta por defecto

		  if (paragraph.resource) {
			if (paragraph.resource.type == "video") {
			  const $videoContainer = document.createElement("div");
			  const $iframe = document.createElement("iframe");
			  // preparamos el video
			  $iframe.classList.add("video-resource");
			  $iframe.setAttribute("data-src", paragraph.resource.link);
			  videoObserver.observe($iframe);
			  // agregamos el video al contenedor de este...
			  $videoContainer.appendChild($iframe);
			  $phaseInfo.appendChild($videoContainer);
			} 
			else if (paragraph.resource.type == "picture") {
			  const $imgContainer = document.createElement("div");
			  $imgContainer.classList.add("image-resource");
			  $imgContainer.classList.add("animated");
			  $imgContainer.innerHTML = `<img data-src="${paragraph.resource.link}"/>`;
			  // le anadimos el observador al recurso
			  imgObserver.observe($imgContainer);
			  $phaseInfo.appendChild($imgContainer);
			}
		  }

		  // escribe las preguntas de cada parrafo, si es que las tiene...
		  if (paragraph.questions.length > 0) {
			const $questionsList = document.createElement("ul");
			paragraph.questions.forEach(question => {
			  const $li = document.createElement("li");
			  $li.textContent = question;
			  $questionsList.appendChild($li);
			});
			$phaseInfo.appendChild($questionsList);
		  }

		  $phaseContainer.appendChild($phaseInfo);
		  $phasesSection.appendChild($phaseContainer);
		});
		$method.appendChild($phasesSection);
	  });

	  textObserver.observe($method);
	  $softwareMethods.appendChild($method);
	  });
	  $("main").appendChild($softwareMethods);
	  callback();
	})
  }).catch(err => console.error(err));
};


export const loadMajorInfo = async callback => {
  fetch("https://raw.githubusercontent.com/SaulNeri12/sadm/main/major.json").then(data => {
	data.json().then(major => {
	  const $definitions = document.createElement("div");
	  $definitions.setAttribute("id", "definitions");

	  major.description.paragraphs.forEach(paragraph => {
		const $question = document.createElement("div");
		$question.classList.add("question");
		$question.classList.add("animated");
		$question.setAttribute("id", `${paragraph.title.link}`);

		if (paragraph.title.text) $question.innerHTML += `<h2 class="question-title">${paragraph.title.text}</h2>`;

		$question.innerHTML += `<p class="question-text">${paragraph.text}</p>`;

		if (paragraph.picture) {
		  const $imgContainer = document.createElement("div");
		  $imgContainer.classList.add("image-resource");
		  $imgContainer.classList.add("animated");
		  $imgContainer.innerHTML = `<img data-src="${paragraph.picture}"/>`;
		  imgObserver.observe($imgContainer);
		  $question.appendChild($imgContainer);
		}

		// despliega una lista (en este caso de lenguajes de programacion)...
		if (paragraph.list) {
		  const $listSection = document.createElement("section");
		  
		  paragraph.list.forEach(lang => {
			const $langInfo = document.createElement("div");
			$langInfo.classList.add("hover-animation");
			$langInfo.innerHTML = `<h4 class="lang-name">+ ${lang.name}</h4>`;
			$langInfo.innerHTML += `<p class="lang-desc hide">${lang.description}</p>`;
			
			// hacemos que se oculte la informacion al presionar el nombre del lenguaje...
			$langInfo.querySelector(".lang-name").onclick = function (e) {
			  const state = this.textContent[0];
			  // cambia el icono del boton que almacena la informacion de la fase...
			  this.textContent = (state == "+") ? `- ${lang.name}` : `+ ${lang.name}`;
			  // se muestra u oculta la informacion 
			  $langInfo.querySelector(".lang-desc").classList.toggle("hide");
			  $langInfo.querySelector(".image-resource").classList.toggle("hide");
			};

			/**
			 * NOTE: HACER LO MISMO QUE EN EL METODO "loadMethodsInfo" PARA 
			 * DETECTAR EL RECURSO Y PLANTARLO EN EL ELEMENTO $question
			 */

			// si el lenguaje tiene una imagen 
			if (lang.picture) {
			  const $imgContainer = document.createElement("div");
			  $imgContainer.classList.add("image-resource");
			  $imgContainer.classList.add("hide");
			  $imgContainer.innerHTML = `<img src="${lang.picture}"/>`;
			  $langInfo.appendChild($imgContainer);
			}

			$listSection.appendChild($langInfo);
		  });
		  $question.appendChild($listSection);
		}
		textObserver.observe($question);
		$definitions.appendChild($question);
	  });
	  $("main").appendChild($definitions);
	});
	callback();
  });
};

export const loadFinalConclusion = async callback => {
  fetch("https://raw.githubusercontent.com/SaulNeri12/sadm/main/conclusion.json").
	then(data => {
	  data.json().then(text => {
		const $div = document.createElement("div");
		$div.id = "conclusion";
		$div.classList.add("animated");
		textObserver.observe($div);

		text.conclusion.paragraphs.forEach(paragraph => {
		  const $p = document.createElement("p");
		  $p.textContent = `${paragraph.text}`;
		  $div.appendChild($p);
		});

		const $h4 = document.createElement("h4");
		$h4.textContent = "Fuentes de información";
		$h4.style.marginTop = "70px";
		$div.appendChild($h4);

		const $sourcesSection = document.createElement("section");
		const $ul = document.createElement("ul");

		text.sources.forEach(source => {
		  const $li = document.createElement("li");
		  $li.innerHTML = `(${source.year}). ${source.title}. ${source.author}. Disponible en: ${source.editorial.page}. <a href="${source.editorial.link}">${source.editorial.link}</b>. `;
		  if (source.date) $li.innerHTML += `${source.date}.`;
		  $ul.appendChild($li);
		});

		const $contactInfo = document.createElement("section");
		$contactInfo.id = "contact";
		//console.log(text.contact)

		$contactInfo.innerHTML = `<h2>Contacto</h2>`;
		$contactInfo.innerHTML += `
		  <div class="content">
			<div class="element"><img src="/css/icons/user.png"/><span>${text.contact.name}</span></div>
			<div class="element"><b><span>${text.contact.rol}</b></span></div>
			<div class="element"><img src="/css/icons/building.png"/><span>${text.contact.place}</span></div>
			<div class="element"><img src="/css/icons/telephone.png"/><span>${text.contact["phone-number"]}</span></div>
			<div class="element"><img src="/css/icons/mail.png"/><span><a href="mailto:${text.contact.email}">${text.contact.email}</a></span></div>
		  </div>
		`;

		$sourcesSection.appendChild($ul);
		$div.appendChild($sourcesSection);
		$div.appendChild($contactInfo);
		$("main").appendChild($div);

		callback();
	  });
	});
};

export const loadMenuContent = async () => {
  fetch("https://raw.githubusercontent.com/SaulNeri12/sadm/main/contents.json").
	then(data => {
	  data.json().then(results => {
		const $contentMenu = document.createElement("div");
		$contentMenu.classList.add("content-menu");

		results.forEach(content => {
		  const $a = document.createElement("a");
		  $a.textContent = content.title;
		  $a.setAttribute("href", content.link);
		  $contentMenu.appendChild($a);
		});

		$contentMenu.onclick = function(e) {
		  this.classList.toggle("is-active");
		};

		$("body").appendChild($contentMenu);
	  });
	});
};
