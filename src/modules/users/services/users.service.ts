import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRole } from '../../users-roles/entities/users-role.entity';
import { RolesAddDto } from '../dto/roles-add.dto';
import { hash } from 'bcrypt';
import { RoleEnum } from '../../../common/enums/rol.enum';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    //@InjectRepository(User)
    // instancia  el  repositorio  de  shopping card para almacenar    los  datos
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    @InjectRepository(UsersRole)
    private readonly userRoleService: Repository<UsersRole>,
  ) {}
  async findAll() {
    return await this.userService.find();
  }
  async roles(
    rol: RolesAddDto,
  ): Promise<{ message: string; save: UsersRole | null }> {
    try {
      let save: UsersRole | null = null;
      for (const roleId of rol.roleids) {
        const newUserRole: UsersRole = this.userRoleService.create({
          user: { id: rol.userid } as User,
          role: { roleid: roleId } as any,
        });
        save = await this.userRoleService.save(newUserRole);
      }
      return {
        message: 'Roles asignados correctamente',
        save,
      };
    } catch (error) {
      this.logger.error(`Error assigning roles to user ${rol.userid}`, error);
      throw new InternalServerErrorException('Error al asignar roles');
    }
  }
  ///ERROR//
  //async;

  async Register(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      // Hashear la contraseña

     
      const hashedPassword = await hash(createUserDto.userpassword, 10);

      // Verificar si el email ya existe
      const existingUser = await this.userService.findOne({
        where: { email: createUserDto.useremail },
      });

      if (existingUser) {
        throw new ConflictException(
          `El correo "${createUserDto.useremail}" ya está registrado`,
        );
      }
      return await this.dataSource.transaction(async (manager) => {

  const userRepo = manager.getRepository(User);

  const existingUser = await userRepo.findOne({
    where: { email: createUserDto.useremail },
  });

  if (existingUser) {
    throw new ConflictException(`El correo ya existe`);
  }

  const newUser = manager.create(User, {
    ...createUserDto,
    password: hashedPassword,
  });

  const savedUser = await manager.save(User, newUser);

  await manager.save(UsersRole, {
    user: { id: savedUser.id },
    role: { roleid: RoleEnum.CUSTOMER },
  });

  return {
    message: 'Usuario creado correctamente',
    user: savedUser,
  };
});
      // return await this.dataSource.transaction(async (manager) => {
      //   const userepo = manager.getRepository(User);
      //   const userrolrepo = manager.getRepository(UsersRole);
      //   const newUser: User = userepo.create({
      //     ...createUserDto,
      //     password: hashedPassword,
      //   });
      //   // Guardar en la base de datos
      //   const savedUser = await userepo.save(newUser);
      //   const userrole = userrolrepo.create({
      //   user: { id: savedUser.id }, 
      //   role: { roleid: RoleEnum.CUSTOMER },
      // });
      //   const rolsaved = await userrolrepo.save(userrole);
      //   // Retornar mensaje de éxito
      //   this.logger.debug(`Role assigned to user ${savedUser.id}`, rolsaved);
      //   return {
      //     message: 'Usuario creado correctamente',
      //     user: savedUser,
      //   };
      // });
    } catch (error: any) {
      this.logger.error('Error creating user', error);

      // Si es un error de duplicidad de Postgres
      if (error.code === '23505') {
        throw new ConflictException(
          `El correo "${createUserDto.useremail}" ya está registrado`,
        );
      }

      // Cualquier otro error inesperado
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
  async findOne(email: string) {
    return await this.userService.findOne({
      where: { email: email },
    });
  }
  async finId(id: number) {
    return await this.userService.findOne({
      where: { id: id },
    });
  }
  async findOneWithUserName(userName: string) {
    return await this.userService.findOne({
      where: { email: userName , isVerified:true},
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateduser = await this.userService.findOne({
      where: { id: id },
    });
    if (!updateduser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    // Si hay actualización de contraseña, hacer hash
    if (updateUserDto.userpassword) {
      const hashedPassword = await hash(updateUserDto.userpassword, 10);
      updateUserDto.userpassword = hashedPassword;
    }

    // Mezclar los datos nuevos en la entidad existente
    Object.assign(updateduser, updateUserDto);

    // Guardar cambios
    return await this.userService.save(updateduser);
  }
}
