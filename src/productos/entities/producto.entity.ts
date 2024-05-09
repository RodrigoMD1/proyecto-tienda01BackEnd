import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Producto {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    /////////////////////////////////////////////////////////////////////

    @Column('text', {
        unique: true,
    })
    titulo: string;

    /////////////////////////////////////////////////////////////////////

    @Column('float', {

    })
    precio: number;

    /////////////////////////////////////////////////////////////////////

    stock: number;

    /////////////////////////////////////////////////////////////////////

    talles: boolean;

    /////////////////////////////////////////////////////////////////////


    tags: string[]
    /////////////////////////////////////////////////////////////////////
}
