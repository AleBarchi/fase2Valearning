<?php
header('Content-Type: application/json');

$userDb = "isoardigiacomo";
$nomeDb = "isoardigiacomo";

// Creare la connessione
$con = new mysqli("localhost", $userDb, "", $nomeDb);

// Controllare la connessione
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ottenere i parametri (GET o POST)
$id = isset($_POST['id']) ? $_POST['id'] : '';

// Prevenire SQL injection
$id = $conn->real_escape_string($id);

// Eseguire la query con il parametro
$sql = "SELECT * FROM esercizi WHERE codEs = $id";
$result = $conn->query($sql);

$esercizio = [];

if ($result->rowCount() > 0) {
    // Output dei dati di ogni riga
    while($row = $result->fetch_assoc()) {
        $esercizio[] = $row;
    }
} else {
    echo json_encode(["message" => "No records found"]);
    exit;
}

$sql = "SELECT * FROM domande WHERE esID = $id";
$result = $conn->query($sql);

$questions = [];
if ($result->rowCount() > 0) {
    while ($row = $result->fetch_assoc()) {
        $answers = explode(';', $row['elencoRisposte']);
        $row['rispostaCorretta'] = $answers[0];
        shuffle($row['elencoRisposte']);
        $questions[] = $row;
    }
}

$esercizio['domande'] = $questions;

$conn->close();

echo json_encode($esercizio);



/*

il JSON sarà tipo questo

{
  "codEs": 1,
  "titolo": "Zio pera questo è il titolo",
  "tipo": "veroFalso",
  "livello": "B1",
  "idUtente": 1,
  "validato": 1,
  "idValidatore": 2,
  "note": "Questo è un esempio di nota.",
  "domande": [
    {
      "domID": 1,
      "testo": "",
      "livelloID": 2,
      "utenteID": 1,
      "dataInvio": "2024-05-29",
      "esID": 1,
      "elencoRisposte": ["A", "B", "C", "D"],
      "rispostaCorretta": "A"
    },
    {
      "domID": 2,
      "testo": "Questo è il testo della seconda domanda",
      "livelloID": 3,
      "utenteID": 2,
      "dataInvio": "2024-05-30",
      "esID": 1,
      "elencoRisposte": ["Vero", "Falso"],
      "rispostaCorretta" : "Vero"
    }
  ]
}


 */
