/**
 * Ale decidiamo come fare con le risposte, io pensavo che tipo qua nel JS prendi dall'oggetto JSON tutte le risposte 
 * corrette e ti crei un vettore locale con queste, poi così facciamo per la correzzione una comparazione tra un nuovo vettore 
 * fatto dalle risposte date dall'utente e le risposte giuste, quindi tu mi mandi al php nuovo solo più 2 vettori
 * poi io nel php li controllo e assegno i punteggi all'utente
 * 
 * ho scritto tutto questo solo perchè poi me lo dimentico
 */


window.onload = function() {
    // ci deve arrivare in qualche modo l'id dell'esercizio da visualizzare
    let id = 1 // ovviamente da modificare

    // con questa roba aggiunta sotto fetch passo semplicemente i parametri in post al mio file php
    fetch('getDatiEs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${encodeURIComponent(id)}`
    }) 
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

function correggiES(idUtente) {
    // Definizione dei vettori di stringhe
    let risposteDate = ["risposta1", "risposta2", "risposta3"]; // Esempio di risposte date
    let risposteCorrette = ["corretta1", "corretta2", "corretta3"]; // Esempio di risposte corrette
    
    let formData = new FormData(); // serve per inviare i parametri al php
    formData.append('idUtente', idUtente);
    formData.append('risposteDate', JSON.stringify(risposteDate));
    formData.append('risposteCorrette', JSON.stringify(risposteCorrette));
    
    let options = {
        method: 'POST',
        body: formData
    };
    
    fetch('chkEs.php', options)
        .then(function(response) {
            // qua mettiamo tipo una scritta in centro con "Hey hai totalizzato x punti su 10 in questo esercizio"
            alert(response.punti);
        })
        .then(function(data) {
            console.log('Risposta dal server:', data);
        })
        .catch(function(error) {
            console.error('Si è verificato un errore:', error);
        });
}