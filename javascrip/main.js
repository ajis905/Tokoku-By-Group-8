// main.js
document.addEventListener("DOMContentLoaded", () => {
  const detailButtons = document.querySelectorAll(".btnDetail");
  const modalElement = document.createElement("div");

  // Create a modal template
  modalElement.innerHTML = `
      <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">Detail Produk</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBody">
              <!-- Detail content will be injected here -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

  document.body.appendChild(modalElement);

  // Initialize Bootstrap modal
  const detailModal = new bootstrap.Modal(
    document.getElementById("detailModal")
  );

  // Attach event listeners to detail buttons
  detailButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const title = `Produk ${index + 1}`;
      const description = card.querySelector(".card-text").textContent;
      const price = card.querySelector(".harga").textContent;

      // Update modal content
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalBody").innerHTML = `
          <p>${description}</p>
          <p class="text-danger fw-bold">Harga: ${price}</p>
        `;

      // Show modal
      detailModal.show();
    });
  });

  // Add "Beli" button to each card
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const buyButton = document.createElement("button");
    buyButton.className = "btn btn-sm btn-success me-auto d-block btnBuy";
    buyButton.textContent = "Beli";
    card.querySelector(".card-footer").prepend(buyButton);

    buyButton.addEventListener("click", () => {
      const price = card.querySelector(".harga").textContent;
      const productName = `Produk ${index + 1}`;

      // Open new tab with WhatsApp-styled interface
      const newTab = window.open("", "_blank");
      newTab.document.write(`
          <html>
            <head>
              <title>Informasi Pembelian</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  background: linear-gradient(135deg, #e0f7fa, #ffffff);
                  color: #333;
                }
                .container {
                  max-width: 400px;
                  margin: 50px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                  display: flex;
                  align-items: center;
                  margin-bottom: 20px;
                }
                .header img {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  margin-right: 15px;
                }
                .header h1 {
                  font-size: 18px;
                  margin: 0;
                }
                a {
                  color: #25d366;
                  text-decoration: none;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo">
                  <h1>Informasi Pembelian</h1>
                </div>
                <p><strong>Nama Produk:</strong> ${productName}</p>
                <p><strong>Harga:</strong> ${price}</p>
                <p><strong>Kontak WhatsApp:</strong> <a href="https://wa.me/6281234567890">+62 812-3456-7890</a></p>
              </div>
            </body>
          </html>
        `);
    });
  });
});
