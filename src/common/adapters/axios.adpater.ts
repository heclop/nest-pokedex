import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdpater implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<t>(url: string): Promise<t> {
        
        try {
            const { data } = await this.axios.get<t>( url );
            return data;
        } catch (error) {
            throw new Error('This is an error - check logs')
        }
    }

}