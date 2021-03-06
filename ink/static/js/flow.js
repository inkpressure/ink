class ink {
  static ID = 0;
  static INKS;
  constructor(color) {
    ink.ID += 1;
    this.id = ink.ID;
    this.color = color;
    this.type = "Single";
    this.name = this.color.hexString;
    this.phase = 0;
    this.count = 1;
    if (!ink.INKS) ink.INKS = {};
    ink.INKS[ink.ID] = this;
    this.display();
  }
  changeCount(c) {
    if (c < 1 && confirm("Are you sure?")) {
      this.remove();
    }
    this.count = c;
  }
  componentToHex(c) {
    var hex = c.toString();
    return hex.length == 1 ? "0" + hex : hex;
  }
  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  display() {
    console.log(ink.INKS);
    if (this.phase == 0) {
      this.triage();
    } else if (this.phase == 1) {
      this.cart();
    }
  }
  teardown() {
    var x = ["ink-0-", "ink-1-"];
    for (var y in x) {
      var z = document.getElementById(x[y] + this.id);
      if (z) {
        z.parentNode.removeChild(z);
      }
    }
  }
  remove() {
    this.teardown();
    delete ink.INKS[this.id];
  }
  cart() {
    this.teardown();
    delete ink.INKS[this.id];
  }
  setType(value) {
    this.type = value;
    var us = document.getElementById("inktype-" + this.id);
    us.style.backgroundImage = "/static/images/" + this.type + ".svg";
  }
  triage() {
    this.phase = 0;
    this.teardown();
    var triage = document.getElementById("color-triage");
    triage.innerHTML +=
      '<div class="painttriage container-fluid" id="ink-0-' +
      this.id +
      '" style="background-color:' +
      this.color.hexString +
      '">' +
      '<div id="inktype-' +
      this.id +
      '" class="triagetype"></div>' +
      '<div class="highz">' +
      '<div class="paintacts">' +
      '<div class="remove"><a class="act remove" onclick="ink.INKS[' +
      this.id +
      '].remove();">Remove</a></div>' +
      '<div class="palette"><a class="act palette" onclick="ink.INKS[' +
      this.id +
      '].palette();">Add to Palette</a></div></div>' +
      "</div></div></div>";
    // Create only ONE Triage as the current color so user can pick to create palette
  }
  palette() {
    if (!this.name) {
      this.name = "#" + this.color.hexString;
    }
    this.phase = 1;
    this.teardown();
    var triage = document.getElementById("color-cart");
    triage.innerHTML +=`
      <div class="paintcart container" id="ink-0-${this.id}"
        style="background-color:${this.color.hexString}">
        <div class="paintname col">
          <input class="num" type="number" value="${this.count}"
             onchange="ink.INKS[${this.id}].changeCount(${this.value});" />' +
        <div class="paintname col">
      ${(this.color.hexString != this.name ? this.name + " / " : "") +
        this.color.hexString +
        " / " +
        this.type}
      </div>
      <div class="remove col">
        <a class="act remove" onclick="ink.INKS[${this.id+
      '].remove();">Remove</a></div>' +
      '<div class="cart col"><a class="act remove" onclick="ink.INKS[' +
      this.id +
      '].cart();">Add to Cart</a></div>' +
      '<div class="col paintname">' +
      '<input id="matte-' +
      this.id +
      '"  type="radio" name="texture" selected ' +
      'onchange="ink.INKS[' +
      this.id +
      '].setType(this.value);" value="Single" /> Single' +
      '<input id="glossy-' +
      this.id +

      '" type="radio" name="texture" ' +
      'onchange="ink.INKS[' +
      this.id +
      '].setType(this.value);" value="Glossy" /> Glossy' +
      '<input id="pearl-' +
      this.id +
      '" type="radio" name="texture" ' +
      'onchange="ink.INKS[' +
      this.id +
      '].setType(this.value);" value="Pearl" /> Pearl' +
      "</div>" +
      '<div class="paintname col"><input class="signup" id="label-' +
      this.id +
      '" placeholder="Name your paint!" ' +
      'onchange="ink.INKS[' +
      this.id +
      '].name = this.value"/></div>' +
      "</div>`;
  }
}
