import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";


@Entity()
export class ProductoImg {
    @PrimaryGeneratedColumn()
    id: number;


    @Column('text')
    url: string;

    @ManyToOne(
        () => Producto,
        (producto) => producto.imagenes,
        { onDelete: 'CASCADE' }
    )
    product: Producto
}