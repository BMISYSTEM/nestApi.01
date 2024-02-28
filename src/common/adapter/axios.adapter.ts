import axios, { AxiosInstance } from "axios";
import { http } from "../Interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosApdater implements http{
    private axios:AxiosInstance = axios;
    async get<T>(url: string): Promise<T> {
       try {
            const {data} = await this.axios.get<T>(url)
            return data
       } catch (error) {
            throw new Error('Error inesperodo en el servidor al realisar la petision get de axios')
       }
    }

}