/* In base al tipo interpreto l'oggetto risposte in maniera opportuna */
/**
 * TIPI:
 * - risposta multipla
 * - testo bucato
 * - vero/falso
 */

let esercizioVF = { //VF = vero falso
    id:0,
    argomento:["verbi", "reading"], 
    difficolta: 4,
    consegna: "questa è la domanda del vero/falso",
    risposte:{
        /* Risposte possibili e corrette */
        punteggio:5,/* Punteggi per ogni risposta! */
        risData: "",
        risCorretta: "v"
    }
};

let esercizioRM = { //RM = risposta multipla
    id: 1,
    argomento:["verbi", "reading"],
    difficolta: 4,
    consegna: "questa è la domanda con possibili risposte multiple",
    scelte: [
        "risposta1",
        "risposta2",
        "risposta3",
        "risposta4"
    ],
    risposte:{
        punteggio: 5,
        risData: "",
        risCorretta: "risposta4"
    }
};

let esercizioTB = { //TB = testo bucato
    id: 2,
    argomento:["verbi", "reading"],
    difficolta: 4,
    consegna: "questa è la domanda in cui devi inserire la parola giusta nei buchi del testo",
    testoPrima: "Questo è il testo prima del buco",
    testoDopo: "Questo è il testo dopo il buco",
    risposte:{
        punteggio: 5,
        risData: "",
        risCorretta: "buco"
    }
};

let crediti = ["Allocco Tommaso", "Barchi Alessandro", "Begovic Emanulah", "Bertolino Matteo", "Bertolotti Leonardo", "Boghiu Costantino Emiliano", "Botto Federico", "Cadoni Luca", "Cassano Igor", "Demichelis Alessandro", "Drogant Davide", "El Amrani Firas", "Ferhane Amine", "Filipi Andrea", "Fossanetto Paolo", "Gonella Lorenzo", "Isoardi Giacomo", "Pecoraro Marco", "Pereno Pietro", "Porro Matteo", "Rolfi Davide", "Zhan Jiayi"];