// mesas/dto/create-mesa.dto.ts

export class CreateMesaDto {
  mesaulid: string;

  clavemesa?: string;
  nombremesa?: string;
  tipomesaulid?: string;
  areaventasulid?: string;
  comensalesmaximos?: number;

  usuarioulid?: string;
  empresaulid?: string;
}

