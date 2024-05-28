export default class EserciziDropdown {
  createImg() {
    const img = document.createElement("img");
    img.src = "img/esercises.svg";
    img.alt = "";
    return img;
  }

  createMenu() {
    const menu = document.createDocumentFragment();

    const list = document.createElement("ul");
    list.classList.add("list");
    let listItems = [
      Object.assign(document.createElement("span"), {
        textContent: "STUDENTE",
      }),

      Object.assign(document.createElement("a"), {
        textContent: "Svolgi",
        href: "/svolgi-esercizi",
        id: "svolgi-esercizi-link",
      }),

      Object.assign(document.createElement("a"), {
        textContent: "Correzioni",
        href: "/correzioni",
        id: "correzioni-link",
      }),

      Object.assign(document.createElement("span"), {
        textContent: "DOCENTE",
      }),

      Object.assign(document.createElement("a"), {
        textContent: "Inserisci nuovo",
        href: "/inserisci-esercizio",
        id: "inserisci-esercizio-link",
      }),
    ];

    listItems.forEach((item) => {
      list.appendChild(item);
    });

    const contents = document.createElement("div");
    contents.classList.add("contents");
    contents.textContent =
      "Matieniti allenato con numerosi esercizi con soluzione presenti sul sito, oppure aiutaci ad ampliare le risorse presenti!";
    contents.setAttribute("data-current", "esercizi");

    menu.appendChild(list);
    menu.appendChild(contents);

    // Aggiunge gli eventi
    listItems = listItems.filter((item) => item.tagName === "A");
    let descriptions = {
      "svolgi-esercizi-link":
        "Allenati tra le centinaia di open cloze, word formations, filling the gaps e molto altro",
      "correzioni-link":
        "Impara dai tuoi sbagli in esercizi passati. Gli errori ti rendono più forte.",
      "inserisci-esercizio-link":
        "Aiutaci a creare un archivio sempre più ricco di materiale e qualità.",
    };

    listItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        if (contents.getAttribute("data-current") === item.id) return;
        contents.setAttribute("data-current", item.id);

        contents.style.opacity = 0;
        contents.textContent = descriptions[item.id];

        gsap.from(contents, {
          y: "+=20",
          duration: 0.4,
        });

        gsap.to(contents, {
          opacity: 1,
          y: 0,
          duration: 0.4,
        });
      });
    });

    return menu;
  }

  render() {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-container", "dropdown__esercizi");
    dropdown.style.display = "none";

    dropdown.appendChild(this.createMenu());
    dropdown.appendChild(this.createImg());

    return dropdown;
  }
}
