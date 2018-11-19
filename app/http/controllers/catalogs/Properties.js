import Category from 'model/category'
import Amenity from 'model/amenity'

export default class Properties {
	
	static async categories (req, res) {
		const categories = await Category.find()
		res.send(categories)
	}

	static async amenities (req, res) {
		const categories = await Amenity.find()
		res.send(categories)
	}

}
