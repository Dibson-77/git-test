import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourDto {
    @IsString()
    nomcours: string;

    @IsNumber()
    etudiantId: number;
}
 