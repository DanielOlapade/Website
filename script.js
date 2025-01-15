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

let storedtheme = localStorage.getItem("theme");
if (storedtheme === "darktheme") {
    document.body.classList.add("darktheme")
    theme.checked = true;
} else {
    document.body.classList.remove("darktheme");
    theme.checked = false;
};

const biosensorProject = document.getElementById("biosensorProject");
setInterval(() => {
    const randomIndex = Math.floor(Math.random() * 126) + 1;
    biosensorProject.src = `biosensorproject/img(${randomIndex}).jpg`;
}, 2000);


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
        img.src = `${imagePath}(${i}).jpg`;
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
    if ((i === 24)) return "Exhibit alloted space";
    if ((i >= 19 && i <= 23) || (i === 15)) return "CAD render";
    if (i >= 1 && i <= 2) return "Exhbit presentation";
    if ((i >= 3 && i <= 14) || (i >= 16 && i <= 18)) return "Exhibit construction";
}
modalImages("biosensorProjectimgs", 126, "biosensorproject/img", getBiosensorDescription)
modalImages("exhibitImgs", 24, "exhibitproject/img", getExhibitDescription)

const exhibitModalBanner = document.getElementById("exhibitModalBanner");
const exhibitBannerLeft = document.getElementById("exhibitBannerLeft");
const exhibitBannerRight = document.getElementById("exhibitBannerRight");
const img = document.createElement("img");
let i = 1;
img.src = `exhibitproject/banner(${i}).jpeg`;
img.loading = "lazy"
exhibitModalBanner.appendChild(img);
exhibitBannerRight.addEventListener("click", () => {
    i++;
    if (i > 3) i = 1;
    img.src = `exhibitproject/banner(${i}).jpeg`;
});
exhibitBannerLeft.addEventListener("click", () => {
    i--;
    if (i < 1) i = 3;
    img.src = `exhibitproject/banner(${i}).jpeg`;
});

const info = document.getElementById("info");
const cancelBtn = document.getElementsByClassName("cancelBtn");
const aboutModal = document.getElementById("aboutModal");
const analysisProject = document.getElementById("analysisProject");
const analysisProjectModal = document.getElementById("analysisProjectModal");
const biosensorProjectmodal = document.getElementById("biosensorProjectmodal");
const projectModal = document.getElementsByClassName("projectModal");
const exhibitModal = document.getElementById("exhibitModal");
const exhibitProject = document.getElementById("exhibitProject");

function modaltoggle(modal, action) {
    if (action === "show") {
        modal.classList.add("show");
        overlay.classList.add("show");

    } else if (action === "hide") {
        modal.classList.remove("show");
        overlay.classList.remove("show");
    }
}

info.addEventListener("click", () => modaltoggle(aboutModal, "show"));
analysisProject.addEventListener("click", () => modaltoggle(analysisProjectModal, "show"));
biosensorProject.addEventListener("click", () => { modaltoggle(biosensorProjectmodal, "show") });
exhibitProject.addEventListener("click", () => modaltoggle(exhibitModal, "show"));

Array.from(cancelBtn).forEach(el => el.addEventListener("click", () => {
    modaltoggle(aboutModal, "hide")
    modaltoggle(exhibitModal, "hide")
    modaltoggle(biosensorProjectmodal, "hide")
    modaltoggle(analysisProjectModal, "hide")
}));

overlay.addEventListener("click", () => {
    modaltoggle(aboutModal, "hide")
    modaltoggle(exhibitModal, "hide")
    modaltoggle(biosensorProjectmodal, "hide")
    modaltoggle(analysisProjectModal, "hide")
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modaltoggle(aboutModal, "hide")
        modaltoggle(exhibitModal, "hide")
        modaltoggle(biosensorProjectmodal, "hide")
        modaltoggle(analysisProjectModal, "hide")
    }
});

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

let intro = document.getElementById("intro");
let facts = [
    "Hi, I'm Daniel.", "An Engineer-in-Training.", "A seeker of P Eng. level greatness.",
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
let currentFactText = "";
let typingInterval;
let usedFacts = [];
let isVisible = true;

function typingFact(factText) {
    currentFactText = factText;
    factCharIndex = 0;
    intro.textContent = "";

    typingInterval = setInterval(() => {
        if (factCharIndex < currentFactText.length) {
            intro.textContent += currentFactText[factCharIndex];
            factCharIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

function displayFacts() {
    if (isVisible) {
        if (usedFacts.length === facts.length) {
            usedFacts = [];
        }
        let index;
        if (usedFacts.length === 0) {
            index = 0;
        } else if (usedFacts.length === 1) {
            index = 1;
        } else {
            do {
                index = Math.floor(Math.random() * facts.length);
            } while (usedFacts.includes(index));
        }
        const factText = facts[index];
        typingFact(factText);
        usedFacts.push(index);
        setTimeout(() => displayFacts(), factText.length * 200 + 5000);
    }
}

window.addEventListener("focus", () => {
    isVisible = true;
    if (factCharIndex < currentFactText.length) {
        typingInterval = setInterval(() => {
            if (factCharIndex < currentFactText.length) {
                intro.textContent += currentFactText[factCharIndex];
                factCharIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    } else {
        displayFacts();
    }
});

window.addEventListener("blur", () => {
    isVisible = false;
    clearInterval(typingInterval);
});

displayFacts();

document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} DANIEL OLAPADE`;
