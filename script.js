// theme change
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

// theme store
let storedtheme = localStorage.getItem("theme");
if (storedtheme === "darktheme"){
    document.body.classList.add("darktheme")
    theme.checked = true;
} else{
    document.body.classList.remove("darktheme");
    theme.checkd = false;
};

// game section
const game = document.getElementById("game");
let title = true;
setInterval(() => {
    game.textContent = title ? "PLAY DEAD OR WOUNDED"  : "ITS'S A NUMBERS GAME. TRULY!";
    title = !title;
}, 3000);

//biosensor random images
const biosensor = document.getElementById("biosensor");
setInterval(() => {
    const randomindex = Math.floor(Math.random()*126) + 1;
    biosensor.src = `Biosensor Project/img (${randomindex}).jpg`;
}, 2000);


// modal selection
const info  = document.getElementById("info");
const cancel = document.getElementsByClassName("cancel")
const aboutmodal = document.getElementById("aboutmodal")
const overlay = document.getElementsByClassName("overlay")
const algoproj = document.getElementById("algoproj")
const algoprojmodal = document.getElementById("algoprojmodal")
const projmodals = document.getElementsByClassName("projmodals")


function modaltoggle(modal,action){
    if (action === "show"){
        modal.classList.add("show");
        Array.from(overlay).forEach(el => el.classList.add("show"));

    } else if (action === "hide") {
        aboutmodal.classList.remove("show");
        Array.from(overlay).forEach(el => el.classList.remove("show"));
        Array.from(projmodals).forEach(el => el.classList.remove("show"));               
    }
}

info.addEventListener("click", () => modaltoggle(aboutmodal,"show"));
algoproj.addEventListener("click", () => modaltoggle(algoprojmodal,"show")); 

Array.from(cancel).forEach(el => el.addEventListener("click", () => {
    modaltoggle(aboutmodal,"hide");
    modaltoggle(algoprojmodal,"hide"); 
}));
Array.from(overlay).forEach(el => el.addEventListener("click", () => {
    modaltoggle(aboutmodal,"hide");
    modaltoggle(algoprojmodal,"hide"); 
}));