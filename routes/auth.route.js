const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'bslkdbfklsdbfgsjkbvjkbawk34rb5w3tb54wtbe54tw54t'

router.post('/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }
      const { email, password } = req.body
      const isUsed = await User.findOne({email})
      if (isUsed) {
        return res.status(300).json({message: `Ошибка: Пользователь с email ${email} уже зарегистрирован`})
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword})
      await user.save()
      res.status(201).json({message: `Пользователь с email ${email} создан`})
    } catch (e) {
      console.log(e)
    }
  }
)

router.post('/login',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }
      const { email, password } = req.body
      
      
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({message: `Ошибка: Пользователь с email ${email} не зарегистрирован`})
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({message: `Ошибка: Пароль неверен`})
      } 
      const token = jwt.sign(
        { userId: user.id },
        jwtSecret,
        { expiresIn: '1h'}
      )
      return res.status(200).json({token, userId: user.id})
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router