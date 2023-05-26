import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  isRgbColor,
  isHexColor,
  isHSL,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  IsISO8601,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

@ValidatorConstraint({ name: 'ColorValidator', async: false })
export class IsColor implements ValidatorConstraintInterface {
  validate(text: string) {
    return isHSL(text) || isRgbColor(text) || isHexColor(text);
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Text ($value) is not a valid color!';
  }
}

export class Payload {
  @IsNumber()
  @IsNotEmpty()
  light: number;

  @Validate(IsColor)
  @IsNotEmpty()
  color: string;
}

export class SpreadsheetInputDto {
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsNotEmpty()
  internet: boolean;

  @ValidateNested()
  @Type(() => Payload)
  payload: Payload;
}
