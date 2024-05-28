<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>VALearning</title>

		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
			crossorigin="anonymous" />
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
			crossorigin="anonymous"></script>

		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

		<link href="index.css" rel="stylesheet" />
		<script src="index.js"></script>
		<script src="componenti/tag1.js"></script>
		<script src="componenti/val-navbar.js"></script>
		<script src="componenti/footer.js"></script>
	</head>

	<body>
		<val-navbar></val-navbar>
			<main>
                <?php
                    //inserire i dati del db valearning
                    $servername = "localhost";
                    $username = "alessandrobarchi";
                    $password = "";
                    $dbname = "my_alessandrobarchi";

                    // Crea la connessione
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Verifica la connessione
                    if ($conn->connect_error) {
                        die("Connessione fallita: " . $conn->connect_error);
                    }

                    // Verifica se 'codes' è in GET o POST
                    if (isset($_GET['codes']) || isset($_POST['codes'])) {
                        
                        if(isset($_GET['codes'])){

                            $codes = $_GET['codes'];

                        }elseif(isset($_POST['codes'])){

                            $codes = $_POST['codes'];
                            
                        }else{
                            $codes = 1;
                        }

                        // Protezione contro SQL injection
                        $codes = $conn->real_escape_string($codes);

                        // Esegui la query
                        $sql = "SELECT *, count(codEs) FROM esercizi WHERE codEs = '$codes'";
                        $result = $conn->query($sql);

                        $array[] = $result->fetch_assoc();
                        $json_dati = json_encode($array);
                        
                        if($json_dati['count(codEs)'] == 1){

                            foreach ($json_dati as $record) {
                                
                                if ($record['tipo'] == 'veroFalso') {

                                    echo "<div class='esercizioVF'>";
                                    echo "<button class='openES'>[ESERCIZIO VERO/FALSO]</button>";
                                    echo "</div>";

                                } elseif ($record['tipo'] == 'sceltaMultipla') {
                                    
                                    echo "<div class='esercizioVF'>";
                                    echo "<button class='openES'>[ESERCIZIO VERO/FALSO]</button>";
                                    echo "</div>";

                                } elseif ($record['tipo'] == 'testoBucato') {
                                    
                                    echo "<div class='esercizioVF'>";
                                    echo "<button class='openES'>[ESERCIZIO VERO/FALSO]</button>";
                                    echo "</div>";
                                    
                                }else {
                                    echo "errore nel tipo di esercizio";
                                }
                            }
                            
                        }else{
                            echo "errore nel codice";
                        }

                    } else {
                        echo "Variabile 'codes' non fornita.";
                    }

                    // Chiudi la connessione
                    $conn->close();
                ?>

				<!-- <div class="esercizioVF">
					<button class="openES">[ESERCIZIO VERO/FALSO]</button>
				</div>
				<div class="esercizioRM">
					<button class="openES">[ESERCIZIO CON RISPOSTA MULTIPLA]</button>
				</div>
				<div class="esercizioTB">
					<button class="openES">[ESERCIZIO CON TESTO BUCATO]</button>
				</div> -->
			</main>
		<val-footer></val-footer>
	</body>
</html>
