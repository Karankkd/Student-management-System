import securepassword from "../middleware/hashpassword.js";
import verifymail from "../middleware/mailer.js";
import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";


const home = (req, res) => {
  res.render("home");
};

const about = (req, res) => {
  res.render("about");
};

const contact = (req, res) => {
  res.render("contact");
};

const register = (req, res) => {
  res.render("register");
};

const registers = async (req, res) => {
  const spassword = await securepassword(req.body.password);

  try {
    const useradd = await new usermodel({
      name: req.body.name,
      email: req.body.email,
      password: spassword,
      phone: req.body.phone,
      image: req.file.filename,
    });

    const user = await useradd.save();
    console.log(user);

    if (user) {
      verifymail(user.name, user.email, user._id);
      res.render("register", {
        message:
          "Your Regstation has been successfully! please verify your mail",
      });
    } else {
      res.render("register", {
        message: "Your Regstation has been failed! please try again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = (req, res) => {
  res.render("login");
};

const logins = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await usermodel.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        if (user.is_verified === 0) {
          res.render("login", { message: "please verify your email!" });
        } else {
          req.session.userid = user._id;
          res.redirect("/user_dashboard");
        }
      } else {
        res.render("login", { message: "Password is incorrect!" });
      }
    } else {
      res.render("login", { message: "Your email or password is incorrect!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const verify = async (req, res) => {
  try {
    const id = req.query.id;

    const user = await usermodel.findByIdAndUpdate(id, {
      $set: { is_verified: 1 },
    });

    res.render("verify");
  } catch (error) {
    console.log(error);
  }
};

const user_dashboard = async(req , res)=>{
  try {
    const id = req.session.userid;

    const userdata = await usermodel.findById(id)

    // console.log(userdata)


    res.render("user_dashboard" , {userdata})


  } catch (error) {
    console.log(error);
    
  }
  
}


const logout = (req , res)=>{
  try {
    req.session.destroy();
    res.redirect("/")
  } catch (error) {
    console.log(error)
    
  }
 
}


const edit = async(req, res) => {
  try {
    const id = req.query.id;
    const user = await usermodel.findById(id);


    // console.log(user)
    
    res.render("edit" , {user});
  } catch (error) {
    console.log(error)
  }
  
};

const editpost = async(req , res)=>{

  try {
    const {name , email , phone , user_id} = req.body

    if(req.file){
      const updateuser = await usermodel.findByIdAndUpdate(user_id , {$set:{name:name , email:email , phone:phone , image:req.file.filename}})
    }else{
      const updateuser = await usermodel.findByIdAndUpdate(user_id , {$set:{name:name , email:email , phone:phone}})
    }

    

    res.redirect('/user_dashboard')

  } catch (error) {
    console.log(error)
    
  }


}



export default {
  home,
  about,
  contact,
  register,
  login,
  registers,
  verify,
  logins,
  user_dashboard,
  logout,
  edit,
  editpost
  
};
