interface Task {
  task: number[];
}
const tasks3: Task[] = [
  { task: [1, 2, 3] },
  { task: [4, 5, 6] },
  { task: [7, 8, 9] },
];


function doSomething3(num: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, Math.random() * 2000);
  });
}

async function main3() {
  for (const el of tasks3) {
    const result = await Promise.all(
      el.task.map((item) => {
        return doSomething3(item);
      })
    );

    console.log(result);
  }
}
main3();
