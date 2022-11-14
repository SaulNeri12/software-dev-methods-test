/**
 * @author: Saul Neri
 */

export const loadMethodsInfo = async () => {
  const $softCard = document.querySelector(".soft-card").cloneNode(true);

  axios.get("https://raw.githubusercontent.com/SaulNeri12/sadm/main/methods.json")
  .then(response => {
	const methods = response.data;

	methods.forEach(m => {
	  const $div = document.createElement("div");
	  $div.classList.add("method-info-pane");

	  $div.innerHTML += `<h1 class="method-name">${m.name}</h1>`;
	  $div.innerHTML += `<p class="method-desc">${m.description}</p>`;
	  $div.innerHTML += `
		<div class="method-main-picture"> 
		  <img src="${m.picture}"/>
		</div>
	  `;

	  const $phasesSection = document.createElement("section");
	  $phasesSection.classList.add("method-phases");
	  $phasesSection.innerHTML = "<h1>Fases</h1>";

	  m.phases.forEach(phase => {
		const $phaseContainer = document.createElement("div");
		const $phaseInfo = document.createElement("div");

		$phaseContainer.classList.add("method-phase");
		$phaseInfo.classList.add("method-phase-info");

		$phaseContainer.innerHTML += `<h3 class="phase-method-name">+ ${phase.name}</h3>`;
		// cuando el usuario haga click en el titulo de la fase, se desglosara la informacion...
		$phaseContainer.querySelector(".phase-method-name").addEventListener("click", e => {
		  //console.log(e.target);
		  console.log(e.target);
		  $phaseInfo.classList.toggle("hide");
		});

		// escribe la descripcion de cada fase de la metodologia
		phase.description.paragraphs.forEach(paragraph => {
		  $phaseInfo.innerHTML += `<p>${paragraph.text}</p>`;

		  $phaseInfo.classList.add("hide");

		  if (paragraph.resource) {
			const $videoContainer = document.createElement("div");
			$videoContainer.innerHTML += `<h4>${paragraph.resource.title}</h4>`;
			//console.log(paragraph.resource.link);
			const $iframe = document.createElement("iframe");
			$iframe.classList.add("video-resource"); 
			$iframe.src = paragraph.resource.link;

			$videoContainer.appendChild($iframe);
			$phaseInfo.appendChild($videoContainer);
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

		$div.appendChild($phasesSection);
	  });

	  // agrega la carta con la informacion del metodo a la etiqueta <main>
	  document.body.querySelector("main").appendChild($div);
	});
  }).catch(error => {
	  console.log(error);
	})
}

