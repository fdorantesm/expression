import mongoose from 'mongoose'
import Country from 'model/country'
import Region from 'model/region'
import City from 'model/city'
import lang from 'library/lang'

const geo = {}

geo.countries = (params) => {
	return new Promise((resolve, reject) => {
		let handler
		if('id' in params)
			handler = Country.findById(params.id)
		else
			handler = Country.find(params)

		handler
			.sort({ _id: 1 })
			.then(countries => {
				if (countries) {
					resolve({
						status: 200,
						text: lang.__('general.http.ok'),
						data: countries
					})
				}
				else {
					reject({
						status: 404,
						text: lang.__('general.http.notFound')
					})
				}
			})
			.catch(err => {
				reject({
					status: 500,
					text: lang.__('general.error.fatalError'),
					data: err
				})
			})
	})
}

geo.regions = (oid) => {
	return new Promise((resolve, reject) => {
		Country.findById(oid)
			.then(country => {
				Region
					.find({ country: country._id })
					.sort({ _id: 1 })
					.then(regions => {
						resolve({
							status: 200,
							text: lang.__('general.http.ok'),
							data: regions
						})
					})
					.catch(err => {
						reject({
							status: 500,
							text: lang.__('general.error.fatalError'),
							data: err
						})
					})
				
			})
			.catch(err => {
				reject({
					status: 404,
					text: lang.__('general.http.notFound'),
					data: err
				})
			})
	})
}

geo.cities = (region) => {
	return new Promise((resolve, reject) => {
		City.find({ region : region })
			// .populate(["country","region"])
			.sort({ rel : 1 })
			.then(cities => {
				resolve({
					status: 200,
					text: lang.__('general.http.ok'),
					data: cities
				})
			})
			.catch(err => {
				reject({
					status: 404,
					text: lang.__('general.http.notFound')
				})
			})
	})
}

export default geo
