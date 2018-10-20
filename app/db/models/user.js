import mongoose from 'mongoose'
import UserSchema from 'schema/user'

export default mongoose.model('User', UserSchema)
