/**
 * Ale decidiamo come fare con le risposte, io pensavo che tipo qua nel JS prendi dall'oggetto JSON tutte le risposte 
 * corrette e ti crei un vettore locale con queste, poi così facciamo per la correzzione una comparazione tra un nuovo vettore 
 * fatto dalle risposte date dall'utente e le risposte giuste, quindi tu mi mandi al php nuovo solo più 2 vettori
 * poi io nel php li controllo e assegno i punteggi all'utente
 * 
 * ho scritto tutto questo solo perchè poi me lo dimentico
 */

let risposteDate = [];
let risposteCorrette = [];
let esercizio = {};


window.onload = function() {
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
        "titolo": "Zio pera questo è il titolo",
        "tipo": "refrasing",
        "livello": "B1",
        "idUtente": 1,
        "validato": 1,
        "idValidatore": 2,
        "note": "Questo è un esempio di nota.",
        "domande": [
          {
            "domID": 1,
            "testo": "ciao sono ",
            "livelloID": 2,
            "utenteID": 1,
            "dataInvio": "2024-05-29",
            "esID": 1,
            "elencoRisposte": ["hello i am", "hello"],
            "rispostaCorretta": "Falso"
          },
          {
            "domID": 2,
            "testo": "jonny e etero",
            "livelloID": 3,
            "utenteID": 2,
            "dataInvio": "2024-05-30",
            "esID": 1,
            "elencoRisposte": ["jonny non e fro", "non"],
            "rispostaCorretta" : "Vero"
          }
        ]
      }
      
    let aus;  

    aus = `
                <span>${esercizio.titolo}</span><br>
                <span>livello esercizio: ${esercizio.livello}</span>`;

    aus += creaEs(esercizio);

    aus +=`<button class="btn btn-primary" onclick="correggiES()">Correggi</button>`;

    document.getElementById("contenitore").innerHTML = aus;

}

function creaEs(esercizio) {
    switch(esercizio.tipo){
        case "veroFalso":
            return creaEsVF(esercizio.domande);

        case "sceltaMultipla":
            return creaEsRM(esercizio.domande);

        case "testoBucato":
            return creaEsTB(esercizio.domande);

        case "refrasing":
            return creaEsRF(esercizio.domande);       
    }
}


function creaEsVF(domande) {
    let aus = ``;
    for (let i in domande) {
        risposteDate.push("Vero");

        aus += ` <div class="card esVF">
                        <div class="card-header">
                            <span>domanda n° ${domande[i].domID}    </span>`;

        aus += `
                </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>${domande[i].testo}</p> 
                            <div>
                                <input type="radio" id="v${i}" name="${domande[i].domID}" value="V" checked onclick="gestisciClick(${i}, 'V')">
                                <label for="v${i}">V</label>
                                <input type="radio" id="f${i}" name="${domande[i].domID}" value="F" onclick="gestisciClick(${i}, 'F')">
                                <label for="f${i}">F</label>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    return aus;
}

function gestisciClick(i, valore) {

    if(valore == 'V'){

        risposteDate[i] = "Vero";

    }else if(valore == 'F'){

        risposteDate[i] = "Falso";
    
    }

}

function creaEsTB(domande) {

    let aus = ``;


    for (let i in domande) {

        risposteDate.push("");

        let testo =  domande[i].testo.split(";");

        aus += ` <div class="card esTB">
                        <div class="card-header">
                            <span>domanda n° ${domande[i].domID}    </span>`;

        aus += `
                </div>
                    <div class="card-body">
                    <p>inserisci la parola mancante nel testo</p> 
                    <div class="card-text">
                        <p>${testo[0]}
                        <input type="text" id="${domande[i].domID}">
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

        aus += `<div class="card esRM">
                    <div class="card-header">
                        <span>domanda n° ${domande[i].domID}</span>                  
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>${domande[i].testo}</p>
                            <div>
                                <select name="${domande[i].domID}" id="combo${i}">
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
                        <input type="text" id="${domande[i].domID}">
                        
                    </div>
                </div>
            </div>`;
    
    }

    return aus;

}



function correggiES() {
   // calcolo punteggio e aggiorno il JSON mettendo anche questo dentro
    let domande = risposteCorrette.length;
    let contErr = 0;
    for (let i in domande)
        if (risposteDate[i] != risposteCorrette[i]) contErr++;

    esercizio.punti = Math.round(10 * (domande - contErr) / domande);
    esercizio.risposteCorrette = risposteCorrette;
    esercizio.risposteDate = risposteDate;

    sessionStorage.setItem("esercizio", JSON.stringify(esercizio));
    window.location.href = "correzione.html";
}