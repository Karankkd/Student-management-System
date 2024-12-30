import bcrypt from 'bcrypt'


const securepassword = async (password)=>{
    try {

        const salt = await bcrypt.hash(password , 10)
        return salt
        
    } catch (error) {
        console.log(error)
        
    }
    
}

export default securepassword