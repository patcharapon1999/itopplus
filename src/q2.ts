const tasks1: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function doSomething(num: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, Math.random() * 2000);
  });
}

async function main() {
  for (const task of tasks1) {
    const result = await doSomething(task);
    console.log(result);
  }
}

main();
