const mongoose = require('mongoose');
const { Schema } = mongoose;

const variantSchema = new Schema(
  {
    shopifyId:        { type: Number,  required: true, index: true },
    title:            { type: String,  required: true },
    option1:          { type: String,  default: null },
    option2:          { type: String,  default: null },
    option3:          { type: String,  default: null },
    sku:              { type: String,  default: null, sparse: true },
    price:            { type: Number,  required: true, min: 0 },
    compareAtPrice:   { type: Number,  default: null, min: 0 },
    available:        { type: Boolean, default: false, index: true },
    requiresShipping: { type: Boolean, default: true },
    taxable:          { type: Boolean, default: true },
    grams:            { type: Number,  default: 0 },
    position:         { type: Number,  default: 1 },
    featuredImage:    { type: String,  default: null },
  },
  { _id: false, timestamps: true }
);

const imageSchema = new Schema(
  {
    shopifyId:  { type: Number, required: true },
    src:        { type: String, required: true },
    width:      { type: Number },
    height:     { type: Number },
    position:   { type: Number, default: 1 },
    variantIds: [{ type: Number }],
  },
  { _id: false, timestamps: true }
);

const optionSchema = new Schema(
  {
    name:     { type: String,   required: true }, 
    position: { type: Number,   default: 1 },
    values:   [{ type: String }],         
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    shopifyId:   { type: Number, required: true, unique: true, index: true },
    title:       { type: String, required: true, trim: true },
    handle:      { type: String, required: true, unique: true, lowercase: true },
    bodyHtml:    { type: String, default: '' },
    vendor:      { type: String, index: true },
    productType: { type: String, default: '', index: true },
    tags:        [{ type: String }],
    publishedAt: { type: Date,   default: null },

    variants: [variantSchema],
    images:   [imageSchema],
    options:  [optionSchema],
  },
  {
    timestamps: true, 
    collection: 'products', 
  }
);


productSchema.index({ productType: 1, publishedAt: -1 });
productSchema.index({ tags: 1 });
productSchema.index({ vendor: 1, productType: 1 });
productSchema.index({ 'variants.available': 1 });
// SKU lookups
productSchema.index({ 'variants.sku': 1 }, { sparse: true });

productSchema.virtual('minPrice').get(function () {
  const available = this.variants.filter(v => v.available);
  if (!available.length) return null;
  return Math.min(...available.map(v => v.price));
});

productSchema.methods.isAvailable = function () {
  return this.variants.some(v => v.available);
};

module.exports = mongoose.model('Product', productSchema);