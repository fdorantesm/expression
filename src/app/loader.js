import consign from 'consign'
let system = {}

consign({cwd:'app'})
	.include("config")
    .include("helpers")
    .include("core")
    .include("controllers")
	.include("routes")
	.include("libraries/")
	.include("models")
	.into(system)

export default system
