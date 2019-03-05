import routes from 'src/app/http/router'

export default (app) => {

    app.use('/', routes)

}
