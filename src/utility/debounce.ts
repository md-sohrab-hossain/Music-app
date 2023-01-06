export const debounce = (fnc: any, wait = 1000) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fnc(...args);
    }, wait);
  };
};
