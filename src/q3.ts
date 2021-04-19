const tasks2: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function doSomething2(num: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, Math.random() * 2000);
  });
}

async function main2() {
  let pm_tasks = [];
  for (const task of tasks2) {
    pm_tasks.push(doSomething2(task));
  }
  const result = await Promise.all(pm_tasks);
  console.log(result);
}

main2();
