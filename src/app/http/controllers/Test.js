import log from 'library/log'

export default class TestController {
    static async hello (req, res) {
        const response = {
            'message': 'Hello world :*',
            'status': 200
        }
        log.info(response)
        res.send(response)
    }
}