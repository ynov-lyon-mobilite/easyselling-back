// const whitelistedDomains = ["..."];

module.exports = function registerHook({ services, database, getSchema }) {
  const { UsersService } = services;
  return {
    "oauth.*.login.before": async function (oauthProfile) {
      const { email } = oauthProfile.profile;
      const schema = await getSchema();
      const usersService = new UsersService({
        schema,
        knex: database
      });

      // const emailDomainIsWhitelisted = whitelistedDomains.some((d) =>
      //   email.includes(d)
      // );
      // if (!emailDomainIsWhitelisted) return;

      const existingUser = await database("directus_users")
        .where({ email })
        .first();
      if (existingUser) return;

      await usersService.createOne({
        email: email,
        role: "377095de-b5bb-4f4c-8151-a5cb6ab95025"
      });
    }
  };
};
