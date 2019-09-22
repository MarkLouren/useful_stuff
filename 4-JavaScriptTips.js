////////////////////////////////////////////////////////////////////////////
/*        BASIC */
////////////////////////////////////////////////////////////////////////////

/*  

Всего существует 7 типов данных:

    number для целых и вещественных чисел,
    string для строк,
    boolean для логических значений истинности или ложности: true/false,
    null – тип с единственным значением null, т.е. «пустое значение» или «значение не существует»,
    undefined – тип с единственным значением undefined, т.е. «значение не задано»,
    object и symbol – сложные структуры данных и уникальные идентификаторы; их мы ещё не изучили.

*/


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

////////////////////////////////////////////////////////////////////////////
/*        IF / ELSE STATEMENTS  ?  */
////////////////////////////////////////////////////////////////////////////

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

	<script type="text/javascript">
		var one = prompt("Enter the first number");
		var two = prompt("Enter the second number");
		one = parseInt(one);
		two = parseInt(two);
		if (one == two)
			document.write(one + " is equal to " + two + ".");
		else if (one<two)
			document.write(one + " is less than " + two + ".");
		else
			document.write(one + " is greater than " + two + ".");
	</script>

////////////////////////////////////////////////////////////////////////////
/* || (ИЛИ), && (И) и ! (НЕ) */
////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////
/* WHILE | DO | FOR */
////////////////////////////////////////////////////////////////////////////

// WHILE: -  Проверяет условие перед каждой итерацией

let i = 0;
while (i < 3) { // выводит 0, затем 1, затем 2
  alert( i );
  i++;
}

/// OR

let i = 3;
while (i) { // когда i будет равно 0, условие станет ложным, и цикл остановится
  alert( i );
  i--;}

// WHILE + BREAK

let sum = 0;
while (true) {
  let value = +prompt("Введите число", '');
  if (!value) break; // (*)
  sum += value;
}
alert( 'Сумма: ' + sum )

// WHILE + CONTINUE
for (let i = 0; i < 10; i++) {
  // если true, пропустить оставшуюся часть тела цикла
  if (i % 2 == 0) continue;
  alert(i); // 1, затем 3, 5, 7, 9
}

// DO:- Проверяет условие после каждой итерации.

let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);

// FOR: - Проверяет условие перед каждой итерацией, есть возможность задать дополнительные настройки.

