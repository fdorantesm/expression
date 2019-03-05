import consign from 'consign'
let system = {}

consign({cwd: process.env.APP_PATH })
	.include("config")
    .include("helpers")
	.include("libraries/")
    .include("core")
	.include("models")
    .include("http/middlewares")
    .include("http/controllers")
    .include("http/routes")
	.into(system)

export default system
