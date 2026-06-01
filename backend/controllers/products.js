import mongoose from 'mongoose'
import cache from '../utills/cache.js'

export const getProducts = async (req, res) => {
  const cacheKey = 'all_products'

  const cached = cache.get(cacheKey)
  if (cached) {
    console.log('✅ products served from cache')
    return res.json({ products: cached })
  }

  try {
    const doc = await mongoose.connection.db.collection('beer').findOne({})
    cache.set(cacheKey, doc.products)
    console.log('📡 products served from DB and cached')
    res.json({ products: doc.products })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getProductById = async (req, res) => {
  const cacheKey = `product_${req.params.id}`

  const cached = cache.get(cacheKey)
  if (cached) {
    console.log(`✅ product ${req.params.id} served from cache`)
    return res.json({ product: cached })
  }

  try {
    const doc = await mongoose.connection.db.collection('beer').findOne({})
    const product = doc.products.find(p => p.id === Number(req.params.id))
    if (!product) return res.status(404).json({ error: 'Product not found' })
    cache.set(cacheKey, product)
    console.log(`📡 product ${req.params.id} served from DB and cached`)
    res.json({ product })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}