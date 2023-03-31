// const fs = require('fs')

// setTimeout(() => {
//   console.log("hello!")
// }, 3000)


// // API request
// let data;
// while (!data) {
//   setTimeout(() => {
//     data = axios('....')
//   }, 100)
// }

// let result;
// fs.readFile('./data', (err, data) => {
//   console.log(data);
//   result = data;
//   fs.readFile(data, () => {
//     fs.readFile(
//       // ................callback hell
//     )
//   })
// })

// const data = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Hello World!")
//   }, 3000)
// })
//   .then((data) => resolve(data))
//   .then((newDat) => hell(newDat)).
  // .then(dldl);
  // ..
  // ..
  // .
  // .
  // .
  // .
  // .

// doSomething(newDat)

// 비동기는 어디에 쓰는지?

// async, await - 비동기 코드를 동기처럼 쓸수 있게 해준다!

// function helloSync() {
// }
// const newResult = helloSync()
// async function hello() {
//   return "data"
// }
// const result = await hello()

// 1. await를 쓰려면 무조건 async 함수 내부에서 써야한다.
// 2. async 함수는 Promise를 리턴한다.

// async function hello() {
//   return 'data'
// }

// const result = await hello();

// async function foo() {
//   // do something...
//   return 'xxx'
// }

// const value = await foo();
// console.log(value);

// 비동기 == concurrency !== parallelism

function waitAndShow(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`done at ${sec}!`);
      resolve()
    }, sec)
  })
}

async function main() {
  await waitAndShow(3000);
  await waitAndShow(2000);
  await waitAndShow(2500);
}

main();
