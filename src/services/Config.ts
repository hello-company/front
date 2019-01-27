import { Singletone } from "atom4";

export class Config extends Singletone {
    backendUrl: string = '';
    setBackendUrl(url: string) {
        this.backendUrl = url;
    }
}