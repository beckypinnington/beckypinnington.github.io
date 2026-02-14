const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTm_oPJaAflw7ka_j7A9GFeREFVKX7By3gCMsB34gVzBcp6zR8GGlnNP5apOVy56vVz5W7526h8Ox3/pub?gid=0&single=true&output=csv";

function loadPortfolio() {
    Papa.parse(sheetURL, {
        download: true,
        header: true,
        complete: function(results) {
            const container = document.getElementById("portfolio-container");

            results.data.forEach(row => {
                if (!row.Headline) return;

                const item = document.createElement("div");
                item.className = "portfolio-item";

                item.innerHTML = `
                    <a href="${row.URL}" target="_blank">
                        <h3 class="headline">${row.Headline}</h3>
                        <p class="publication-date">${row.Publication}, ${row.Date}</p>
                    </a>
                    <p class="description">${row.Description}</p>
                    <hr/>
                `;

                container.appendChild(item);
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", loadPortfolio);
