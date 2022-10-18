// const ARRAY_NUMBER = [1, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7]

// function countNumber() {
//   var numbers = {};
//   ARRAY_NUMBER.forEach((num, indexCurrentNumber) => {
//     numbers[num] = 0;
//     ARRAY_NUMBER.forEach((value, index) => {
//       if (num === value) {
//         numbers[num] += 1;
//       }
//     })
//   })
//   return numbers;
// }
// console.log('Count number:');
// console.log(countNumber());
// console.log('Difference number:');
// console.log(Object.entries(countNumber()).length);

// function findMaxNumber(number) {
//   let arrayNum = String(number).split('').map((value) => Number(value));
//   return Math.max(...arrayNum);
// }

// function findMaxNumber2(number) {
//   number = Number(number);
//   let numberMax = 0;
//   while (number > 0) {
//     number = Math.floor(number / 10);
//     let numSplit = Math.floor(number % 10);
//     if (numSplit > numberMax) {
//       numberMax = numSplit;
//     }
//   }
//   return numberMax;
// }

// console.log(findMaxNumber2(34567890));