import mongoose from 'mongoose'
import CardSchema from 'schema/card'

export default mongoose.model('Card', CardSchema)
