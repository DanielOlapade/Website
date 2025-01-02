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


// theme storage
let storedtheme = localStorage.getItem("theme");
if (storedtheme === "darktheme") {
    document.body.classList.add("darktheme")
    theme.checked = true;
} else {
    document.body.classList.remove("darktheme");
    theme.checked = false;
};


// playGame section
const playGame = document.getElementById("playGame");
const gameIntro = document.getElementById("gameIntro");
const gameTitle = document.getElementById("gameTitle");
const gameMotto = document.getElementById("gameMotto");
const gameContent = document.getElementsByClassName("gameContent")
const gameCloseBtn = document.getElementById("closeGameModal");

let title = true;
setInterval(() => {
    playGame.textContent = title ? "CLICK TO PLAY DEAD OR WOUNDED" : "ITS'S A NUMBERS GAME";
    title = !title;
}, 3000);

function resetVisibility (el) {
    el.style.visibility = "hidden";
    el.style.opacity = 0;
}

function applyVisibility (el) {
    el.style.visibility = "visible";
    el.style.opacity = 1;
}
function applyAnimation (el, animation) {
    el.style.animation = animation;
}

function resetAnimation (el) {
    el.style.animation = "none";
    el.style.opacity = 0;
    el.offsetHeight;
}

// //gameIntro
function startgame() {
    Array.from(gameContent).forEach(el => resetVisibility(el));
    applyVisibility (gameIntro);
    setTimeout(() => {
        applyAnimation(gameTitle, "leftSlideIn 1.25s ease forwards, glow 2.25s ease-in-out infinite, flicker 0.5s 1.25s");
        applyAnimation(gameMotto, "rightSlideIn 1.25s ease forwards, pulse 1s 1.25s ease-in-out");
    }, 500);
    setTimeout(()=>{
        gameIntro.style.transition = "opacity 0.5s ease-out";
        gameIntro.style.opacity = 0;
    }, 3000);
    setTimeout(()=>{
        resetVisibility(gameIntro);
        Array.from(gameContent).forEach(el => applyVisibility (el));
        Array.from(gameContent).forEach(el => applyAnimation (el,"opacity 1s ease-in-out"));
        ;
    }, 3500);
}
playGame.addEventListener("click", startgame);

const exitGameModal = gameCloseBtn || overlay;
exitGameModal.addEventListener("click", ()=> {
    resetAnimation (gameTitle);
    resetAnimation (gameMotto);
})

//game

//timer
function startCountDown (countDown) {
    const timeDisplay = document.getElementById("timeLeft");

    const interval = setInterval(() => {
        if (countDown <= 0) {
            clearInterval(interval);
            timeDisplay.textContent = "00:00:00";
            return;
        }

        const hours = Math.floor(countDown/3600);
        const mins = Math.floor((countDown % 3600) / 60);
        const secs = countDown % 60;
        timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        countDown--;

    }, 1000)
}
startCountDown (60);


//biosensor random images
const biosensorProject = document.getElementById("biosensorProject");
setInterval(() => {
    const randomIndex = Math.floor(Math.random() * 126) + 1;
    biosensorProject.src = `Biosensor Project/img (${randomIndex}).jpg`;
}, 2000);


//bio and exhibit modal images
function modalImages(elementId, numImages, imagePath, getDescription) {
    const modalID = document.getElementById(elementId);
    for (let i = 1; i <= numImages; i++) {
        const descriptionDiv = document.createElement("div");
        let description = getDescription(i);
        descriptionDiv.textContent = description;
        descriptionDiv.classList.add("modalImgDescription");

        const modalImgContainer = document.createElement("div");
        modalImgContainer.classList.add("modalImgContainer");
        modalImgContainer.classList.add("view");
        modalImgContainer.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
        const img = document.createElement("img");
        img.src = `${imagePath} (${i}).jpg`;
        img.loading = "lazy";

        modalImgContainer.appendChild(img);
        modalImgContainer.appendChild(descriptionDiv);
        modalID.appendChild(modalImgContainer);
    }
}

function getBiosensorDescription(i) {
    if ((i >= 1 && i <= 5) || (i >= 8 && i <= 24) || (i >= 27 && i <= 28)) return "Antibacterial solution test";
    if (i >= 6 && i <= 7) return "Vashe antibacterial solution";
    if (i >= 25 && i <= 26) return "Test Methodology";
    if (i >= 29 && i <= 30) return "Bacteria test with foam dressing";
    if (i === 31 || (i >= 34 && i <= 37) || (i >= 41 && i <= 46) || (i >= 71 && i <= 76)) return "Ex vivo porcine test";
    if ((i >= 32 && i <= 33) || i === 50 || (i >= 92 && i <= 95) || (i >= 111 && i <= 115) || (i >= 120 && i <= 125)) return "Agar bacteria test";
    if ((i >= 38 && i <= 40) || i === 70 || (i >= 77 && i <= 91) || (i >= 96 && i <= 110)) return "Wound fluid test with bacteria";
    if ((i >= 51 && i <= 69) || (i >= 116 && i <= 118)) return "Wound fluid penetration test";
    if (i === 47) return "Qwick foam dressing";
    if (i === 48) return "Cura foam dressing";
    if (i === 49) return "Hydrofera foam dressing";
    if (i === 119) return "Biosensor";
    if (i === 126) return "Skin graft printing (New Project)";
}

