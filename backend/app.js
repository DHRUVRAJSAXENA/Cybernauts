const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const path = require("path")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

mongoose
  .connect(
    "mongodb+srv://dhruvrajsaxena1234:1234@productregistration.hlkkqrp.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected")
  })
  .catch((err) => console.error("MongoDB connection error:", err))

const productSchema = new mongoose.Schema({
  category: String,
  model: String,
  serialNumber: String,
  invoiceDate: Date,
  file: String,
})

const Product = mongoose.model("Product", productSchema)

app.post("/submitForm", upload.single("file"), async (req, res) => {
  const { category, model, serialNumber, invoiceDate } = req.body
  const file = req.file ? req.file.path : null

  const newProduct = new Product({
    category,
    model,
    serialNumber,
    invoiceDate,
    file,
  })

  try {
    await newProduct.save()
    res.status(201).json({ success: true })
  } catch (err) {
    console.error("Error saving product:", err)
    res.status(500).json({ success: false, error: err.message })
  }
})

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    console.error("Error fetching products:", err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
