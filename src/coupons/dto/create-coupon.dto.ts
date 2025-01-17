import { IsDateString, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator"

export class CreateCouponDto {
    @IsNotEmpty({ message: 'El nombre del cupón es obligatorio.' })
    @IsString({ message: 'El campo Nombre es de tipo string.' })
    name: string
    
    @IsNotEmpty({ message: 'El descuento no puede ir vacío.' })
    @IsInt({ message: 'El descuento debe ser un número entero.' })   
    @Max(100, { message: 'El descuento máximo es de 100.' })
    @Min(1, { message: 'El descuento mínimo es de 1.' })
    percentage: number
    
    @IsNotEmpty({ message: 'La fecha no puede ir vacia.' })
    @IsDateString({}, { message: 'Fecha no válida.' })    
    expirationDate: Date
}
