module.exports = function registerEndpoint(router, DirectusSdk) {
    const {ItemsService, MailService} = DirectusSdk.services;
    const {ServiceUnavailableException} = DirectusSdk.exceptions;
    const {PUBLIC_URL} = DirectusSdk.env;

    router.post('/:id/share', async (req, res, next) => {
        console.log(DirectusSdk.exceptions);
        const vehicleId = req.params.id;
        const receiverId = req.body.email;

        const vehicleService = new ItemsService('vehicles', {schema: req.schema, accountability: req.accountability});
        try {
            const vehicle = await vehicleService.readOne(vehicleId)
            const mailService = new MailService({schema: req.schema});

            const url = `${PUBLIC_URL}/vehicles/share?test=test`

            await mailService.send({
                to: receiverId,
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