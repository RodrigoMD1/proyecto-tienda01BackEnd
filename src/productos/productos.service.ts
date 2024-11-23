import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { ProductoImg } from './entities/productos-imagenes.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductosService {


  private readonly logger = new Logger('ProductsService')

  constructor(

    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>,

    @InjectRepository(ProductoImg)
    private readonly productosImgRepository: Repository<ProductoImg>,

    private readonly dataSource: DataSource,

  ) { }






  ////////////////////////////////////////////////////////////////////////////////////////////

  //TODO averiguar que con el rol de admin puedo crear el producto en la base de datos por que en el codigo de aca abajo no me pide permiso como admin o no verifica que sos admin para poder crear un producto nuevo lo cual significa que podria crear un producto cualquiera que no sea admin si quiere 

  async create(createProductoDto: CreateProductoDto, user: User) {

    try {

      const { imagenes = [], ...productosDetails } = createProductoDto

      const producto = this.productoRepositorio.create(
        {
          ...productosDetails,
          user,
          imagenes: imagenes.map(imagenes => ({ url: imagenes }) as DeepPartial<ProductoImg>)
        });
      await this.productoRepositorio.save(producto);
      return { ...producto, imagenes }

    } catch (error) {

    }


  }


  ////////////////////////////////////////////////////////////////////////////////////////////

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto

    const producto = await this.productoRepositorio.find({
      take: limit,
      skip: offset,
      relations: {
        imagenes: true,
      }
    });

    return producto.map(producto => ({
      ...producto,
      imagenes: producto.imagenes.map(img => img.url)
    }))

  }



  ////////////////////////////////////////////////////////////////////////////////////////////

  async findOne(term: string) {

    let producto: Producto;

    if (isUUID(term)) {
      producto = await this.productoRepositorio.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productoRepositorio.createQueryBuilder('prod')
      producto = await queryBuilder

        .where('UPPER(titulo) = :titulo o slug =:slug',
          {
            titulo: term.toUpperCase(),
            slug: term.toLocaleLowerCase(),
          })
        .leftJoinAndSelect('prod.imagenes', 'prodImagenes')
        .getOne();

    }

    if (!producto)
      throw new NotFoundException(`producto con el id ${term} no encontrado`)
    return producto;

  }

  async finOnePlain(term: string) {
    const { imagenes = [], ...rest } = await this.findOne(term)
    return {
      ...rest,
      imagenes: imagenes.map(imagenes => imagenes.url)
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////


  async update(id: string, updateProductDto: UpdateProductoDto, user: User) {

    const { imagenes, ...toUpdate } = updateProductDto;

    const product = await this.productoRepositorio.preload({ id, ...toUpdate });

    if (!product) throw new NotFoundException(`product with id ${id} not found `)

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {

      if (imagenes) {
        // esto es que en un producto puede haber muchas imagenes 
        await queryRunner.manager.delete(ProductoImg, { product: { id } })


        product.imagenes = imagenes.map(
          image => this.productosImgRepository.create({ url: image })
        )
      }
      product.user = user;

      await queryRunner.manager.save(product);
      //      await this.productRepository.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release()

      return this.finOnePlain(id);

    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBExceptions(error);

    }
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
