document.addEventListener("DOMContentLoaded", function () {
  fetchProducts()

  document.getElementById("back-button").addEventListener("click", function () {
    window.location.href = "index.html"
  })
})

function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      const gridContainer = document.getElementById("product-grid")
      console.log("Fetched products:", data)

      gridContainer.innerHTML = ""

      data.forEach((product) => {
        const productItem = document.createElement("div")
        productItem.className = "grid-item"

        const productImage = document.createElement("img")
        productImage.src = `http://localhost:3000/${product.file}`
        productImage.alt = product.model

        const productDetails = document.createElement("div")
        productDetails.innerHTML = `
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Model:</strong> ${product.model}</p>
          <p><strong>Serial Number:</strong> ${product.serialNumber}</p>
          <p><strong>Date of Invoice:</strong> ${new Date(
            product.invoiceDate
          ).toLocaleDateString()}</p>
        `

        productItem.appendChild(productImage)
        productItem.appendChild(productDetails)
        gridContainer.appendChild(productItem)
      })
    })
    .catch((error) => console.error("Error fetching products:", error))
}
