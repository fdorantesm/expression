process.env.APP_PATH = __dirname

const APP_PATH = process.env.APP_PATH.split('/')

APP_PATH.pop()

process.env.SRC_PATH = APP_PATH.join('/')


export default process.env