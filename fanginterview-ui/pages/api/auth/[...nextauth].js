import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: '166022609644-uu2o5cscof0vd9rbisdv34pc3or837c7.apps.googleusercontent.com',
        clientSecret: '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',
        profile(profile) {
            return {
                id: profile.sub,
                ...profile
            }
        //   return {
        //     // Return all the profile information you need.
        //     // The only truly required field is `id`
        //     // to be able identify the account when added to a database
        //   }
        },
    }),
    // ...add more providers here
  ],
  secret: 'hCEsD1X7z68vBrVip73h5FjyxQaskk6dQ01UOru4JwQ=', //`openssl rand -base64 32`
})