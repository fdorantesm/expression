import mongoose from 'mongoose'
import ConfigSchema from 'schema/config'

export default mongoose.model('Config', ConfigSchema)
