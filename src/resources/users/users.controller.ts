import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Render, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserdto } from './dto/Login-user.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('signup')
  @Render('auth/register')
  getSignupPage() {
    return { message: 'Page d\'inscription' };
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService.signup(createUserDto);
    return res.redirect('/users/login');
  }

  @Get('login')
  @Render('auth/login')
  getLoginPage() {
    return { message: 'Page de connexion' };
  }

  @Post('login')
  async login(@Body() loginUserdto: LoginUserdto, @Res() res: Response) {
    const { accessToken } = await this.usersService.Login(loginUserdto);
    // Stocker le token dans un cookie sécurisé
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 jour
    });
    return res.redirect('/users/profile');
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
