import { User } from "src/auth/entities/user.entity";
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
        default: 0
    })
    precio: number;

    /////////////////////////////////////////////////////////////////////
    @Column('float', {
        default: 0
    })
    stock: number;

    /////////////////////////////////////////////////////////////////////
    @Column('text', {
        array: true   //esto es un arreglo en string
    })
    talles: string[];

    /////////////////////////////////////////////////////////////////////

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]
    /////////////////////////////////////////////////////////////////////

    // TODO imagenes 


    /////////////////////////////////////////////////////////////////////

    user: User

    // TODO averiguar si poner el beforeUpdate para el slug que no entiendo la funcionalidad del slug 
    //@BeforeUpdate()
    //checkSlugInsert(){}


}
