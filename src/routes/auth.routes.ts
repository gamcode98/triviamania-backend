import { Router } from 'express'
import passport from 'passport'
import {
  changePassword,
  login,
  provider,
  recoveryPassword,
  register
} from '../controllers/auth.controller'
import validatorHandler from '../middlewares/validator.handler'
import {
  changePasswordUserSchema,
  createUserSchema,
  loginUserSchema,
  recoveryUserSchema
} from '../schemas/user.schema'

const router = Router()

router.post('/register', validatorHandler(createUserSchema, 'body'), register)

router.post('/login', validatorHandler(loginUserSchema, 'body'), login)

router.post(
  '/recovery',
  validatorHandler(recoveryUserSchema, 'body'),
  recoveryPassword
)

router.post(
  '/change-password',
  validatorHandler(changePasswordUserSchema, 'body'),
  changePassword
)

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  provider
)

export default router
