

const $softCard = document.querySelector(".soft-card").cloneNode(true);

axios.get("https://raw.githubusercontent.com/SaulNeri12/sadm/main/methods.json")
  .then(response => {
	const methods = response.data;

	console.info(methods)

	methods.forEach(m => {
	  console.log(m.name);

	  const $div = document.createElement("div");
	  
	  $div.classList.add("info-pane");
	  $div.id = m.name;

	  $div.innerHTML += `<h1 class="method-name">${m.name}</h1>`;
	  $div.innerHTML += `<p class="method-desc">${m.description}</p>`;
	  $div.innerHTML += `<img src="${m.picture}"/>`;

	  /*
		TODO: NO SE PUEDE ITERAR JSON ARRAYS CON FOREACH(),
		RESOLVER ESTO 
		*/
	  m.phases.forEach(phase => {
		$div.innerHTML += `<h2>${phase.name}</h2>`;
		$div.innerHTML += `<p>${phase.description}</p>`;
		phase.paragraphs.forEach(paragraph => {
		  $div.innerHTML += `<p>${paragraph.text}</p>`;
		  if (paragraph.questions.length > 0) {
			const $ul = document.createElement("ul");
			paragraph.questions.forEach(question => {
			  const $li = document.createElement("li");
			  $li.textContent = question;
			});
		  }
		})
	  });

	  document.body.querySelector("main").appendChild($div);
	})
  })
  .catch(error => {
	console.log(error);
  })
