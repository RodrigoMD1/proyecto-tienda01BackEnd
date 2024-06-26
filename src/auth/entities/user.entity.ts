
import { Producto } from "src/productos/entities/producto.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";




@Entity('users')
export class User {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    /////////////////////////////////////////////////////

    @Column('text', {
        unique: true,
    })
    email: string;

    /////////////////////////////////////////////////////

    @Column('text', {
        select: false
    })
    password: string;

    /////////////////////////////////////////////////////

    @Column('text')
    fullName: string;

    /////////////////////////////////////////////////////

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    /////////////////////////////////////////////////////

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    /////////////////////////////////////////////////////

    // esto hace que user-id aparezca en la tabla de productos 
    @OneToMany(
        () => Producto,
        (product) => product.user
    )
    product: Producto;



    /////////////////////////////////////////////////////

    @BeforeInsert()
    checkFieldsBeforInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkfieldsBeforUpdate() {
        this.checkFieldsBeforInsert();
    }

}
