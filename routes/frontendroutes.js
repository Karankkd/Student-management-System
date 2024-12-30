import express from 'express'
import frontendcontrollers from '../controllers/frontendcontrollers.js'
import upload from '../middleware/multer.js'
import session from 'express-session'
import auth from '../middleware/auth.js'

const frontroutes = express()

frontroutes.use(express.json())
frontroutes.use(express.urlencoded({extended: true}))







frontroutes.set('view engine' , 'ejs')
frontroutes.set('views' , './views')


frontroutes.get('/' , frontendcontrollers.home)

frontroutes.get('/about' , frontendcontrollers.about)

frontroutes.get('/contact' , frontendcontrollers.contact)

frontroutes.get('/register',auth.isLogout, frontendcontrollers.register)

frontroutes.post('/registers',upload.single('image') , frontendcontrollers.registers)

frontroutes.get('/user_dashboard',auth.isLogin, frontendcontrollers.user_dashboard)

frontroutes.get('/login' ,auth.isLogout, frontendcontrollers.login)

frontroutes.post('/logins' , frontendcontrollers.logins)

frontroutes.get('/verify' , frontendcontrollers.verify)

frontroutes.get('/logout' , frontendcontrollers.logout)


frontroutes.get('/edit' ,auth.isLogin, frontendcontrollers.edit)
frontroutes.post('/edits' , upload.single('image') , frontendcontrollers.editpost)





export default frontroutes