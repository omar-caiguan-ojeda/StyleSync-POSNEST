import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({message: 'El nombre del producto es obligatorio.'})
    @IsString({message: 'Nombre no válido, ingrese un texto.'})
    name: string

    @IsNotEmpty({message: 'El precio del producto es obligatorio.'})
    @IsNumber({maxDecimalPlaces: 2}, {message: 'Precio no válido.'})
    price: number

    @IsNotEmpty({message: 'La cantidad no puede ir vacía.'})
    @IsNumber({maxDecimalPlaces: 0}, {message: 'Cantidad no válida, debe ser un número entero.'})
    inventory: number

    @IsNotEmpty({message: 'La categoría es obligatoria.'})
    @IsInt({message: 'La categoria no es válida'})
    categoryId: number   

}