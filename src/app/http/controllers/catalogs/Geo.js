import Country from 'model/country'
import Region from 'model/region'
import City from 'model/city'

export default class Geo {

	static async countries (req, res) {
		const countries = await Country.find()
		res.send(countries)
	}
	
	static async regions (req, res) {
		const country = req.query.country
		const regions = await Region.find({ country })
		res.send(regions)
	}

	static async cities (req, res) {
		const region = req.query.region
		const cities = await City.find({ region })
		res.send(cities)
	}

}
