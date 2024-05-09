import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import {  Repository } from 'typeorm';

@Injectable()
export class ProductosService {


  @InjectRepository(Producto)
  private readonly productoRepositorio: Repository<Producto>


// Todo HACER EL @InjectRepository(ProductoImagenes)

  ////////////////////////////////////////////////////////////////////////////////////////////

  create(createProductoDto: CreateProductoDto) {
return 'this action return all products '
  }


  ////////////////////////////////////////////////////////////////////////////////////////////

  findAll() {
    return `This action returns all productos`;
  }



  ////////////////////////////////////////////////////////////////////////////////////////////

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////


  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////



  remove(id: number) {
    return `This action removes a #${id} producto`;
  }



  ////////////////////////////////////////////////////////////////////////////////////////////

}
