import mongoose from 'mongoose'

const { Schema } = mongoose

const addressSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName:  { type: String, default: '' },
  company:   { type: String, default: '' },
  address1:  { type: String, default: '' },
  address2:  { type: String, default: '' },
  city:      { type: String, default: '' },
  country:   { type: String, default: '' },
  zip:       { type: String, default: '' },
  phone:     { type: String, default: '' },
  isDefault: { type: Boolean, default: false },
}, { _id: true, timestamps: true })

const cartItemSchema = new Schema({
  id:       { type: Number, required: true },
  name:     { type: String, default: '' },
  image:    { type: String, default: '' },
  price:    { type: Schema.Types.Mixed },
  oldPrice: { type: Schema.Types.Mixed, default: null },
  variant:  { type: Schema.Types.Mixed },
  quantity: { type: Number, default: 1 },
}, { _id: false })

const wishlistItemSchema = new Schema({}, { _id: false, strict: false })

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },
  addresses: [addressSchema],
  cart:      [cartItemSchema],
  wishlist:  [wishlistItemSchema],
}, { timestamps: true })

export default mongoose.model('User', userSchema)