/* eslint-disable no-console */
import express from 'express'
import next from 'next'
import logger from 'morgan'
import router from './router/router'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import cookieSession from 'cookie-session'
import passport from 'passport'
import passportSetup from './config/passport-setup'
import keys from './config/keys'
import authRoutes from './router/auth-routes'


const port = parseInt(process.env.PORT, 10) || 8080
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
      server = express()

      // Logs
      server.use(logger("dev"))

      server.use(
        cookieSession({
          name: "session",
          keys: [keys.COOKIE_KEY],
          maxAge: 24 * 60 * 60 * 100
        })
      )

      // Router
      server.use(cookieParser())

      server.use(
        bodyParser.urlencoded({
          extended: true
        }),
      )
      server.use(bodyParser.json())
      
      

      // initalize passport
      server.use(passport.initialize())
      // deserialize cookie from the browser
      server.use(passport.session())

      server.use("/auth", authRoutes)
      
      const authCheck = (req, res, next) => {
      if (!req.user) {
          res.status(200).json({
            authenticated: false,
            message: "user has not been authenticated"
          });
        } else {
          next();
        }
      };

      // if it's already login, send the profile response,
      // otherwise, send a 401 response that the user is not authenticated
      // authCheck before navigating to home page
      server.get("/auth/user", authCheck, (req, res) => {
        res.status(200).json({
          authenticated: true,
          message: "user successfully authenticated",
          user: req.user,
          cookies: req.cookies
        });
      });

      router(server, handle)


      server.listen(port, (err) => {
          if (err) {
              throw err
          }
          console.log(`
        > Ready on port ${port} [${env}]
        http://localhost:8080
      `)
      })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })