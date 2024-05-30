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
export interface ICatalog {
  id: number;
  catkey: string;
  catname: string;
  isdeleted: boolean;
  createdate: Date;
}
export interface ICatalogDetail {
  id: number;
  catid: number;
  catdetkey: string;
  catdetname: string;
  isdeleted: boolean;
  createdate: Date;
}
export interface IMenu {
  id: number;
  icon: string;
  title: string;
  url: string;
  menuChildren: IMenu[];
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
export interface ISlideItem {
  rowId: number;
  title: string;
  subTitle: string;
  titleSideTop: string;
  titleSideBottom: string;
  iconSide: boolean;
  avatar: boolean;
}

export interface IPropertyObject {
  key: string;
  value: string;
}
export interface IParamsQuery {
  key: string;
  value: string;
}
