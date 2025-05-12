import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserdto } from './dto/Login-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { signupResponse } from './user';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService 

  ){}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signup(payload: CreateUserDto): Promise<signupResponse> { 

    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email: payload.email,
      }
    });

    if (existingUser) {
         
      throw new BadRequestException('Utilisateur crée avec email', {
      cause: new Error(),
      description: 'Utilisateur existe déjà !',
     });

    }

    const hash = await this.encryptPassword(payload.password, 10);
    payload.password = hash;
    return this.prismaService.user.create({
        data: {
          nom: payload.nom,
          prenom: payload.prenom,
          email: payload.email,
          password: payload.password,
          
          
        },
        select:{ 
          email: true,
          id: true 
      }
    })
  }
  async Login(LoginUserdto: LoginUserdto): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: LoginUserdto.email,
      },
    });
  
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé !');
    }
  
    const isMatched = await this.decrytPassword(
      LoginUserdto.password,
      user.password,
    );
  
    if (!isMatched) {
      throw new UnauthorizedException('Mot de passe invalide');
    }
  
    const accessToken = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        expiresIn: '1d',
      },
    );
  
    return { accessToken };
  }
  

  

  async encryptPassword(plainText, saltRounds){
     return await bcrypt.hash(plainText, saltRounds);

  }

  async decrytPassword(plainText,hash){
    return await bcrypt.compare(plainText,hash)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
