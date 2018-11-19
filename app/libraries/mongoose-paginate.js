import mongoosePaginate from 'mongoose-paginate-v2'

mongoosePaginate.paginate.options = {
	page: 1,
	customLabels: {
		totalDocs: 'total',
		docs: 'docs',
		limit: 'count',
		page: 'page',
		nextPage: 'next',
		prevPage: 'prev',
		totalPages: 'pages'
	}
}

export default mongoosePaginate
