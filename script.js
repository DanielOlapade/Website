// theme change
const theme = document.getElementById("theme");
theme.addEventListener("change", () => {
    if (theme.checked) {
        document.body.classList.add("darktheme");
        localStorage.setItem("theme", "darktheme");
    } else {
        document.body.classList.remove("darktheme");
        localStorage.setItem("theme", "whitetheme");
    }
});

// theme store
let storedtheme = localStorage.getItem("theme");
if (storedtheme === "darktheme") {
    document.body.classList.add("darktheme")
    theme.checked = true;
} else {
    document.body.classList.remove("darktheme");
    theme.checked = false;
};

// game section
const game = document.getElementById("game");
let title = true;
setInterval(() => {
    game.textContent = title ? "PLAY DEAD OR WOUNDED" : "ITS'S A NUMBERS GAME. TRULY!";
    title = !title;
}, 3000);

//biosensor random images
const bioproj = document.getElementById("bioproj");
setInterval(() => {
    const randomindex = Math.floor(Math.random() * 126) + 1;
    bioproj.src = `Biosensor Project/img (${randomindex}).jpg`;
}, 2000);

//bioproj img
const bioprojimgs = document.getElementById("bioprojimgs");
for (let i = 1; i <= 126; i++) {
    const des = document.createElement("div");
    let description = getdescription(i);
    des.textContent = description;
    des.classList.add("bioprojimgsdes");

    const bioprojimgscont = document.createElement("div");
    bioprojimgscont.classList.add("bioprojimgscont");
    const img = document.createElement("img");
    img.src = `Biosensor Project/img (${i}).jpg`;
    img.loading = "lazy";

    bioprojimgscont.appendChild(img);
    bioprojimgscont.appendChild(des);
    bioprojimgs.appendChild(bioprojimgscont);
};


function getdescription(i) {
    if (i >= 1 && i <= 5) return "Antibacterial solution test";
    if (i >= 6 && i <= 7) return "Vashe antibacterial solution";
    if (i >= 8 && i <= 24) return "Antibacterial solution test";
    if (i >= 25 && i <= 26) return "Test Methodology";
    if (i >= 27 && i <= 28) return "Antibacterial solution test";
    if (i >= 29 && i <= 30) return "Bacteria test with foam dressing";
    if (i === 31) return "Ex vivo porcine test";
    if (i >= 32 && i <= 33) return "Agar bacteria test";
    if (i >= 34 && i <= 37) return "Ex vivo porcine test";
    if (i >= 38 && i <= 40) return "Wound fluid test with bacteria";
    if (i >= 41 && i <= 46) return "Ex vivo porcine test";
    if (i === 47) return "Qwick foam dressing";
    if (i === 48) return "Cura foam dressing";
    if (i === 49) return "Hydrofera foam dressing";
    if (i === 50) return "Agar bacteria test";
    if (i >= 51 && i <= 69) return "Wound fluid penetration test";
    if (i === 70) return "Wound fluid test with bacteria";
    if (i >= 71 && i <= 76) return "Ex vivo porcine test";
    if (i >= 77 && i <= 91) return "Wound fluid test with bacteria";
    if (i >= 92 && i <= 95) return "Agar bacteria test";
    if (i >= 96 && i <= 110) return "Wound fluid test with bacteria";
    if (i >= 111 && i <= 115) return "Agar bacteria test";
    if (i >= 116 && i <= 118) return "Wound fluid penetration test";
    if (i === 119) return "Biosensor";
    if (i >= 120 && i <= 125) return "Agar bacteria test";
    if (i === 126) return "Skin graft printing (New Project)";
}

// modal selection
const info = document.getElementById("info");
const cancel = document.getElementsByClassName("cancel")
const aboutmodal = document.getElementById("aboutmodal")
const overlay = document.getElementsByClassName("overlay")
const algoproj = document.getElementById("algoproj")
const algoprojmodal = document.getElementById("algoprojmodal")
const bioprojmodal = document.getElementById("bioprojmodal")
const projmodals = document.getElementsByClassName("projmodals")


function modaltoggle(modal, action) {
    if (action === "show") {
        modal.classList.add("show");
        Array.from(overlay).forEach(el => el.classList.add("show"));

    } else if (action === "hide") {
        modal.classList.remove("show");
        Array.from(overlay).forEach(el => el.classList.remove("show"));
    }
}

info.addEventListener("click", () => modaltoggle(aboutmodal, "show"));
algoproj.addEventListener("click", () => modaltoggle(algoprojmodal, "show"));
bioproj.addEventListener("click", () => {
    modaltoggle(bioprojmodal, "show")
});

Array.from(cancel).forEach(el => el.addEventListener("click", () => {
    modaltoggle(aboutmodal, "hide");
    modaltoggle(bioprojmodal, "hide");
    modaltoggle(algoprojmodal, "hide");

}));
Array.from(overlay).forEach(el => el.addEventListener("click", () => {
    modaltoggle(aboutmodal, "hide");
    modaltoggle(bioprojmodal, "hide");
    modaltoggle(algoprojmodal, "hide");
}));


function observer(thresholdval) {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("inview");
                entry.target.classList.remove("outview-top");
            } else {
                if (entry.boundingClientRect.top < 0) {
                    entry.target.classList.add("outview-top");
                }
                entry.target.classList.remove("inview");
            }
        });
    }, {threshold: thresholdval});
}
const views = document.querySelectorAll(".view");
const viewobserver = observer(0);
views.forEach((view) => {
    viewobserver.observe(view);
});