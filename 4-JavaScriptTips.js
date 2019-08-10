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

/*        IF / ELSE STATEMENTS  ?  */

let accessAllowed;
let age = prompt('Сколько вам лет?', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
// The same code: let accessAllowed = (age > 18) ? true : false;  => "?" - нужно назначить переменную в зависимости от условия.

// оператор сравнения "age > 18" выполняется первым в любом случае
// (нет необходимости заключать его в скобки)

let accessAllowed = age > 18 ? true : false;

// то же самое
let accessAllowed = age > 18;
