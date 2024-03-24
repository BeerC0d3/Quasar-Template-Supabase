export interface ICatalogoModel {
  totalPages: number;
  result: [] | undefined;
}

export interface ICatalogoSelect {
  value: number;
  label: string;
}

export interface ICatalogoProperty {
  id: number;
  clave: string;
  descripcion: string;
  activo: boolean;
}

export interface ICatalogo {
  id: number;
  clave: string;
  descripcion: string;
}
export interface IMenu {
  id: number;
  icon: string;
  title: string;
  url: string;
  menuChildren: [];
}
export interface IMenuEntity {
  id: number;
  icon: string;
  title: string;
  url: string;
  parentid: number;
}

export interface IModaleMessage {
  typeMessageClave: string;
  title: string;
  message: string;
  Show: boolean;
}
export interface ISwiper {
  id: number;
  nombre: string;
  selected: boolean;
}
