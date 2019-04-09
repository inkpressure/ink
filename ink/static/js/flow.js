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
        this.hide = false;
        if (!ink.INKS) ink.INKS = {};
        for (var i in ink.INKS) {
            ink.INKS[i].hide = true;
            if (ink.INKS[i].phase == 0) {
                ink.INKS[i].phase = -1;
                ink.INKS[i].hide = true;
            }
        }
        ink.INKS[ink.ID] = this;
        this.triage();
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
        for (var y in ink.INKS) {
                ink.INKS[y].hide = true;
        }
        this.hide = false;
        var x = ['ink-0-','ink-1-'];
        for (var y in x) {
            console.log(''+x[y] + this.id)
            var z = document.getElementById(''+x[y] + this.id);
            console.log(''+z);
            if (z) { z.parentElement.removeChild(z); }
        }
    }
    remove() {
        ink.INKS[this.id].hide = true;
        this.teardown();
    }

    setType(value) {
        this.type = value;
        var us = document.getElementById('inktype-'+this.id);
        us.style.backgroundImage = '/static/images/'+this.type+'.png';
    }
    triage() {
        this.teardown();
        if (this.hide) { return; };
        var triage = document.getElementById('color-triage');
        triage.innerHTML =
                '<div class="painttriage container" id="ink-0-'+this.id+'" style="background-color:'+this.color.hexString+'">'
                +'<div id="inktype-'+this.id+'" class="triagetype"></div>'
                +'<div class="highz container">'
                +'<div class="paintname"><input class="signup" id="label-'+this.id+'" placeholder="Name your paint!" onchange="ink.INKS['+this.id+'].name = this.value"/></div>'
                +'<div class="paintname"><select>'
                +'<option id="matte-'+this.id+'" selected name="texture" onchange="ink.INKS['+this.id+'].setType(this.value);" value="Single"> Single</option>'
                +'<option id="glossy-'+this.id+'" name="texture" onchange="ink.INKS['+this.id+'].setType(this.value);" value="Glossy"> Glossy</option>'
                +'<option id="pearl-'+this.id+'" name="texture" onchange="ink.INKS['+this.id+'].setType(this.value);" value="Pearl"> Pearl</option>'
                +'</select></div>'
                +'<div class="paintacts">'
                +'<div class="remove"><a class="act remove" onclick="ink.INKS['+this.id+'].remove();">Remove</a></div>'
                +'<div class="cart"><a class="act cart" onclick="ink.INKS['+this.id+'].cart();">Add to Cart</a></div></div>'
                +'</div></div></div>';

    }
    cart() {
        if (this.hide) { return; };
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
