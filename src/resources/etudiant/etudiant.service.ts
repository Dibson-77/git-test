import { Injectable } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'; 


@Injectable()
export class EtudiantService {
    constructor(private readonly prismaService: PrismaService) {}
    
  async create(data: CreateEtudiantDto) {
    const etudiant = await this.prismaService.etudiant.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        age: data.age
      }}
    )
    return etudiant;
  }

    async encryptPassword(plainText, saltRounds){
       return await bcrypt.hash(plainText, saltRounds);
  
    }

  async findAll() {
    return await this.prismaService.etudiant.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.etudiant.findUnique(
      {
       where : {id},
       include: {cours:true}
      },

    );
  }

  async update(id: number, data: UpdateEtudiantDto) {
    const etudiant = await this.prismaService.etudiant.update({
      where: {id},
      data: {
        nom: data.nom,
        prenom: data.prenom,
        age: data.age
      },
     
    }
    )
    return etudiant;
  }

  async remove(id: number) {
     await this.prismaService.etudiant.delete({
      where:{id}
    });

    return ("votre etudiant a ete supprime")
  }
}
