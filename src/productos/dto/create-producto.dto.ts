import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";




export class CreateProductoDto {

    ///////////////////////////////////////////////////////

    @IsString()
    @MinLength(1)
    titulo: string;

    ///////////////////////////////////////////////////////

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number

    ///////////////////////////////////////////////////////

    @IsNumber()
    @IsOptional()
    @IsPositive()
    stock: number

    ///////////////////////////////////////////////////////

    @IsString({ each: true })
    @IsArray()
    talles: string[]

    ///////////////////////////////////////////////////////


    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[]


    ///////////////////////////////////////////////////////

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    imagenes?: string[];

    ///////////////////////////////////////////////////////

}
