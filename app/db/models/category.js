import mongoose from 'mongoose'
import CategorySchema from 'schema/category'

export default mongoose.model('Category', CategorySchema)
