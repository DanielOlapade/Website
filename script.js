const theme = document.getElementById("theme");
theme.addEventListener("change", () => {
    if (theme.checked){
        document.body.classList.add("darktheme");
        localStorage.setItem("theme","darktheme");
    } else{
        document.body.classList.remove("darktheme");
        localStorage.setItem("theme","whitetheme");
    }
});
let storedtheme = localStorage.getItem("theme");
if (storedtheme === "darktheme"){
    document.body.classList.add("darktheme")
    theme.checked = true;
} else{
    document.body.classList.remove("darktheme");
    theme.checkd = false;
};

const game = document.getElementById("game");
let title = true;
setInterval(() => {
    game.textContent = title ? "PLAY DEAD OR WOUNDED"  : "ITS'S A NUMBERS GAME. TRULY!";
    title = !title;
}, 3000);

const biosensor = document.getElementById("biosensor");
setInterval(() => {
    const randomindex = Math.floor(Math.random()*126) + 1;
    biosensor.src = `Biosensor Project/img (${randomindex}).jpg`;
}, 2000);

