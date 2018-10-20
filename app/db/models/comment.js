import mongoose from 'mongoose'
import CommentSchema from 'schema/comment'

export default mongoose.model('Comment', CommentSchema)
