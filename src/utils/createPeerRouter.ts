const createPeerRouter = (connection: any, appiSchema: any) => {
    connection.on('data', (data: any) => {
        appiSchema.forEach((endpoint: any) => {
            if (endpoint.type === data.type) {
                routeHandler(connection, endpoint.handler), data;
            }
        })
    })
}

export default createPeerRouter;