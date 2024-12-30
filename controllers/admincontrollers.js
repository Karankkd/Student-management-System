
import usermodel from "../models/usermodel.js";
import bcrypt from 'bcrypt';

const admin_dashboard = async (req, res) => {
    try {
        const userdata = await usermodel.find();
        res.render('admin_dashboard', { data: userdata });
    } catch (error) {
        console.log(error);
    }
};

const admin_login = (req, res) => {
    res.render('admin_login');
};

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await usermodel.findOne({ email: email });

        if (admin) {
            const check = await bcrypt.compare(password, admin.password);
            if (check) {
                if (admin.is_verified === 0) {
                    res.render('admin_login', { message: 'Please verify your email first' });
                } else {
                    if (admin.is_admin === 0) {
                        res.render('admin_login', { message: 'You are not an admin' });
                    } else {
                        req.session.adminid = admin._id;
                        res.redirect('/admin_dashboard');
                    }
                }
            } else {
                res.render('admin_login', { message: 'Password is incorrect' });
            }
        } else {
            res.render('admin_login', { message: 'Your email or password is incorrect!' });
        }
    } catch (error) {
        console.log(error);
    }
};


const admin_edit = async (req , res)=>{
    try {
        const id = req.query.id
        const user = await usermodel.findById(id)
        // console.log(user)

        res.render('admin_edit' , {user})

        
    } catch (error) {
        console.log(error)
        
    }
   
}




const adminedit = async(req , res)=>{
    try {
        const {name , email , phone , user_id}=req.body
        if(req.file){
            const update_user = await usermodel.findByIdAndUpdate(user_id , {$set:{name:name , email:email , phone:phone , image:req.file.filename}})
        }else{
            const update_user = await usermodel.findByIdAndUpdate(user_id , {$set:{name:name , email:email , phone:phone}})
        }
        res.redirect('/admin_dashboard')

    } catch (error) {
        console.log(error)
        
    }
    
}


const admin_logout = (req , res)=>{
    try {
      req.session.destroy();
      res.redirect("/")
    } catch (error) {
      console.log(error)
      
    }
   
  }

  const admindelete = async(req , res)=>{
    try {
        const id = req.query.id
        const deleteuser = await usermodel.findByIdAndDelete(id)
        res.redirect('/admin_dashboard')
    } catch (error) {
        console.log(error)
        
    }

    

  }


export default {
    admin_dashboard,
    admin_login,
    adminlogin,
    admin_edit,
    adminedit,
    admin_logout,
    admindelete
};
