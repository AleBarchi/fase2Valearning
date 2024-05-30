/* TAG CLICKABILE */

class Tag1 extends HTMLElement {
    connectedCallback() {
        /* style */
        this.innerHTML = `<style>
        val-tag1.spanClickArg{
            background-color: #506aff;
            color: white !important;
            padding-left: 5.5vh !important;
        }
        
        val-tag1.spanClickArg > .iconTag{
            height: 200% !important;
            visibility: visible !important;
        }
        
        val-tag1{
            box-sizing: border-box;
            position: relative;
            margin: 0.7vh 0.7vh;
            display: flex;
            align-items: center;
            padding: 1vw;
            width: fit-content;
            height: 4vh;
            font-size: 2vh;
            border: 0.3vh solid #506aff;
            color: #506aff;
            border-radius: 1.5vh;
            transition: transform 0.2s;
            cursor: pointer;
            position: relative;
        }
        
        val-tag1 > .iconTag{
            visibility: hidden;
            font-size: 6vh;
            top: -0.5vh;
            left: 0;
            transform: scaleY(110%);
            position: absolute;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            width: fit-content;
            padding: 0;
            height: 0;
            overflow: hidden;
            color: #000080;
            font-variation-settings: 'FILL' 1;
            transition: height 0.5s;
        }
        
        val-tag1:hover, .type > span:hover{
            transform: scale(106%);
        }
        `;

        /* html immagine del bookmark */
        let bookmark = document.createElement("span");

        bookmark.classList.add("material-symbols-rounded");
        bookmark.textContent = "bookmark";
        bookmark.classList.add("iconTag");

        this.appendChild(bookmark);

        this.innerHTML += this.value;
        
        /* togglo la classe se schiaccio */
        this.addEventListener("click", function () {
            this.classList.toggle("spanClickArg");
        });
    }
}

customElements.define("val-tag1", Tag1);

// /* contenitore da cui appendere il componente */
// let contenitore = document.getElementById("contenitore");

// /* CON IL .value SI METTE IL VALORE CHE SI VUOLE VISUALIZZARE */
// let tag1 = document.createElement("val-tag1");
// tag1.value = "CIAO";

// contenitore.appendChild(tag1);