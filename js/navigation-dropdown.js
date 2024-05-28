export default class NavigationDropdown {
  render() {
    const links = document.createElement("div");
    links.classList.add("links");

    const links_title = [
      Object.assign(document.createElement("div"), {
        innerHTML: `
          <span>Esercizi</span>
          <a href="/svolgi-esercizi">Svolgi</a>           
          <a href="/correzioni">Correzioni</a>           
          <a href="/aggiungi-esercizio">Aggiungi nuovo</a>           
        `,
      }),
      Object.assign(document.createElement("a"), {
        textContent: "Drive",
        href: "/drive",
      }),
      Object.assign(document.createElement("a"), {
        textContent: "Forum",
        href: "/forum",
      }),
      Object.assign(document.createElement("a"), {
        textContent: "Cerca",
        href: "/ricerca",
      }),
      Object.assign(document.createElement("a"), {
        textContent: "Login",
        href: "/login",
      }),
    ];

    links_title.forEach((link) => {
      links.appendChild(link);
    });

    return links;
  }
}
