<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "valearning_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$esercizio = json_decode($json, true);

// Inizio della transazione
$conn->begin_transaction();

try {
    // Preparazione della query per inserire un nuovo esercizio
    $stmt = $conn->prepare("INSERT INTO svolgimenti (idUtente, idEs, punteggio) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iii", $esercizio['idUtente'], $esercizio['codEs'], $esercizio['punti']);
    $stmt->execute();
    $conn->commit();
    
} catch (Exception $e) {
    $conn->rollback();
    echo "Error: " . $e->getMessage();
}

$conn->close();
