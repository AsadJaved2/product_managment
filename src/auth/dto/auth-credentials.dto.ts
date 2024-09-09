import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min).' })
  @MaxLength(20, { message: 'Password is too long (20 characters max).' })
  @Matches(
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s))/,
    { message: 'Password must contain upper case, lower case, number and special character.' }
  )
  password: string;
}
