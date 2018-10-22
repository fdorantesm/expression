import consign from 'consign'
let system = {}

consign({cwd:'app'})
	// .include("config")
	// .include("db/schemas")
	// .include("helpers")
	// .include("libraries/")
	.include("db/models")
	.into(system)

export default system
