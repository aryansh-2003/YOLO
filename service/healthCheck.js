import axios from 'axios'

export class helatchCheckService{
    constructor(){
        this.instance = axios.create({
            baseURL: 'https://yolo-backend-q3lv.onrender.com/api/v1/health'
        })
}

  async healthCheck() {
    const result = await this.instance.get('/helalthChecker')

    if( result.status == 200) {
        return result
    }
}

}

const service = new helatchCheckService()


export default service