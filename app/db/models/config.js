import mongoose from 'mongoose'
import config from 'schema/config'

export default mongoose.model('Config', config)
