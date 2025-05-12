import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateEtudiantDto {
    @IsString()
    nom : string 

    @IsString()
    prenom : string 
    

    @IsNumber()
    age : number
}
