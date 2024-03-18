export interface SignupUserDto {
  name: string;
  email: string;
  password: string;
}

export type LoginUserDto = Omit<SignupUserDto, "name">;
