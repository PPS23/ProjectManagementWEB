import { PersonResponseDto } from '../Persons/PersonResponseDto';

export class UserResponseDto {
    id: number = 0;
    email: string = "";
    domainName: string = "";
    isActive: boolean = true;
    person: PersonResponseDto = new PersonResponseDto();
    totalPages: number = 0;
}