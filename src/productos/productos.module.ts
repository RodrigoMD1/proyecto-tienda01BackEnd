import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductoImg } from './entities/productos-imagenes.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([Producto, ProductoImg]),
    AuthModule
  ],
  exports: [
    ProductosService
  ]

})
export class ProductosModule { }