for (let i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // ошибка, нет такой переменной, I - только внутри цикла

// OR FOR:

let i = 0; // мы уже имеем объявленную i с присвоенным значением
for (; i < 3; i++) { // нет необходимости в "начале"
  alert( i ); // 0, 1, 2
}

// Метки для break/continue

outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Значение на координатах (${i},${j})`, '');

    // если пустая строка или Отмена, то выйти из обоих циклов
    if (!input) break outer; // (*)

    // сделать что-нибудь со значениями...
  }
}

alert('Готово!');

////////////////////////////////////////////////////////////////////////////
/* SWITCH */
////////////////////////////////////////////////////////////////////////////

let a = 2 + 2;
switch (a) {
  case 3:
    alert( 'Маловато' );
    break;
  case 4:
    alert( 'В точку!' );
    break;
  case 5:
    alert( 'Перебор' );
    break;
  default:
    alert( "Нет таких значений" );
}
////////////////////////////////////////////////////////////////////////////
/* FUNCTION */
////////////////////////////////////////////////////////////////////////////
  function checkAge(age = 18) {
  if (age > 18) {
    return true;
  } else {
    return confirm('А родители разрешили?');
  }
}
///
function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;
    alert(i);  // простое
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}

////////////////////////////////////////////////////////////////////////////
/* FUNCTION  EXPRESSION | CALL BACK FUNCTIONS*/
////////////////////////////////////////////////////////////////////////////

//Function Declaration - Function Declaration могут быть вызваны раньше своих определений, видна только в блоке {...}
function sayHi() {
  alert( "Привет" );
}
// Function Expression - могут быть вызваны толкьо после своих определений, видна везде
let sayHi = function() {
  alert( "Привет" );
};

// CALLBACK

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
function showOk() {
  alert( "Вы согласны." );
}
function showCancel() {
  alert( "Вы отменили выполнение." );
}
// использование: функции showOk, showCancel передаются в качестве аргументов ask
ask("Вы согласны?", showOk, showCancel);

/// THE SAME VIA FUNCTION EXPRESSION:
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Вы согласны?",
  function() { alert("Вы согласились."); },
  function() { alert("Вы отменили выполнение."); }
);

// FUNCTIONS - ARROWS ///

let sum = (a, b) => a + b;

/* Функция-стрелка более краткая форма для:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

// OTHER EXAMPLE:

let inc = x => x+1; // == то же самое что:

let inc = function(x) { return x + 1; };

// ЕСЛИ Arrow Function is too big:
let getTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return hours + ':' + minutes;
};
alert( getTime() ); // текущее время

// SORTED WITH Arrow

let arr = [5, 8, 3];
let sorted = arr.sort( (a,b) => a - b );
alert(sorted); // 3, 5, 8

// Arrow Function with an object:
let getPerson =()=>({name:"John"}) // objects must be wrapped in ()
// IF ONE ARGUMENT

// тоже что и
// let double = function(n) { return n * 2 }

// OTHER Example

let age = prompt("Сколько Вам лет?", 18);
let welcome = (age < 18) ?
  () => alert('Привет') :
  () => alert("Здравствуйте!");
welcome(); // теперь всё в порядке
let double = n => n * 2;
alert( double(3) ); // 6

// DEFAULT STATEMENTS IN FUNCTION:
function showMenu(title = "Без заголовка", width = 100, height = 200) {
  alert(title + ' ' + width + ' ' + height);
}

showMenu("Меню"); // Меню 100 200

// SPREAD STATEMENT  // ..rest became a massive

function showName(firstName, lastName, ...rest) {
  alert(firstName + ' ' + lastName + ' - ' + rest);
}
// выведет: Юлий Цезарь - Император,Рима
showName("Юлий", "Цезарь", "Император", "Рима");

// SPRED IN THE BEGGINING:

'use strict';
let numbers = [2, 3, 15];
// Оператор ... в вызове передаст массив как список аргументов
// Этот вызов аналогичен Math.max(2, 3, 15)
let max = Math.max(...numbers);

alert( max ); // 15

//ДЕСТРУКТУРИЗАЦИЯ

'use strict';
let options = {
  title: "Меню",
  width: 100,
  height: 200
};

function showMenu({title, width, height}) {
  alert(title + ' ' + width + ' ' + height); // Меню 100 200
}
showMenu(options);

// ДЕСТРУКТУРИЗАЦИЯ с параметрами по умолчанию

'use strict';
function showMenu({title="Заголовок", width:w=100, height:h=200} = {}) {
  alert(title + ' ' + w + ' ' + h);
}
showMenu(); // Заголовок 100 200


// IIFI (imidiate involve function) + Arrow

(function(){
	console.log('IIFI');
})();
// THE SAME =>
(()=>console.log('IIFI'))();

// Arrow Function with Arrays:
//sum
let numbers =[1, 2, 3, 4, 5, 6, 7]
let sum =0;
numbers.forEach (num=>sum +=sum);
// squared
let squared = numbers.map(n=>n*n);
////////////////////////////////////////////////////////////////////////////
/* SETS - FOR | OF*/
////////////////////////////////////////////////////////////////////////////

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// считаем гостей, некоторые приходят несколько раз
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

for (let user in set) {
  console.log(user.name); // John (потом Pete и Mary)
}

///////////
/* CONSOLE */
/////////
 console.log("This is %cMy stylish message", "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
// используй директиву "%c" для применения стилей CSS при выводе в консоль
