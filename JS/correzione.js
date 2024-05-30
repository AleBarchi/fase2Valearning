window.onload = getExercises

function getExercises(){
    let esercizio = JSON.parse(sessionStorage.getItem("esercizio"));
    createCorrectionArea();

    const correction = document.getElementById('corr');
    correction.appendChild(viewCorrection(esercizio));


    let options = {
        method: 'POST',
        body: esercizio
    };
    
    fetch('chkEs.php', options)
    .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
      })
      .catch(error => {
        console.error("Request failed:", error);
      });
}

function viewCorrection(ex){
    let exArea = document.createElement('div')
    let Title = document.createElement('h4')
    let Points = document.createElement('h6')
    let answers = document.createElement('div')
    
    Title.textContent = `Exercise Result` 
    Points.textContent = `You scored ${ex.punti} out of 10`; 

    Title.id = 'titEx'
    Points.id = 'poiEx'
    exArea.id = 'exArea'
    for(let i in ex.domande){
        let row = document.createElement('p')
        let bold = document.createElement('span')
        let ans = document.createElement('span')
        bold.textContent = `Question ${i+1}`
        bold.style.fontWeight = 'bolder'

        if(ex.risposteCorrette[i] == ex.risposteDate[i]){
            ans.textContent = ` : Correct!`
            ans.style.color = 'green'
        }
        else{
            ans.textContent = ` : Incorrect. Answer was: ${ex.risposteCorrette[i]}.`
            ans.style.color = 'red'
        }
        row.appendChild(bold)
        row.appendChild(ans)
        answers.appendChild(row)
    }
    exArea.appendChild(Title)
    exArea.appendChild(Points)
    exArea.appendChild(answers)
    return exArea
}

function createCorrectionArea(){
    let a = 
    `
        <div class="container position-relative mt-3 mb-3 ms-5 p-3" id="corr">
            <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
                CORRECTION
            <span class="visually-hidden">unread messages</span>
        </div>
    `
    document.getElementById('usrArea').innerHTML+=a
}




//****************** RESPONSIVE AREA  ************** */
window.addEventListener('resize', function() {
    var screenSize = window.innerWidth;
    if (screenSize < 768) {
      var h4Element = document.querySelector('.ntt');
      var btnDati = this.document.getElementsByClassName('btnDati')
      if (h4Element) {
        h4Element.textContent = 'correzione';
      }
      for(let i=0; i<btnDati.length; ++i)
        btnDati[i].style.width = "90%"
        let esercizi = this.document.getElementsByClassName('tof')
        for(i=0; i<esercizi.length; ++i)
             esercizi[i].style.width = '85%'
    }else{
    var h4Element = document.querySelector('.ntt');
      var btnDati = this.document.getElementsByClassName('btnDati')
      if (h4Element) {
        h4Element.textContent = 'Correzione degli esercizi svolti da: '+profiloUtente.nome+' '+ profiloUtente.cognome;
      }
      let i=0
      for(; i<btnDati.length; ++i)
        btnDati[i].style.width = "40%"
      let esercizi = this.document.getElementsByClassName('tof')
      for(i=0; i<esercizi.length; ++i)
           esercizi[i].style.width = '33%'
      
    }
  });
  
