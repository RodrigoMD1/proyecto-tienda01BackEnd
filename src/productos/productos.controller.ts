import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  ////////////////////////////////////////////////////////////////////////////////

  @Post()
  @Auth(ValidRoles.admin)
  create(
    @Body() createProductoDto: CreateProductoDto,
    @GetUser() user: User
  ) {
    return this.productosService.create(createProductoDto, user);
  }

  ////////////////////////////////////////////////////////////////////////////////

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //console.log(paginationDto); 
    return this.productosService.findAll(paginationDto);
  }

  ////////////////////////////////////////////////////////////////////////////////

  @Get(':term')
  findOne(@Param('id') term: string) {
    return this.productosService.findOne(term);
  }

  ////////////////////////////////////////////////////////////////////////////////

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @GetUser() user: User) {
    return this.productosService.update(id, updateProductoDto, user);
  }

  ////////////////////////////////////////////////////////////////////////////////

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
