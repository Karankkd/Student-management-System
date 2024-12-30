import nodemailer from 'nodemailer'

const verifymail = (name , email , id)=>{

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "karanjin90@gmail.com",
              pass: "lvcfdrbidbtzznvn",
            },
          });
        
          const mailoption = {
            from: "karanjin90@gmail.com",
            to: email,
            subject: "Verify your email",
            html:'<p>hii '+ name +' , please click on here for <a href="http://127.0.0.1:3232/verify?id='+id+'">verify</a> your email</p>'
          }

          transporter.sendMail(mailoption , function(error , info){
            if(error){
            console.log(error)
            }else{
            console.log('email sent'+ info.response)
             }
          })
    } catch (error) {
        console.log(error)
    }

}

export default verifymail

