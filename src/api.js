export function post() {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  return promise;
}
