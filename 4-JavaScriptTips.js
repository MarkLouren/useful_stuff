//++Variable++//

let counter = 1;
let a = ++counter; // (*)
alert(a); // 2

let counter = 1;
let a = counter++; // (*) меняем ++counter на counter++
alert(a); // 1

// 
a === b //cтрогое сравнение
a == b // сравненение
a = b //присваивание

//
let age = prompt('Сколько тебе лет?', 100);
alert(`Тебе ${age} лет!`); // Тебе 100 лет!
