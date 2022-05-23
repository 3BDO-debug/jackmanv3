import {navigationRef} from '.';

const navigate = (name: any, params?: any): any => {
  if (navigationRef.current) {
    return navigationRef.current.navigate(name, params);
  } else {
    console.error('!!!!not mounted yet!!!!!!!');
  }
};

const reset = (name: any, params?: any) => {
  if (navigationRef.current) {
    return navigationRef.current.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    });
  } else {
    console.error('!!!!not mounted yet!!!!!!!');
  }
};

const goBack = () => {
  if (navigationRef.current) {
    return navigationRef.current.goBack();
  } else {
    console.error('!!!!not mounted yet!!!!!!!');
  }
};

export {navigate, reset, goBack};
