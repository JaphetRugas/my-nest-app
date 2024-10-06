import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { log } from 'console';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { parse } from 'path';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  // default code : value: any
  /**
 * Validates the age property of a CreateUserDTO object.
 * Converts the age property to an integer using parseInt.
 * If the conversion fails, throws an HttpException with a message of "Invalid number" and a status code of HttpStatus.BAD_REQUEST.
 * If the conversion is successful, returns a new object that is a copy of the original CreateUserDTO object, but with the age property replaced by the parsed integer.
 */
  transform(value: CreateUserDTO, metadata: ArgumentMetadata) {
    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      throw new HttpException('Invalid number', HttpStatus.BAD_REQUEST)
    }

    return {
      ...value,
      age: parseAgeToInt,
    }
  }
}
