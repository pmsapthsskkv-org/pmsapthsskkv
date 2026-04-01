/* 🚫 Disable Right Click */
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

/* 🚫 Disable Key Shortcuts */
document.addEventListener("keydown", function(e) {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
        redirect();
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        redirect();
    }

    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        redirect();
    }

    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        redirect();
    }

    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        redirect();
    }

});

/* 🚫 DevTools Detection (Resize Trick) */
setInterval(function() {
    if (window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160) {
        redirect();
    }
}, 1000);

/* 🔁 Redirect Function */
function redirect() {
    window.location.href = "https://theajack.github.io/";
}