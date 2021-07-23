import { IblogImage } from "./IblogImage";

export interface Iblog {
    id: number;
    blogTitle: string;
    date: Date;
    name: string;
    blogDesc: string;
    blogType: string,
    blogImage?: IblogImage[];
}
