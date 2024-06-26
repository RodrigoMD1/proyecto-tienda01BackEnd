import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';




@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) { }

  /////////////////////////////////////////////////////////////////////////////////

  @Get('productos/:imageName')

  findProductImage(
    @Res() res: Response, 
    @Param('imageName') imageName: string) {


    const path = this.filesService.getStaticProductImage(imageName);


    res.sendFile(path);


  }

  /////////////////////////////////////////////////////////////////////////////////

  @Post('producto')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits:{fileSize:10000} limite para los archivos control y espacio tengo mas opciones 
    storage: diskStorage({
      destination: './static/productos-img',
      filename: fileNamer
    })
  }))

  /////////////////////////////////////////////////////////////////////////////////

  uploadProductImage(
    @UploadedFile() file: Express.Multer.File // recomendacion para proyectos tranquis usar eso pero sino usar una base de datos aparte para las imagenes ej:puede ser en clouddinary o otra cloud 
  ) {

    if (!file) {
      throw new BadRequestException('make sure that the file is an image')
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/products/${file.filename}`;

    return { secureUrl }

  }
}
/////////////////////////////////////////////////////////////////////////////////