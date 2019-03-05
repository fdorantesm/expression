import log from 'library/log'

export default class TestController {
    static async hello (req, res) {
        const response = {
            'message': 'Hello world :*',
            'status': 200
        }
        res.send(response)
    }
}