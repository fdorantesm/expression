import mongoose from 'mongoose'
import CountrySchema from 'schema/country'

export default mongoose.model('Country', CountrySchema)
