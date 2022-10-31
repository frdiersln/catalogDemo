import { User } from './user'

export class Product {
    id!: number;
    name!: string;
    price!: number;
    image!: string;
    description!: string;
    timeStamp!: string;
    likes!: Array<User>;
}
