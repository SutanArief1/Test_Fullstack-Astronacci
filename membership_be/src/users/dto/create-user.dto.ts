export class CreateUserDto {
  fullname: string;
  email: string;
  password: string;
  role: "Bronze" | "Silver" | "Platinum";
}
