import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {


  private readonly logger = new Logger('ProductsService')

  constructor(

    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>

    // Todo HACER EL @InjectRepository(ProductoImagenes)
  ) { }






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


  update(id: string, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////


  async remove(id: string) {
    const producto = await this.findOne(id)
    await this.productoRepositorio.remove(producto)
  }



  ////////////////////////////////////////////////////////////////////////////////////////////



  private handleDBExceptions(error: any): void {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Error inesperado,revisar el servidor')

  }



}
