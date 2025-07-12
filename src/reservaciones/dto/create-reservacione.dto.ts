// reservaciones/dto/create-reservacion.dto.ts

export class CreateReservacionDto {
  reservacionulid: string;

  canalreservacion?: string;
  comisionistaulid?: string;
  tiporeservacionulid?: string;
  listadeespera?: boolean;
  niños?: boolean;
  cantidadniños?: number;
  mascotas?: boolean;
  silladeruedas?: boolean;
  sillabebe?: boolean;

  clienteulid?: string;
  clientenombre?: string;
  paiscelular?: string;
  clientecelular?: string;
  clientecorreo?: string;

  numeropersonas?: number;
  notas?: string;
  mesaulid?: string;

  fechareservacion?: Date;
  horareservacion?: string; // o Date si lo manejas como hora completa
  tiempodeespera?: number;

  estadoreservacion?: string;

  usuarioulid?: string;
  empresaulid?: string;
}
