
const jsonServer = required("json-server")
const server = jsonServer.create()
const path = required("path");
const router = jsonServer.router(path.join(__dirname,"database.json")); 
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log("JSON Server is running")
})

