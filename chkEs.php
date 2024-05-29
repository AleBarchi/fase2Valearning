<?php
$hostname = "localhost";
$username = "isoardigiacomo";
$password = ""; 
$nomeDb = "isoardigiacomo";

try {
    // Creare la connessione utilizzando PDO, metodo più sicuro e funzionale
    $conn = new PDO("mysql:host=$hostname;dbname=$nomeDb", $username, $password);
    
    $risposteDate = json_decode($_POST['risposteDate'], true);
    $risposteCorrette = json_decode($_POST['risposteCorrette'], true);
    $idUtente = $_POST['idUtente'];
    
    $domande = count($risposteCorrette);
    $contErr = 0;
    for ($i = 0; $i < $domande; $i++) {
        if ($risposteDate[$i] != $risposteCorrette[$i]) $contErr++;
    }
    $punti = round(10 * ($domande - $contErr) / $domande);
    
    // Preparare e eseguire l'UPDATE
    $stmt = $conn->prepare("UPDATE utenti SET punteggi = punteggi + :punti WHERE codUtente = :idUtente");
    $stmt->bindParam(':punti', $punti, PDO::PARAM_INT);
    $stmt->bindParam(':idUtente', $idUtente, PDO::PARAM_INT);
    $stmt->execute();
    
    // Verificare se l'UPDATE è avvenuto con successo
    if ($stmt->rowCount() > 0) {
        echo "Record updated successfully";
    } else {
        echo "No record updated";
    }
} catch(PDOException $e) {
    // Gestire eventuali eccezioni
    echo "Error: " . $e->getMessage();
}

// Chiudere la connessione
$conn = null;

$punteggio["punti"] = $punti;
echo json_encode($punteggio);