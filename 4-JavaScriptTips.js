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

////////////////////////////////////////////////////////////////////////////
/* || (ИЛИ), && (И) и ! (НЕ) */
////
let hour = 12;
let isWeekend = true;
if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'Офис закрыт.' ); // это выходной
}
////
let hour = 12;
let minute = 30;
if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
//
let x = 1;
(x > 0) && alert( 'Greater than zero!' );

