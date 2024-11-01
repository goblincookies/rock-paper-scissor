let h = document.querySelector("#hello");
let pulsing = false;

h.addEventListener( "click", function(e) {
    console.log(e);
    console.log(e.target.id);
    pulsing = !pulsing;
    if (pulsing) {
        e.target.classList.add("pulse");
    } else e.target.classList.remove("pulse");
    
});