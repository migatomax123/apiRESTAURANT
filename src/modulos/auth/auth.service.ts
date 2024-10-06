import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { UsuarioRepository } from '../users/entities/users.repository';
  import { RegisterAuthDto } from './dto/register.dto';
  import { LoginAuthDto } from './dto/login.dto';
  import { Usuario } from '../users/entities/users.entity';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly userRepository: UsuarioRepository,
      private readonly jwtService: JwtService,
    ) {}
  
    async register(registerDto: RegisterAuthDto) {
      console.log(registerDto);
      // const { username, email, password} = registerDto; // operador destructuracion
      // const { email, ...resto} = registerDto; // ... operador spread
      // return registerDto;
      if (await this.userRepository.findByEmail(registerDto.email)) {
        throw new BadRequestException('email ya registrado');
        // ABORTA la función register y NO CONTINUA
      }
  
      if (await this.userRepository.findByUsername(registerDto.username)) {
        throw new BadRequestException('usuario ya registrado');
        // ABORTA la función register y NO CONTINUA
      }
  
      console.log('El email', registerDto.email, ' no existe en la BD');
      console.log('El usuario', registerDto.username, ' no existe en la BD');
  
      try {
        registerDto.password = await this.getHash(registerDto.password);
        await this.userRepository.save(registerDto);
        const usuario = await this.userRepository.findByEmail(registerDto.email);
        if (usuario) {
          return {
            msg: 'Usuario registrado',
            status: 200,
            user: usuario,
          };
        }
      } catch (error) {
        throw new InternalServerErrorException('Error al registrar');
      }
    }
  
    async login(loginDto: LoginAuthDto) {
      const usuario = await this.userRepository.findByEmail(loginDto.email);
      if (!usuario) {
        throw new NotFoundException('Usuario no existe');
      }
      let isValidPassword;
      try {
        isValidPassword = await this.isMatch(loginDto.password, usuario.password);
      } catch (error) {
        throw new InternalServerErrorException('error validar password');
      }
  
      if (isValidPassword) {
        // return 'Login sucess'
        return {
          msg: 'Usuario validado',
          status: 200,
          user: usuario,
          token: this.getAccesToken(usuario),
        };
      } else {
        return 'Login not success';
      }
    }
  
    async getHash(password: string) {
      return await bcrypt.hash(password, 10);
    }
  
    async isMatch(password: string, hash: string) {
      return await bcrypt.compare(password, hash);
    }
  
    private getAccesToken(user: Usuario) {
      // console.log(user);
      // console.log(proccess.env.JWT_SECRET)
  
      try {
        // Crea el token con los campos del user seleccionado
        // y la configuración del jwtModule.register()
        const accessToken = this.jwtService.sign({
          id: user.id,
          name: user.username,
          email: user.email,
          // rol: user.roles[0],
          // create: user.createdAt
        });
        return accessToken;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Error al crear el token');
      }
    }
  }