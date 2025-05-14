import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    nom : string

    @IsString()
    prenom : string

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string
 
    @IsDate()
    @IsOptional()
    createAt : Date 
}
