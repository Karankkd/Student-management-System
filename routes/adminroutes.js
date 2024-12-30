import express from 'express'
import admincontrollers from '../controllers/admincontrollers.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const adminroutes = express()

adminroutes.set('view engine' , 'ejs')
adminroutes.set('views' , './views/admin')

adminroutes.use(express.json())
adminroutes.use(express.urlencoded({extended : true}))


adminroutes.get('/admin_dashboard',auth.isadminLogin , admincontrollers.admin_dashboard)

adminroutes.get('/admin_login',auth.isadminLogout , admincontrollers.admin_login)

adminroutes.post('/adminlogin' , admincontrollers.adminlogin)

adminroutes.get('/admin_edit',auth.isadminLogin , admincontrollers.admin_edit)

adminroutes.post('/adminedit' ,upload.single('image'), admincontrollers.adminedit)

adminroutes.get('/admin_logout' , admincontrollers.admin_logout)



adminroutes.get('/delete' , admincontrollers.admindelete)



export default adminroutes