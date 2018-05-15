var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(3000, function () {
    console.log('JSON Server is running')
})
 
router.render = function (req, res) {
 
    var intArr = [];
 
    if (res.locals.data.length > 0) {
        res.locals.data.forEach(function (e, i, a) {
            intArr.push({
                "translation": {
                    "key": e.key,
                    "language": e.language,
                    "#value": e.value
                }
            });
        })
    }
 
    res.jsonp({
        response: {
            content: {
                translations: intArr
            }
        }
    })
}