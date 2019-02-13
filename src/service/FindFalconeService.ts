import { async } from "q";
import { requestData } from "../contract/result";

const FalconeApi = `https://findfalcone.herokuapp.com/`

function getRequestUrl(route: string) {
    return FalconeApi + route;
}

export default class FindFalconeService {

    constructor() {
        this.getToken()
    }

    private token = ""

    async getToken() {
        return fetch(getRequestUrl(`token`),
            {
                method: `post`,
                headers: {
                    "Accept": `application/json`
                }
            })
            .then((response: any) => {
                return response.json();
            })
            .then((myJason: any) => {
                this.token = myJason.token
                console.log(this.token)
            })

    }

    async find(requestData: requestData) {
        if (this.token == "") {
            await this.getToken()
        }

        requestData.token = this.token

        return fetch(getRequestUrl('find'),
            {
                method: `post`,
                body: JSON.stringify(requestData),
                headers: {
                    "Accept": `application/json`,
                    "Content-Type": `application/json`
                }
            }
        )
    }

    static async getPlanets(): Promise<Response> {
        return fetch(getRequestUrl(`planets`))
    };

    static async getVehicles(): Promise<Response> {
        return fetch(getRequestUrl(`vehicles`))
    };



}