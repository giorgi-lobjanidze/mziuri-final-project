import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
  try {
    const doc = await mongoose.connection.db.collection('beer').findOne({})
    res.json({ products: doc.products })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const doc = await mongoose.connection.db.collection('beer').findOne({})
    const product = doc.products.find(p => p.id === Number(req.params.id))
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ product })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}