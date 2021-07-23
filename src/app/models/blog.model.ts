import { IblogImage } from "../blog/interfaces/IblogImage";

export class Blog {
    id: number;
    blogTitle: string;
    date: Date;
    name: string;
    description: string;
    blogType: string;
    blogImage?: IblogImage[];
}