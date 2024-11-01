let h = document.querySelector("#hello");

h.addEventListener( "click", function(e) {
    console.log(e);
    console.log(e.target.id);
});