window.addEventListener("load", function () {
	document.getElementsByClassName("openES")[0].addEventListener("click", function () {
		creaEsVF(esercizioVF); // non mi sono venuti in mente altri modi per passare paramentri con l'addeventlistener
	});
	document.getElementsByClassName("openES")[1].addEventListener("click", function () {
		creaEsRM(esercizioRM);
	});
	document.getElementsByClassName("openES")[2].addEventListener("click", function () {
		creaEsTB(esercizioTB);
	});
	document.getElementsByClassName("footer_anchor")[0].addEventListener("click", showModal);

	document.getElementsByClassName("");
});

function creaEsVF(esercizio) {
	let aus = ` <div class="card esVF">
                    <div class="card-header">
                        <span>Esercizio n° ${esercizio.id}    </span>`;
	for (let i of esercizio.argomento) aus += `<val-tag1></val-tag1>`;

	aus += `    <span class="material-symbols-outlined expandMore">
                    expand_more
                </span>
            </div>
                <div class="card-body">
                    <div class="card-text">
                        <p>${esercizio.consegna}</p> 
                        <div>
                            <input type="radio" id="v" name="${esercizio.id}">
                            <label for="v">V</label>
                            <input type="radio" id="f" name="${esercizio.id}">
                            <label for="f">F</label>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="correggi(${esercizio})">Correggi</button>
                </div>
            </div>`;

	document.getElementsByClassName("esercizioVF")[0].innerHTML = aus;
}

function creaEsTB(esercizio) {
	let aus = ` <div class="card esTB">
                    <div class="card-header">
                        <span>Esercizio n° ${esercizio.id}    </span>`;
	for (let i of esercizio.argomento) {
		aus += `<val-tag1></val-tag1>`;
	}
	aus += `<span class="material-symbols-outlined expandMore">
                expand_more
            </span>
            </div>
                <div class="card-body">
                <p>${esercizio.consegna}</p> 
                <div class="card-text">
                    <p>${esercizio.testoPrima}
                    <input type="text">
                    ${esercizio.testoDopo}</p>
                </div>
                <button class="btn btn-primary" onclick="correggi(${esercizio})">Correggi</button>
            </div>
        </div>`;

	document.getElementsByClassName("esercizioTB")[0].innerHTML = aus;
}

function creaEsRM(esercizio) {
	let aus = ` <div class="card esRM">
                    <div class="card-header">
                        <span>Esercizio n° ${esercizio.id}    </span>`;
	for (let i of esercizio.argomento) {
		aus += `<val-tag1></val-tag1>`;
	}
	aus += `<span class="material-symbols-outlined expandMore">
                expand_more
            </span>
            </div>
            <div class="card-body">
                <div class="card-text">
                    <p>${esercizio.consegna}</p> 
                    <div>`;

	for (let i in esercizio.scelte) {
		aus += `
        <input type="radio" id="ris${i}" name="${esercizio.id}">
        <label for="ris${i}">${esercizio.scelte[i]}</label><br>`;
	}
	aus += `        </div>
                </div>
                <button class="btn btn-primary" onclick="correggi(${esercizio})">Correggi</button>
            </div>
            </div>`;

	document.getElementsByClassName("esercizioRM")[0].innerHTML = aus;
}

function showModal() {
	let modal_crediti = document.getElementsByClassName("modal-body")[0];
	for (let i = 0; i < crediti.length; i++) {
		modal_crediti.innerHTML += `<p id="p${i}">${crediti[i]}</p>`;
	}
}

function announceCorrezione() {
	alert("PAGINA DI CORREZIONE");
}
