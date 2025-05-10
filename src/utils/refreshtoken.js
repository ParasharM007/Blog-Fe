import axios from "axios";
import { toast } from "react-toastify";
const refreshToken= async (error_code)=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    try {
        if(error_code===401){

            const res= await axios.post(`${API_BASE_URL}/v1/users/refresh-token`,
            // const res= await axios.post(`http://localhost:5000/api/v1/users/refresh-token`,
                {},
              {withCredentials:true}
            )
            return res.data;
        }
        else return;
    } catch (error) {
        console.log("Error in refreshing token for login!")
        toast.error("Please Login First") 
    }


}
export { refreshToken }