const isLogin = (req , res , next)=>{
    if(req.session.userid){

    }else{
        res.redirect('/login');
    }
    next();
}

const isLogout = (req , res , next)=>{
    if(!req.session.userid){
        
       
    }else{

        res.redirect('/user_dashboard')

    }

    next();
}



const isadminLogin = (req , res , next)=>{
    if(req.session.adminid){

    }else{
        res.redirect('/admin_login');
    }
    next();
}

const isadminLogout = (req , res , next)=>{
    if(!req.session.adminid){
        
       
    }else{

        res.redirect('/admin_dashboard')

    }

    next();
}

export default {
    isLogin,
    isLogout,
    isadminLogin,
    isadminLogout
}