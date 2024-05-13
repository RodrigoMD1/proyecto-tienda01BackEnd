import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";



export class ProductoImg{
    @PrimaryGeneratedColumn()
    id:number;


    @Column('text')
    url:string;

    @ManyToOne(
        () => Producto,
        (product) => product.imagenes,
        {onDelete: 'CASCADE'}
    )
    product: Producto
}