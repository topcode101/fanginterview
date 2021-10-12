import schema from "./excutableSchema";
// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => {
            return 'world';
        },

        // fetch the profile of currently authenticated user
        async currentUser (_, args, { user }) {
            // make sure user is logged in
            if (!user) {
              throw new Error('You are not authenticated!')
            }
  
            // user is authenticated
            // return await User.findById(user.id)
            return null
          }
    },

    Mutation: {
        async signup (_, { username, email, password }, { app }) {
            // const user = await User.create({
            //   username,
            //   email,
            //   password: await bcrypt.hash(password, 10)
            // })
  
            // return jsonwebtoken.sign(
            //   { id: user.id, email: user.email },
            //   process.env.JWT_SECRET,
            //   { expiresIn: '1y' }
            // )
          },
  
          // Handles user login
          async login (_, args, context) {

            // const user = await User.findOne({ where: { email } })
  
            // if (!user) {
            //   throw new Error('No user with that email')
            // }
  
            // const valid = await bcrypt.compare(password, user.password)
  
            // if (!valid) {
            //   throw new Error('Incorrect password')
            // }
  
            // // return json web token
            // return jsonwebtoken.sign(
            //   { id: user.id, email: user.email },
            //   process.env.JWT_SECRET,
            //   { expiresIn: '1d' }
            // )

            const {source, email, password, googleIdToken} = args;
            if (!['GOOGLE', 'FACEBOOK', 'NORMAL'].includes(source)) {
                throw Error("wrong source type: " + source)
            }
            console.log(schema)
            if (source === 'GOOGLE') {
                const userService = context.app.getService('User');
                const jwt_token = await userService.loginGoogleAccount(googleIdToken);
                return {
                    user: {
                        username: 'test',
                        email: 'modifyme',
                        id: 'objectid'
                    }, 
                    token: jwt_token
                }
            }
            
            throw Error('need to implement this')
          }
    }

};
export default resolvers;
