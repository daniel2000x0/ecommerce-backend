import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class OAuthTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['password', 'refresh_token', 'client_credentials'])
  grant_type!: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  refresh_token?: string;

  @IsString()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  client_secret?: string;
}