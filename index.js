window.onload = function() {
    fetch('index.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            //uso il vettore json
            
            creaCompComuni(data);
           

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

};

function creaCompComuni(esercizio) {

    let aus = `<div id="contenitore">
                <span>${esercizio.titolo}</span><br>
                <span>livello esercizio: ${esercizio.livello}</span>`;

    aus += creaEs(esercizio);

    aus +=`<button class="btn btn-primary" onclick="correggi(${esercizio})">Correggi</button>
    </div>`;

    document.getElementsByTagName("main").innerHTML = aus;

}

function creaEs(esercizio) {


    switch(esercizio.tipo){

        case "veroFalso":
            return creaEsVF(esercizio.domande);

        case "sceltaMultipla":
            return creaEsRM(esercizio.domande);

        case "testoBucato":
            return creaEsTB(esercizio.domande);
            
    }

}


function creaEsVF(domande) {

    let aus;

    for (let i = 0; i < domande.length; i++) {

        aus += ` <div class="card esVF">
                        <div class="card-header">
                            <span>Esercizio n° ${domande[i].DomID}    </span>`;

        aus += `    <span class="material-symbols-outlined expandMore">
                        expand_more
                    </span>
                </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>${domande[i].testo}</p> 
                            <div>
                                <input type="radio" id="v" name="${domande[i].testo}">
                                <label for="v">V</label>
                                <input type="radio" id="f" name="${domande[i].testo}">
                                <label for="f">F</label>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    return aus;
}

function creaEsTB(domande) {

    let aus;


    for (let i = 0; i < domande.length; i++) {

        let testo =  domande[i].testo.split(";");

        aus += ` <div class="card esTB">
                        <div class="card-header">
                            <span>Esercizio n° ${domande[i].DomID}    </span>`;

        aus += `<span class="material-symbols-outlined expandMore">
                    expand_more
                </span>
                </div>
                    <div class="card-body">
                    <p>inserisci la parola mancante nel testo</p> 
                    <div class="card-text">
                        <p>${testo[0]}
                        <input type="text">
                        ${testo[1]}</p>
                    </div>
                </div>
            </div>`;
    
    }

    return aus;

}

function creaEsRM(domande) {
    let aus;

    for (let i = 0; i < domande.length; i++) {

        let risp = domande[i].elencoRisposte.split(";");

        let rispostaCorretta = risp[0];

        //jack fai lo shuffle!!!!
        //shuffle(risp);

        aus += ` <div class="card esRM">
                        <div class="card-header">
                            <span>Esercizio n° ${domande[i].DomID}     </span>`;

        aus += `<span class="material-symbols-outlined expandMore">
                    expand_more
                </span>
                </div>
                <div class="card-body">
                    <div class="card-text">
                        <p>${domande[i].testo}</p> 
                        <div>`;

        for (let i in risp){
            aus += `
            <input type="radio" id="ris${i}" name="${domande[i].DomID}">
            <label for="ris${i}">${risp[i]}</label><br>`;
        }
        aus += `        </div>
                    </div>
                </div>
                </div>`;
    }

    return aus;

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
