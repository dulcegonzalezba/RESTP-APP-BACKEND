// productos/dto/create-producto.dto.ts

export class CreateProductoDto {
  productoulid: string;
  grupoproductoulid: string;
  subgrupoproductoulid: string;
  claveproducto: string;
  tipoproducto: string; // USER-DEFINED, podrías usar un enum
  nombredelproducto: string;
  favorito: boolean;
  descripcion: string;
  exentoimpuesto: boolean;
  precioabierto: boolean;
  unidadesulid: string;
  areaproduccionulid: string;
  almacenulid: string;
  controlstock: boolean;
  precioxutilidad: boolean;
  facturable: boolean;
  clavetributaria: string;
  suspendido: boolean;
  comedor: boolean;
  adomicilio: boolean;
  mostrador: boolean;
  enlinea: boolean;
  enapp: boolean;
  canalesventa: boolean;
  enmenuqr: boolean;
  clasificacionqrulid: string;
  datosdinamicos: any; // Puedes definir una interfaz más específica si sabes su estructura
  fecha_ultimocambio: string; // o Date, según cómo lo manejes
  fecha_sync: string;         // o Date
  usuarioulid: string;
  empresaulid: string;
}
