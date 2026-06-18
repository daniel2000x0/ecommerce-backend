import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ConflictException, UseGuards ,  Request} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { UsersService } from '../../users/services/users.service';
import { CustomerService } from '../../customer/customer.service';
import { RoleEnum } from '../../../common/enums/rol.enum';
import { LoginUserDto } from '../dto/login.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { OAuthTokenDto } from '../dto/oauth-token.dto';
import { RefreshJwtGuard } from '../guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService : UsersService,
     private readonly customerSevice : CustomerService
  ) {}

  @Roles(RoleEnum.ADMIN)
  @Post('login')
    @ApiResponse({ status: 201,  description : 'User successfully logged in' })
  @ApiResponse({ status: 401, description : 'Conflict - User not found' })
  @ApiBody({type : LoginUserDto, description: 'Data required to login' })
  async loginUser (@Body() login : LoginUserDto){
    return  await this.authService.login(login)
  }
  @Post('registrar')
  @ApiResponse({ status: 201,  description : 'User successfully registered' })
  @ApiResponse({ status: 409, description : 'Conflict - User already exists' })
  @ApiBody({type : CreateCustomerDto, description: 'Data required to create a new user' })
  async registerCustomer(
    @Body(new ValidationPipe()) createUser: CreateCustomerDto,
  ) {
    try {
      const newUser = await this.customerSevice.register(createUser); // <- await
      return {
        message: 'User created successfully',
        user: newUser.customer.firstname,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          message: error.message,
          statusCode: 409,
        };
      }

      return {
        message: 'Error en el servidor',
        error: error,
        statusCode: 500,
      };
    }
  }
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @ApiResponse({ status: 200, description: 'Refresh token successfully generated' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired refresh token' })
  refreshToken(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.refreshToken(req.user);
  }

  @Post('oauth/token')
  @ApiResponse({ status: 200, description: 'OAuth token successfully generated' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiBody({ type: OAuthTokenDto, description: 'Data required to generate an OAuth token' })
  async oauth2Token(
    @Body(new ValidationPipe({ whitelist: true }))
    body: OAuthTokenDto,
  ) {
    const {
      grant_type,
      username,
      password,
      refresh_token,
      client_id,
      client_secret,
    } = body;

    return this.authService.oauth2Token(
      grant_type,
      username,
      password,
      refresh_token,
      client_id,
      client_secret,
    );
  }
}
