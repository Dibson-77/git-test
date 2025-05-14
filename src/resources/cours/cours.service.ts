import { Injectable } from '@nestjs/common';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoursService {
  constructor(private readonly prismaservice: PrismaService) {}
  async create(data: CreateCourDto) {
    const cours = await this.prismaservice.cours.create({
       data: {
        nomCours: data.nomcours,
        etudiantId: data.etudiantId
        
       },
    }) 
    return cours;
  }

  findAll() {
    return this.prismaservice.cours.findMany({
      include: {etudiant:true}
    });
  }

  findOne(id: number) {
    return this.prismaservice.cours.findUnique({
      where: {id},
      include: {etudiant:true}
    });
  }

  update(id: number, data: UpdateCourDto) {
    this.prismaservice.cours.update({
      where: {id},
      data: {
        nomCours: data.nomcours,
        etudiantId: data.etudiantId
      }
    });
    return console.log('Modification réussie')
  }
 
 async  remove(id: number) {
     await this.prismaservice.cours.delete({
      where: {id}
    });
    return console.log("Etudiant bien supprimé !")
  }
  
}

