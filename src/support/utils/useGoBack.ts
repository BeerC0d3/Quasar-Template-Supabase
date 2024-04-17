import { routerInstance } from 'boot/router';

export default function useGoBack() {
  const pathArray = routerInstance.currentRoute.value.path.split('/');
  let newPath = '';
  if (pathArray.length == 5) {
    pathArray.splice(4, 1);
    pathArray.splice(3, 1);
  } else {
    pathArray.pop();
  }

  newPath = pathArray.join('/');
  routerInstance.push(newPath);

  // if (pathArray.length > 2) {
  //   pathArray.pop();
  //   //console.log('pathArray ' + pathArray);
  //   const newPath = pathArray.join('/');
  //   console.log('newpath ' + newPath);
  //   routerInstance.push(newPath);
  // }
}
