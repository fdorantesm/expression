import mongoose from 'mongoose'
import ProfileSchema from 'schema/profile'

export default mongoose.model('Profile', ProfileSchema)
