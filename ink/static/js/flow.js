class ink {
    static ID = 0;
    static INKS;
    constructor(color) {
        ink.ID += 1;
        this.id = ink.ID;
        this.color = color;
        this.type = 'Single';
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
        var x = ['ink-0-','ink-1-'];
        for (var y in x) {
            var z = document.getElementById(x[y] + this.id);
            if (z) { z.parentNode.removeChild(z); }
        }
    }
    remove() {
        this.teardown();
        delete(ink.INKS[this.id]);
    }
    triage() {
        this.phase = 0;
        this.teardown();
        var triage = document.getElementById('color-triage');
        triage.innerHTML += '<div class="painttriage container" id="ink-0-'+this.id+'" style="background-color:'+this.color.hexString+'">'
                + '<div class="paintname"><input class="signup" id="label-'+this.id+'" placeholder="Name your paint!" onchange="ink.INKS['+this.id+'].name = this.value" /></div>'
                +'<div class="paintname"><input id="matte-'+this.id+'" selected type="radio" name="texture" onchange="ink.INKS['+this.id+'].type = this.value;"/> Single'
                +'<input id="glossy-'+this.id+'" type="radio" name="texture" onchange="ink.INKS['+this.id+'].type = this.value;"/> Glossy'
                +'<input id="pearl-'+this.id+'" type="radio" name="texture" onchange="ink.INKS['+this.id+'].type = this.value;"/> Pearl'
                +'</div>'
                +'<div class="paintacts">'
                +'<div class="remove"><a class="act remove" onclick="ink.INKS['+this.id+'].remove();">Remove</a></div>'
                +'<div class="cart"><a class="act cart" onclick="ink.INKS['+this.id+'].cart();">Add to Cart</a></div></div>'
                +'</div></div>';

    }
    cart() {
        if (!this.name) {
            this.name = '#' + this.color.hexString;
        }
        this.phase = 1;
        this.teardown();
        var triage = document.getElementById('color-cart');
        triage.innerHTML += '<div class="paintcart container" id="ink-0-'+this.id+'" style="background-color:'+this.color.hexString+'">'
                + '<div class="paintname">'
                + '<input class="num" type="number" value="'+this.count+'" onchange="ink.INKS['+this.id+'].changeCount(this.value);" />'
                +'<div class="paintname container">'+((this.color.hexString != this.name)?this.name+' / ':'')+this.color.hexString+' / '+this.type+'</div>'
                +'</div>';
    }

};
