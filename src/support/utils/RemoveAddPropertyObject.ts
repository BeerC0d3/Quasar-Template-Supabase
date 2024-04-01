import { IPropertyObject } from 'src/app/Models/System/IModel';

export const useRemoveProperty = {
  removeAddProperty: (
    propertysRemove: string[],
    propertysAdd: IPropertyObject[],
    formObject: any
  ) => {
    propertysRemove.forEach((property) => {
      delete formObject[property];
    });

    propertysAdd.forEach((property: IPropertyObject) => {
      formObject[property.key] = property.value;
    });

    return formObject;
  },
};
