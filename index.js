const websites = {
    "Fafnir the Golden": {
        icon: "website_icons/draconic_icon.svg",
        credit: "'rhy' on discord",
        url: "https://executiettv.github.io/Fafnir-the-Golden/",
        desc: "..."
    },
    "Mangalist": {
        icon: "website_icons/漫画.svg",
        url: "https://executiettv.github.io/mangalist/",
        desc: "..."//make a "display pat" btn - just calling localstorage stored pat
    },
    "School Work, Notes & Overview": {
        icon: "website_icons/Lorem ipsum dolor sit amet_page-0001.jpg",
        url: "https://executiettv.github.io/my_projects/",
        desc: ""
    },
    "Anki decks(JSON)": {
        icon: "website_icons/anki.png",
        url: "https://executiettv.github.io/my_projects/",
        desc: "..."
    }
};

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

window.createModal = function createModal(options = {}) {
    const modal = document.createElement("div");
    if (options.id) modal.id = options.id;
    if (options.className) modal.className = options.className;

    Object.assign(modal.style, {
        display: "none",
        position: "fixed",
        zIndex: "1000",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    });

    const modalContent = document.createElement("div");
    Object.assign(modalContent.style, {
        backgroundColor: "rgb(203 178 178)",
        padding: "20px",
        maxWidth: "600px",
        width: "90%",
        borderRadius: "10px",
        maxHeight: "80%",
        overflowY: "auto",
        position: "relative",
        color: "var(--text2)",
    });

    const modalClose = document.createElement("span");
    modalClose.innerHTML = "&times;";
    Object.assign(modalClose.style, {
        position: "absolute",
        right: "15px",
        top: "10px",
        fontSize: "28px",
        cursor: "pointer",
    });

    const modalBody = document.createElement("div");
    modalContent.appendChild(modalClose);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const close = () => {
        modal.style.display = "none";
    };

    const setContent = (content) => {
        if (typeof content === "string") {
            modalBody.innerHTML = content;
            return;
        }
        modalBody.replaceChildren(content);
    };

    const open = (content) => {
        setContent(content);
        modal.style.display = "flex";
    };

    modalClose.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) close();
    });

    return { modal, modalBody, open, close, setContent };
};

function buildWebsiteModalHtml(name, value) {
    return `
        <h2 style="margin-top:0;">${escapeHtml(name)}</h2>
        <div style="display:flex; gap:10px;">
            <div style="flex:.3;">
                <a href="${escapeHtml(value.url)}" target="_blank" rel="noopener noreferrer" style="justify-self:center;">
                    <img src="${escapeHtml(value.icon)}" style="border-radius:15px; height: 256px;">
                </a>
            </div>
            <div style="flex:auto;">${escapeHtml(value.desc || "")}</div>
        </div>`;
}

const projectModal = window.createModal({ id: "project_modal" });
window.showProjectModal = projectModal.open;
window.closeProjectModal = projectModal.close;

const websiteGallery = document.getElementById("website_gallery");
for (const [key, value] of Object.entries(websites)) {
    const div = document.createElement("div");
    div.innerHTML = `
    <a class="website_entry_a" style="justify-self:center;">
        <img src="${escapeHtml(value.icon)}" class="website_entry_icon">
        <!--created by ${escapeHtml(value.credit || "me")}-->
    </a>
    <a href="${escapeHtml(value.url)}"
    target="_blank"
    rel="noopener noreferrer">
        <div class="website_entry_label">${escapeHtml(key)}</div>
    </a>
    `;
    div.classList.add("website_entry");
    websiteGallery.appendChild(div);

    div.querySelector("img").addEventListener("click", () => {
        projectModal.open(buildWebsiteModalHtml(key, value));
    });
}

// "other" entries are intentionally fully custom.
// Use document.querySelectorAll(".other_entry")[index] and open any structure you want.
//
// Example:
// const other0 = document.querySelectorAll(".other_entry")[0];
// other0.addEventListener("click", (e) => {
//     if (!e.target.closest(".website_entry_a, .website_entry_icon")) return;
//     e.preventDefault();
//     window.showProjectModal(`
//         <h2 style="margin-top:0;">Unique Modal 0</h2>
//         <p>Completely custom HTML content.</p>
//         <button onclick="window.closeProjectModal()">Close from content</button>
//     `);
// });

window.bindOtherModal = function bindOtherModal(index, renderContent) {
    const entry = document.querySelectorAll(".other_entry")[index];
    if (!entry || typeof renderContent !== "function") return null;

    const handler = (e) => {
        if (!e.target.closest(".other_entry_a, .other_entry_icon")) return;
        e.preventDefault();
        projectModal.open(renderContent({ entry, event: e, escapeHtml }));
    };

    entry.addEventListener("click", handler);
    return () => entry.removeEventListener("click", handler);
};

const others = document.querySelectorAll(".other_entry");
others[0].addEventListener("click", (e) => {
    if (!e.target.closest(".other_entry_a, .other_entry_icon")) return;
    e.preventDefault();
    window.showProjectModal(`
        <h2 style="margin-top:0;">${others[0].dataset.modalTitle}</h2>
        <div style="display:flex; gap:10px;">
            <div style="flex:.3;">
                <a href="${others[0].dataset.modalUrl}" target="_blank" rel="noopener noreferrer" style="justify-self:center;">
                    <img src="${others[0].dataset.modalImg}" style="border-radius:15px; height: 256px;">
                </a>
            </div>
            <div style="flex:auto;">${others[0].dataset.modalDesc}</div>
        </div>
    `);
});
others[1].addEventListener("click", (e) => {
    if (!e.target.closest(".other_entry_a, .other_entry_icon")) return;
    e.preventDefault();
    window.showProjectModal(`
        <h2 style="margin-top:0;">${others[1].dataset.modalTitle}</h2>
        <div style="display:flex; gap:10px;">
            <div style="flex:.3;">
                <a href="${others[1].dataset.modalUrl}" target="_blank" rel="noopener noreferrer" style="justify-self:center;">
                    <img src="${others[1].dataset.modalImg}" style="border-radius:15px; height: 256px;">
                </a>
            </div>
            <div style="flex:auto;">${others[1].dataset.modalDesc}</div>
        </div>
    `);
});