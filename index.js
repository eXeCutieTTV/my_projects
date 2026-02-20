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
        desc: "..."
    }
}
const website_gallery = document.getElementById("website_gallery");
for (const [key, value] of Object.entries(websites)) {
    const div = document.createElement("div");
    div.innerHTML = `
    <a class="website_entry_a">
        <img src="${value.icon}" class="website_entry_icon">
        <!--created by ${value.credit || "me"}-->
    </a>
    <a href="${value.url}"
    target="_blank"
    rel="noopener noreferrer">
        <div class="website_entry_label">${key}</div>
    </a>
    `;
    div.classList.add("website_entry");
    website_gallery.appendChild(div);
    //elements^^
    //modal vv
    const modal = document.createElement("div");
    modal.id = "modal";
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
        position: "relative"
    });

    const modalClose = document.createElement("span");
    modalClose.innerHTML = "&times;";
    Object.assign(modalClose.style, {
        position: "absolute",
        right: "15px",
        top: "10px",
        fontSize: "28px",
        cursor: "pointer"
    });

    const modalBody = document.createElement("div");
    modalContent.appendChild(modalClose);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Modal close events
    modalClose.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
    // Click opens modal
    div.querySelector("img").addEventListener("click", () => {
        modalBody.innerHTML = `
        <h2 style="margin-top:0;">${key}</h2>
        <div style="display: flex; gap: 10px;">
            <div style="flex:.3;">
                <a href="${value.url}" 
                target="_blank"
                rel="noopener noreferrer">
                    <img src="${value.icon}" style="border-radius:15px;">
                </a>
            </div>
            <div style="flex:auto;">${value.desc}</div>
        </div>`;
        Object.assign(modal.style,{
            display: "flex",
            color: "var(--text2)"
        });
    });
}
