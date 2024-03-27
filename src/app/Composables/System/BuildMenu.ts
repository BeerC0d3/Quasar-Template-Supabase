import { IMenu, IMenuEntity } from 'src/app/Models/System/IModel';
import useApi from 'src/app/Composables/UseApi';
import { ref } from 'vue';

const { TableToList } = useApi();
const menus = ref<IMenu[]>([]);
const menuEntity = ref<IMenuEntity[]>([]);

const getMenu = async () => {
  try {
    menuEntity.value = await TableToList('system', 'menu');
    CreateMenu(menuEntity.value);
  } catch (error: any) {
    console.log(error);
  }
};

const CreateMenu = (menuEntity: IMenuEntity[]) => {
  const menuOrigin = menuEntity.find((item) => item.parentid == 0);
  if (menuOrigin == null || menuOrigin == undefined)
    throw 'The source menu was not found';

  menus.value.push({
    id: menuOrigin.id,
    icon: menuOrigin.icon,
    title: menuOrigin.title,
    url: menuOrigin.url,
    menuChildren: CreateMenuChildren(menuEntity, menuOrigin.id),
  });
};
const CreateMenuChildren = (
  menuEntity: IMenuEntity[],
  menuParentId: number
): any[] => {
  const menuChildren = ref<IMenu[]>([]);
  menuChildren.value = [];
  const listChildren = menuEntity.filter((item) => {
    return item.parentid == menuParentId;
  });

  //console.log(listChildren);
  listChildren.forEach((item) => {
    menuChildren.value.push({
      id: item.id,
      icon: item.icon,
      title: item.title,
      url: item.url,
      menuChildren: CreateMenuChildren(menuEntity, item.id),
    });
  });

  return menuChildren.value;
};
export default () => ({
  getMenu,
  menus,
});
