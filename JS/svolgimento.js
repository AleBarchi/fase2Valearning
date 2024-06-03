let risposteDate = [];
let risposteCorrette = [];
let esercizio = {};


window.onload = function () {
    // ci deve arrivare in qualche modo l'id dell'esercizio da visualizzare
    let id = 1 // ovviamente da modificare

    // con questa roba aggiunta sotto fetch passo semplicemente i parametri in post al mio file php
    // fetch('getDatiEs.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `id=${encodeURIComponent(id)}`
    // }) 
    // .then(data => {
    //     console.log('Data received:', data);
    //     //uso il vettore json

    creaCompComuni();
    // })
    // .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    // });

};

function creaCompComuni() {
    esercizio = {
        "codEs": 1,
        "titolo": "Questo è il titolo",
        "tipo": "veroFalso",
        "livello": "B1",
        "idUtente": 1,
        "validato": 1,
        "idValidatore": 2,
        "note": "Questo è un esempio di nota.",
        "domande": [
            {
                "domID": 1,
                "testo": "il past simple è presente?",
                "livelloID": 2,
                "utenteID": 1,
                "dataInvio": "2024-05-29",
                "esID": 1,
                "elencoRisposte": ["Vero", "Falso"],
                "rispostaCorretta": "Falso"
            },
            {
                "domID": 2,
                "testo": "Il future simple ha la forma in -ing?",
                "livelloID": 3,
                "utenteID": 2,
                "dataInvio": "2024-05-30",
                "esID": 1,
                "elencoRisposte": ["Vero", "Falso"],
                "rispostaCorretta": "Falso"
            }
        ]
    }

    let aus;

    aus = `
            <div class="titolo">
                <h2 id="title1">${esercizio.titolo}</h2><br>
                <span id="title2">livello esercizio: <strong>${esercizio.livello}</strong></span><br>
            </div>`;


    aus += creaEs(esercizio);

    aus += `<button class="btn btn-primary" onclick="correggiES()">Correggi</button>`;

    document.getElementById("contenitore").innerHTML = aus;

}

function creaEs(esercizio) {
    switch (esercizio.tipo) {
        case "veroFalso":
            return creaEsVF(esercizio.domande);

        case "sceltaMultipla":
            return creaEsRM(esercizio.domande);

        case "testoBucato":
            return creaEsTB(esercizio.domande);

        case "rephrasing":
            return creaEsRF(esercizio.domande);
    }
}


function creaEsVF(domande) {
    let aus = ``;
    for (let i in domande) {
        risposteDate.push("Vero");
        risposteCorrette.push(domande[i].rispostaCorretta);

        aus += ` <div class="card esVF">
                        <div class="card-header">
                            <span>domanda n° ${domande[i].domID}    </span>`;

        aus += `
                </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>${domande[i].testo}</p> 
                            <div>
                                <input type="radio" id="v${i}" name="${domande[i].domID}" value="Vero" checked">
                                <label for="v${i}">V</label>
                                <input type="radio" id="f${i}" name="${domande[i].domID}" value="Falso">
                                <label for="f${i}">F</label>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    return aus;
}

function creaEsTB(domande) {

    let aus = ``;


    for (let i in domande) {

        risposteDate.push("");
        risposteCorrette.push(domande[i].rispostaCorretta);

        let testo = domande[i].testo.split(";");

        aus += ` <div class="card esTB">
                        <div class="card-header">
                            <span>domanda n° ${domande[i].domID}    </span>`;

        aus += `
                </div>
                    <div class="card-body">
                    <p>inserisci la parola mancante nel testo</p> 
                    <div class="card-text">
                        <p>${testo[0]}
                        <input type="text" class="input-text" id="${domande[i].domID}">
                        ${testo[1]}</p>
                    </div>
                </div>
            </div>`;

    }

    return aus;

}

function creaEsRM(domande) {
    let aus = '';

    for (let i in domande) {

        risposteDate.push(domande[i].elencoRisposte[0]);
        risposteCorrette.push(domande[i].rispostaCorretta);


        aus += `<div class="card esRM">
                    <div class="card-header">
                        <span>domanda n° ${domande[i].domID}</span>                  
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>${domande[i].testo}</p>
                            <div>
                                <select class="card-select" name="${domande[i].domID}" id="combo${i}">
        `;

        for (let j in domande[i].elencoRisposte) {
            let selected = j == 0 ? 'selected' : ''; // Seleziona automaticamente la prima opzione
            aus += `<option value="${domande[i].elencoRisposte[j]}" ${selected}>${domande[i].elencoRisposte[j]}</option>`;
        }

        aus += `           </select>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    return aus;
}


function creaEsRF(domande) {

    let aus = ``;


    for (let i in domande) {

        risposteDate.push("");
        risposteCorrette.push(domande[i].rispostaCorretta);


        aus += ` <div class="card esRF">
                        <div class="card-header">
                            <span>domanda n° ${domande[i].domID}    </span>`;

        aus += `
                </div>
                    <div class="card-body">
                    <p>riformula la prima frase in modo che non si cambi il significato utilizzando la parola data</p> 
                    <div class="card-text">

                        <p>${domande[i].testo}</p>
                        <p><strong>${domande[i].elencoRisposte[1]}</strong></p><br>
                        <input type="text" class="input-text" id="${domande[i].domID}">
                        
                    </div>
                </div>
            </div>`;

    }

    return aus;

}



function correggiES() {
    if(esercizio.tipo == "testoBucato" || esercizio.tipo == "refrasing")
    {
        let inputs = document.querySelectorAll('.input-text');
        inputs.forEach((input, index) => {
        risposteDate[index] = input.value;
        });
    }
    else if(esercizio.tipo == "sceltaMultipla")
    {
        const selects = document.querySelectorAll('.card-select');
        selects.forEach((select, index) => {
        risposteDate[index] = select.value;
        });
    }
    else if(esercizio.tipo == "veroFalso")
    {
        const cards = document.querySelectorAll('.card-text');
        cards.forEach((card, index) => {
            const selectedRadio = card.querySelector('input[type="radio"]:checked');
            risposteDate[index] = selectedRadio ? selectedRadio.value : null;
        });
    }

    // calcolo punteggio e aggiorno il JSON mettendo anche questo dentro
    let domande = risposteCorrette.length;
    let contErr = 0;
    for (let i=0; i<domande; i++)
        if (risposteDate[i] != risposteCorrette[i]) contErr++;

    esercizio.punti = Math.round(10 * (domande - contErr) / domande);
    esercizio.risposteCorrette = risposteCorrette;
    esercizio.risposteDate = risposteDate;

    sessionStorage.setItem("esercizio", JSON.stringify(esercizio));
    window.location.href = "correzione.html";
}
