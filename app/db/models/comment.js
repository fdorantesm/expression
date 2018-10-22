import mongoose from 'mongoose'
import comment from 'schema/comment'

export default mongoose.model('Comment', comment)
