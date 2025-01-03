var button = document.getElementById("button");
if (button) {
    button.addEventListener("click", function() {
        var anchor = document.querySelector("[data-scroll-to='navigationContainer']");
        if (anchor) {
            anchor.scrollIntoView({
                "block": "start",
                "behavior": "smooth"
            })
        }
    });
};


var planesText = document.getElementById("planesText");
if (planesText) {
    planesText.addEventListener("click", function() {
        var anchor = document.querySelector("[data-scroll-to='encuentraTuPlan']");
        if (anchor) {
            anchor.scrollIntoView({
                "block": "start",
                "behavior": "smooth"
            })
        }
    });
}

var planesText = document.getElementById("mejorNegocio");
if (planesText) {
    planesText.addEventListener("click", function() {
        var anchor = document.querySelector("[data-scroll-to='mejoraTuNegocio']");
        if (anchor) {
            anchor.scrollIntoView({
                "block": "start",
                "behavior": "smooth"
            })
        }
    });
}