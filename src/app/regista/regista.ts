import { Film } from "../film/film";
import { Sesso } from "./sesso";

export class Regista {
    constructor(
        public id?: number,
        public nome?: string,
        public cognome?: string,
        public nickName?: string,
        public dataDiNascita?: Date,
        public sesso?: Sesso,
        public films?: Film[]
    ){}
}
