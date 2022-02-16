module.exports = function registerEndpoint(router, DirectusSdk) {
    const {getSchema, services, exceptions, env} = DirectusSdk
    const {ItemsService, MailService} = services;
    const {ServiceUnavailableException} = exceptions;
    const {PUBLIC_URL} =env;

    router.post('/:id/share', async (req, res, next) => {
        const vehicleId = req.params.id;
        const receiverMail = req.body.email;

        const schema = await getSchema()
        console.log(schema)

        const vehicleService = new ItemsService('vehicles', {schema: req.schema, accountability: req.accountability});
        const vehicleAuthorizationService = new ItemsService('vehicles_authorization', {schema: req.schema, accountability: req.accountability});
        const userService = new ItemsService('directus_users', {schema});
        const mailService = new MailService({schema: req.schema});
        try {

            const user = await userService.readOne({ email: receiverMail })
            const vehicle = await vehicleService.readOne(vehicleId)
            const vehicleAuthorizationId = await vehicleAuthorizationService.createOne({ vehicle, user })
            const url = `${PUBLIC_URL}/vehicles/share?id=${vehicleAuthorizationId}`

            await mailService.send({
                to: receiverMail,
                subject: "Partage de véhicule - EasySelling",
                template: {
                    name: 'user-invitation',
                    data: {
                        url: url
                    }
                }
            });
            res.send()
        } catch (error) {
            next(new ServiceUnavailableException(error.message))
        }
    });
};
