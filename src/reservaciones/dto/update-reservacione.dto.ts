import { PartialType } from '@nestjs/mapped-types';
import { CreateReservacionDto } from './create-reservacione.dto';

export class UpdateReservacionDto extends PartialType(CreateReservacionDto) {}
