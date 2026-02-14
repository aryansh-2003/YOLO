import axios from 'axios'

export class UserService{
    constructor(){
        this.instance = axios.create({
            baseURL: 'https://yolo-backend-q3lv.onrender.com/api/v1/user'
        })
    }

    async getLoggedIn(name,username){
      try {
          const result = await this.instance.post('/loginUser',{username:username,name:name},{withCredentials:true})
          if(result){
            localStorage.setItem("userData", JSON.stringify(result?.data))
          }
          return result;
      } catch (error) {
        console.log(error)
      }
    }
}

const service = new UserService()

export default service