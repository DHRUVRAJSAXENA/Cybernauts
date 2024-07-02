document
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    let category = document.getElementById("category").value
    let model = document.getElementById("model").value
    let serialNumber = document.getElementById("serial-number").value.trim()
    let invoiceDate = document.getElementById("invoice-date").value
    let file = document.getElementById("upload-file").files[0]

    if (!category || !model || !serialNumber) {
      alert("Please fill in all required fields.")
      return
    }

    let formData = new FormData()
    formData.append("category", category)
    formData.append("model", model)
    formData.append("serialNumber", serialNumber)
    formData.append("invoiceDate", invoiceDate)
    if (file) {
      formData.append("file", file)
    }

    fetch("http://localhost:3000/submitForm", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.success) {
          alert("Form submitted successfully!")
          document.getElementById("product-form").reset()
        } else {
          alert("Form submission failed. Please try again.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("An error occurred while submitting the form.")
      })
  })

document.getElementById("view-products").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/backend/public/data.html"
})
