const routeHandler = (connection, handler, data) => {
    const handleRoute = (handler, index) => {
        const req = {
            connection,
            data
        };
        const res = {
            end: (data) => {
                connection.send({ type: 'requestSuccess', requestId: data.requestId, data })
            },
            error: (error) => {
                connection.send({ type: 'requestFailure', requestId: data.requestId, error})
            }
        }
        const next = () => {
            handleRoute(handler, index + 1);
        }

        handler[index](req, res, next);
    }

    handleRoute(handler, 0);
}


export default routeHandler;
