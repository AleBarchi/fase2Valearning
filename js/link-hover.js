export default class LinkHover {
  /**
   *
   * @param {HTMLSpanElement} target
   * @param {HTMLDivElement} dropdown
   */
  constructor(target, dropdown, host) {
    this.host = host;
    this.target = target;
    this.dropdown = dropdown;
    this.dropdownParent = this.dropdown.closest(".dropdown");
    this.divider = this.dropdownParent.previousElementSibling;
    this.otherLinks =
      this.divider.previousElementSibling.querySelectorAll("ul a");
  }

  enterToDropdown() {
    if (this.dropdown.classList.contains("active")) return;
    this.dropdown.classList.add("active");

    this.dropdownParent.style.display = "block";
    this.dropdownParent.style.borderBottom = "1px solid rgba(0, 0, 0, 0.15)";
    this.divider.classList.add("active");
    this.dropdown.style.display = "flex";

    gsap.from(this.dropdown, {
      y: "+=10",
      duration: 0.4,
    });
    gsap.to(this.dropdown, {
      opacity: 1,
      duration: 0.4,
    });
  }

  exitFromDropdown() {
    this.dropdownParent.style.display = "none";
    this.dropdownParent.style.borderBottom = "0";
    if (!this.host.classList.contains("fixed"))
      this.divider.classList.remove("active");
    this.dropdown.style.display = "none";
    this.dropdown.style.opacity = "0";
    this.dropdown.classList.remove("active");
  }

  listen() {
    this.target.addEventListener("mouseenter", this.enterToDropdown.bind(this));
    this.otherLinks.forEach((link) => {
      link.onmouseenter = this.exitFromDropdown.bind(this);
    });
    this.host.onmouseout = this.exitFromDropdown.bind(this);
  }
}