function getExhibitDescription(i) {
    if ((i >= 1 && i <= 2) || (i >= 5 && i <= 8) || (i >= 28 && i <= 29) || (i === 23)) return "CAD render";
    if (i >= 9 && i <= 10) return "Exhbit presentation";
    if ((i >= 11 && i <= 22) || (i >= 24 && i <= 29)) return "Exhibit construction";
    if ((i >= 11 && i <= 22) || (i >= 24 && i <= 29)) return "Exhibit construction";
    if ((i === 30)) return "Exhibit alloted space";
    if ((i === 3 || 4 || 26)) return "CAD Drawing";
}
modalImages("biosensorProjectimgs", 126, "Biosensor Project/img", getBiosensorDescription)
modalImages("exhibitImgs", 30, "Exhibit Project/img", getExhibitDescription)

//exhibit modal banner
const exhibitModalBanner = document.getElementById("exhibitModalBanner");
const exhibitBannerLeft = document.getElementById("exhibitBannerLeft");
const exhibitBannerRight = document.getElementById("exhibitBannerRight");
const img = document.createElement("img");
let i = 1;
img.src = `Exhibit Project/banner (${i}).jpeg`;
img.loading = "lazy"
exhibitModalBanner.appendChild(img);
exhibitBannerRight.addEventListener("click", () => {
    i++;
    if (i > 4) i = 1;
    img.src = `Exhibit Project/banner (${i}).jpeg`;
});
exhibitBannerLeft.addEventListener("click", () => {
    i--;
    if (i < 1) i = 4;
    img.src = `Exhibit Project/banner (${i}).jpeg`;
});

// modal selection
const info = document.getElementById("info");
const cancelBtn = document.getElementsByClassName("cancelBtn");
const aboutModal = document.getElementById("aboutModal");
const overlay = document.getElementsByClassName("overlay");
const analysisProject = document.getElementById("analysisProject");
const analysisProjectModal = document.getElementById("analysisProjectModal");
const biosensorProjectmodal = document.getElementById("biosensorProjectmodal");
const projectModal = document.getElementsByClassName("projectModal");
const exhibitModal = document.getElementById("exhibitModal");
const exhibitProject = document.getElementById("exhibitProject");
const gameModal = document.getElementById("gameModal");

function modaltoggle(modal, action) {
    if (action === "show") {
        modal.classList.add("show");
        Array.from(overlay).forEach(el => el.classList.add("show"));

    } else if (action === "hide") {
        modal.classList.remove("show");
        Array.from(overlay).forEach(el => el.classList.remove("show"));
    }
}

info.addEventListener("click", () => modaltoggle(aboutModal, "show"));
analysisProject.addEventListener("click", () => modaltoggle(analysisProjectModal, "show"));
biosensorProject.addEventListener("click", () => { modaltoggle(biosensorProjectmodal, "show") });
exhibitProject.addEventListener("click", () => modaltoggle(exhibitModal, "show"));
playGame.addEventListener("click", () => modaltoggle(gameModal, "show"));

Array.from(cancelBtn).forEach(el => el.addEventListener("click", () => {
    Array.from(projectModal).forEach(el => modaltoggle(el, "hide"));
    modaltoggle(aboutModal, "hide")
}));

Array.from(overlay).forEach(el => el.addEventListener("click", () => {
    Array.from(projectModal).forEach(el => modaltoggle(el, "hide"));
    modaltoggle(aboutModal, "hide")
}));


//scroll animation
function observer(thresholdval) {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("inview");
                entry.target.classList.remove("outviewTop");
            } else {
                if (entry.boundingClientRect.top < 0) {
                    entry.target.classList.add("outviewTop");
                }
                entry.target.classList.remove("inview");
            }
        });
    }, { threshold: thresholdval });
}
const views = document.querySelectorAll(".view");
const viewobserver = observer(0);
views.forEach((view) => {
    viewobserver.observe(view);
});

let myName = document.getElementById("myName")
let facts = [
    "Hi, i'm Daniel.", "An Engineer-in-Training.", "A seeker of P Eng. level greatness.",
    "A new plant parent.", "A croissant connoisseur.", "A meat pizza lover.",
    "A believer in third chances.", "An avid coffee drinker.", "A wannabe stand-up comedian.",
    "A collector of interesting facts.", "A fan of all things science.",
    "A philosopher at heart.", "A dog person (who secretly loves cats).",
    "A defender of pineapple on pizza.", "A globe-trotter on a mission.",
    "A concert-goer, rain or shine.", "Creator of this semi-good looking site.",
    "A weekend soccer player.", "A fashionista on a budget.", "A pancake flipping pro.",
    "A cold shower enthusiast.", "A morning person.", "A 6-foot tall giant.",
    "A passionate advocate for sustainability.", "A coffee-shop explorer.",
    "A strategic chess competitor.",
];
let factCharIndex = 0;
function typingFact(myName, factText) {
    factCharIndex = 0;
    myName.textContent = "";
    let typingInterval = setInterval(() => {
        if (factCharIndex < factText.length) {
            myName.textContent += factText[factCharIndex];
            factCharIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, 95);
};
let usedFacts = [];
function displayFacts() {
    if (usedFacts.length === facts.length) {
        usedFacts = [];
    }
    let index;
    if (usedFacts.length === 0) {
        index = 0;
    } else {
        do {
            index = Math.floor(Math.random() * facts.length);
        } while (usedFacts.includes(index))
    }
    const factText = facts[index];
    typingFact(myName, factText);
    console.log(factText);
    setTimeout(() => {
        usedFacts.push(index);
        displayFacts();
    }, factText.length * 95 + 6000);
}
displayFacts()