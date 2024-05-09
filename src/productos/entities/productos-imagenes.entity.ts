import { Column, PrimaryGeneratedColumn } from "typeorm";



export class ProductoImg{
    @PrimaryGeneratedColumn()
    id:number;


    @Column('text')
    url:string;
}