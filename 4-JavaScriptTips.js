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
    
 Название функций:
 - получение данных:
 get
 receive
 request
 - возвращение данных:
 set
 responce
 sent
 returnedData
 - boolean
 isValid
 isOk

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

//Function Declaration - Function Declaration могут быть вызваны раньше своих определений, переменные видна только в блоке {...}
function sayHi() {
  alert( "Привет" );
}
// Function Expression - могут быть вызваны толкьо после своих определений, переменные видны везде
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

////////////////////////////////////////////////////////////////////////////
/*      ARROW FUNCTIONS*/
////////////////////////////////////////////////////////////////////////////

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

сonst [p1, p2, p3, ...others] =array;
const {x,y} = object; //where object {'x':1, 'y':2}

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
/*     CONSTRUCTOR FUNCTIONS*/
////////////////////////////////////////////////////////////////////////////
// Used in order to create many similar objects
// They are named with capital letter first, they should be executed only with 'new' operator

function User(name){
	this.name = name;
	this.isAdmin = false;
}
let user = new User('Adam');
let user2= new User ('An');

// Explanation:
function User(name) {           // => new User = an emptly object is created and assigned to this
	// this = {}; (implicitly)
	// add properties to this:
	this.name=name;
	this.isAdmin =false;
	//return this; (implicitly)
}
// Methods in Constructor
// in the constructor, we can add to this not only properties but methods as well
	
function User(name) {
	this.name = name;
	this.sayHi = function() {
		alert('my name is: ' + this.name);
	};
}
let john = new User('John');
john.sayHi(); // My name is: John

////////////////////////
/* This Keyword */
////////////////////////
/* To access the object, a method can use the THIS keyword
the value of THIS id the object "before the dot", i.e. the object that was used to call the method
*/
let user = {
	name: 'John', age:30,
	sayHi() {
		alert(this.name); // this == user
	}
};
user.sayHi(); // John


////////////////////////////////////////////////////////////////////////////
/*      OBJECTS */
////////////////////////////////////////////////////////////////////////////
// user.name - property (state)
// user.sayHi() - method (action)

// NEW Object:
let user =new Object()
let user ={}  //object literal
let x = Object.create(null)  // для создание обьекта без наследования prototype то есть чистый без свойств global

user = {name:'John'}
user.name // Get Object Values
user.isAdmin = true // add a new property

delete user.name //delete property

let user {
	name, // the same as name:name;
	age,  // the same as age:age;
}
// Property existance check:
	
alert(user.noSuchProperty === undefined); // True, no such property

alert ('blabla' in user); // false , blaba doesn't exist

// for in Loop
let user = {}
for (key in object) {
	console.log(key);
	consolie.log(user[key]);
}

// вывод  ключей и значений
	object.keys(x)
	object.values(x)


// Object.assign() - Dublicate an existing object
Object.assign(dest[, src1, src2, src3...]) 
//example:
let user = {name:'John',
	    age:30};
let clone =Object.assign({}, user); // now clone is fully independent clone
clone.nme = 'David';


// Create a Method object (action that performs on the object)
let user = {
	sayHi:function(){
		alert('Hello');
	}
};
// A shorter version
let user = {
	sayHi() {alert ('Hello')};
};
	// Добавление свойств к объекту:
	object.x;
	object[x]; // в квадратные ссылки можно отправлять динамичкские параметры let x ='name', object[name]='Ivan'
       
	object.defineProperty(x, 'name', sName)
	
// запрет на редактирование обьекта
	
	object.freeze(x);
	object.seal(x);

///////////// дискрипторы обьектов://////////////////////////////
/*
- writable – если true, свойство можно изменить, иначе оно только для чтения.
- enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
- configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

*/
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName); // позволяет получить полную информацию о свойстве.
Object.defineProperty(obj, propertyName, descriptor) // create new Property name

	
// Create several properties at once:
	
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
// example:
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
	
////////////////
	
let user = {};

Object.defineProperty(user, "name", {
  value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false, -нельзя пепеписать
  "enumerable": false, -исчезает с циклов
  "configurable": false  - нельзя удалить или изменить
}
 */
	
//Exmplem make a property not writable:
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false
});
	
// not enumerable
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
  enumerable: false
});

// Теперь наше свойство toString пропало из цикла:
for (let key in user) alert(key); // name

// глобальное запечатывание обьекта;
	
Object.preventExtensions(obj) //Запрещает добавлять новые свойства в объект.
Object.seal(obj) //Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
Object.freeze(obj) //Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false для всех существующих свойств.
Object.isExtensible(obj) //Возвращает false, если добавление свойств запрещено, иначе true.
Object.isSealed(obj) //Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.
Object.isFrozen(obj) //Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено configurable: false, writable: false.

////////////////////////////////////////////////////////////////////////////
/* Getter Setter */ //x - свойства-аксессоры 
 //представлены методами: «геттер» – для чтения и «сеттер» – для записи.

let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },
set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
};
	
/// Example: 
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName запустится с данным значением
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper

// Example 2

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // возраст рассчитывается из текущей даты и дня рождения
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // доступен как день рождения
alert( john.age );      // ...так и возраст
			
	
	
// add all properties in one object
	const parametr1 = {
name:'Ivan'}
	const parametr2 ={
		age:14;}
	const allparametr = {...parametr1, ...parametr2} // add all properties in one object
	
	// TRICK 
const cars {
	"0":"Ford",
	 "1":"Lada",
	 "2":"Mersedes"
}
	for (let i=0; i<cars.length; i++){
		console.log(cars[i])}
	
	
////////////////////////////////////////////////////////////////////////////
/*      Symbol Type*/
////////////////////////////////////////////////////////////////////////////

	let id = Symbol();  //symbols are guranteed to be unique, even if they have the same description
// or give s symbol description 'id'
	let id = Symbol ('id);
			 
// add a symbol as a key to the object:
	let user = {
		name:'John'};
	let id =Symbol('id);
	user[id] = 'ID Value';
	alert (user[id]); // we can get acess the data using the symbol as the key
	
	// or
        let id = Symbol ('id);
	
	let user = {
		name: 'John",
		[id]:123     // Not just 'id:123'
	};
			 

////////////////////////////////////////////////////////////////////////////
/*       STRINGS */
////////////////////////////////////////////////////////////////////////////
// create
let a ='something';

// cпецсимволы
\n  // перевод строк \  //cимвол экранирования

 
// методы
alert( `My\n`.length ); // 3  -длина строки
	
let str = `Hello`;

// получаем первый символ
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// получаем последний символ
alert( str[str.length - 1] ); // o

for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char — сначала "H", потом "e", потом "l" и т. д.)
}

alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface

// поиск подстроки
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
alert( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру

str.lastIndexOf(substr, position) // альтернатива

//ВСЕ вхождения подстроки
	
let str = 'Ослик Иа-Иа посмотрел на виадук';

let target = 'Иа'; // цель поиска

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Найдено тут: ${foundPos}` );
  pos = foundPos + 1; // продолжаем со следующей позиции
}
			 
// тоже самое но короче
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}

//~побитоывый оператор НЕ для того чтобы правильно считало подструку в 0 индексе, так как возращает 0 и if считает ее как ошибку
	
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Совпадение есть' ); // работает
}
// includes, startsWith, endsWith
	
alert( "Widget with id".includes("Widget") ); // true
alert( "Hello".includes("Bye") ); // false
alert( "Midget".includes("id", 3) ); // false, поиск начат с позиции 3

// substring, substr и slice  ||str.substring(start [, end]) || str.substr(start [, length]) получение подстроки 
 
let str = "stringify";
// 'strin', символы от 0 до 5 (не включая 5)
alert( str.slice(0, 5) );

let str = "stringify";
// для substring эти два примера — одинаковы
alert( str.substring(2, 6) ); // "ring"

// cравнение str.codePointAt(pos)

// одна и та же буква в нижнем и верхнем регистре
// будет иметь разные коды
alert( "z".codePointAt(0) ); // 122
alert( "Z".codePointAt(0) ); // 90

// Создаёт символ по его коду code
String.fromCodePoint(code)
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true  // проверка двух похожих символов

//str.localeCompare(str2) возвращает число, которое показывает, какая строка больше в соответствии с правилами языка:
alert( 'Österreich'.localeCompare('Zealand') ); // -1 Отрицательное число, если str меньше str2

str.trim()  //убирает пробелы в начале и конце строки.
str.repeat(n) // повторяет строку n раз.
let newstr=str.split(' ');

////////////////////////////////////////////////////////////////////////////
/*       DATE and TIME */
////////////////////////////////////////////////////////////////////////////
	
var now = new Date();
new Date(milliseconds) // Создаёт объект Date, значение которого равно количеству миллисекунд (1/1000 секунды), прошедших с 1 января 1970 года GMT+0
getTime() //the same
Date.now() // возвращает дату сразу в виде миллисекунд.
new Date(year, month, date, hours, minutes, seconds, ms)
.getFullYear() //Получить год (из 4 цифр)
.getMonth() //Получить месяц, от 0 до 11.
.getDate() //Получить число месяца, от 1 до 31.
..getDay()
getHours(), getMinutes(), getSeconds(), getMilliseconds()

// текущая дата
var date = new Date();
// час в текущей временной зоне
alert( date.getHours() );
// сколько сейчас времени в Лондоне?
// час в зоне GMT+0
alert( date.getUTCHours() );

//Следующие методы позволяют устанавливать компоненты даты и времени:
setFullYear(year [, month, date])
setMonth(month [, date])
setDate(date)
setHours(hour [, min, sec, ms])
setMinutes(min [, sec, ms])
setSeconds(sec [, ms])
setMilliseconds(ms)
setTime(milliseconds)

// Example:	
var today = new Date;

today.setHours(0);
alert( today ); // сегодня, но час изменён на 0

today.setHours(0, 0, 0, 0);
alert( today ); // сегодня, ровно 00:00:00.	
	
// EXAMPLE 2  Методы вывода Даты с локализацией
var date = new Date(2014, 11, 31, 12, 30, 0);

var options = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

alert( date.toLocaleString("ru", options) ); // среда, 31 декабря 2014 г. н.э. 12:30:00
alert( date.toLocaleString("en-US", options) ); // Wednesday, December 31, 2014 Anno Domini 12:30:00 PM
// Методы вывода без локализации: 
toString(), toDateString(), toTimeString() 
	
	
////////////////////////////////////////////////////////////////////////////
/*       ARRAYS */
////////////////////////////////////////////////////////////////////////////
	
// create
let arr=[];
let arr = new Array();
let arr =Array();  // if let Array(5) => arr.length(5);
	
arr.length  //length
/// 1 option
for (let i=0; i<=arr.lenght; i++){
	alert (arr[i]};
// 2 option:
for (let x of arr){
		alert(arr[x]};
// Array methods:
/*
    Для добавления/удаления элементов:
        push (...items) – добавляет элементы в конец,
        pop() – извлекает элемент с конца,
        shift() – извлекает элемент с начала,
        unshift(...items) – добавляет элементы в начало.
        splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount элементов и вставляет items.
        slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).
        concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.

    Для поиска среди элементов:
    
        indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
        includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
        find/filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true. i=>i!=4=>[2]/[2,3,6]
        findIndex похож на find, но возвращает индекс вместо значения.

    Для перебора элементов:
        forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.

    Для преобразования массива:
        map(func) – создаёт новый массив из результатов вызова func для каждого элемента. =>true,false
        sort(func) – сортирует массив «на месте», а потом возвращает его.
        reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
        split/join – преобразует строку в массив и обратно.
        reduce(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

    Дополнительно:
        Array.isArray(arr) проверяет, является ли arr массивом.
	
	Обратите внимание, что методы sort, reverse и splice изменяют исходный массив.

*/

// Iterables		      
let str ='hello';
let iterator = str[Symbol.iterator]();
while(true){
  let result = iterator.next();
  if (result.done) break;
  alert(result.value);
}
//Array.from()  //takes an iterable and makes a real Array
let mystr ='%6';
let chars = Array.from (mystr);
alert(chars[0]);// %
alert(chars[1]); //6
	

		      
		      
////////////////////////////////////////////////////////////////////////////
/*        SET */ //Set – это коллекция, которая имеет уникальные значения, то есть не может иметь дубликатов
////////////////////////////////////////////////////////////////////////////   
	
    let set = new Set([3, 5, true, 'This is a string, obviously.']);
    for (let item of set.values()) {
      console.log(item);
    }	
/*
Наиболее важные методы, присутствующие в экземпляре Set:

    add(element) – Добавляет новый элемент в Set
    clear() – Удаляет все элементы из Set
    delete(element) – Удаляет указанный элемент из Set
    forEach – Это как классический цикл forEach для массива
    has(value) – Возвращает true, если коллекция содержит данный элемент.
    toString() – Распечатывает “[object Set]”
    values() – Возвращает все значения коллекции Set
    keys() – То же, что и values(). Это псевдоним для метода values(). Единственная причина, по которой он существует,
    – иметь единый интерфейс для новых типов коллекций в JavaScript.
    */

//For Each

mySetInstance.forEach(function callback(value1, value2, Set) { 
     // some code that will be run for every value inside ofSet
    }[, thisArg])
	
// Convert Set to Array
    let set = new Set([9, 15]);
    set.add(44);
    let arr = [...set];
    console.log(arr); // [9, 15, 44]
// Create Unique Array
    let arr = [ 13, 11, 15, 21, 13, 11, 17, 17, 19, 19, 21 ];
    let uniqueArray = [...new Set(arr)];
    console.log(uniqueArray); // [13, 11, 15, 21, 17, 19]
////////////////////////////////////////////////////////////////////////////
/*       MAP */ //
////////////////////////////////////////////////////////////////////////////
	let map = new Map([['name', 'CodingBlast'], ['points', 33], [true, 55], ['true', 44]])
for (let [key, value] of map.entries()) {
  console.log('key is ' + key + ', value is ' + value);
}	
console.log(Array.from(map.keys()))  //get array of keys
console.log(Array.from(map.values()))
console.log(Array.from(map.entries()))	
		
/* Следующие методы присутствуют в экземпляре Map:

    clear() – Удаляет все элементы с Map
    delete(key) – Удаляет указанный элемент из Map
    forEach – как классический цикл forEach для массива
    get(key) – Получает элемент для указанного ключа
    has(key) – Возвращает true, если коллекция содержит элемент с этим ключом
    keys() – Возвращает все ключи коллекции Map
    set(key, value) – Добавляет новый элемент на карту
    values() – Возвращает все значения коллекции Map
    toString() – Распечатывает “[object Set]”
    
    В Map доступ/изменение значения элемента осуществляется с помощью Map.prototype.get(key) / Map.prototype.set(key, value)
    
    */
////////////////////////////////////////////////////////////////////////////
/*       WeakMap and WeakSet */ // допускают удаление объектов из памяти, которые больше не нужны.
////////////////////////////////////////////////////////////////////////////
	// EXAMPLES:	
    const aboutAuthor = new WeakMap(); // Create New WeakMap
    const currentAge = {}; // key must be an object
    const currentCity = {}; // keys must be an object
    aboutAuthor.set(currentAge, 30); // Set Key Values
    aboutAuthor.set(currentCity, 'Denver'); // Key Values can be of different data types
    console.log(aboutAuthor.has(currentCity)); // Test if WeakMap has a key
    aboutAuthor.delete(currentAge); // Delete a key
/* WeakSets – это наборы коллекций, элементы которых можно собирать, когда объекты, 
на которые они ссылаются, больше не нужны */
		
	let isMarked     = new WeakSet()
	
	
////////////////////////////////////////////////////////////////////////////
/*      Regular Expressions */
////////////////////////////////////////////////////////////////////////////	
	
	  
        // 21-12-1999
        var pattern = /\d{1,2}-\d{1,2}-\d{4}/;
        var text = "31-12-1999";
        document.write(text + " -> " + pattern.test(text) + "<br />");

        // +38 (063) 223-23-23
        pattern = /\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}/;
        text = "+38 (063) 223-23-23";
        document.write(text + " -> " + pattern.test(text) + "<br />");

        // Иванов Иван Иванович
        pattern = /[а-яА-Я]+ [а-яА-Я]+ [а-яА-Я]+/;
        text = "Иванов Иван Иванович";
        document.write(text + " -> " + pattern.test(text) + "<br />");

        // ivanov.ivan@example.com
        pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
        text = "ivanov.ivan@example.com";
        document.write(text + " -> " + pattern.test(text) + "<br />");

        // hello.html
        pattern = /\w+\.html/;
        text = "hello.html";
        document.write(text + " -> " + pattern.test(text) + "<br />");

        // http://www.cbsarea.com или https://www.cbsarea.com
        pattern = /https?:\/\/[\w\d:\.:\?\&]+/g;
        text = "http://www.cbsarea.com или https://www.cbsarea.com blah-blah-blah http://www.google.com:80";
        var res;
        while ((res = pattern.exec(text)) != null) {
            document.write("Найдено " + res + " по индексу " + res.index + "<br />");
        }
		
		
		
			
////////////////////////////////////////////////////////////////////////////
/*      Function Closure/ Замыкание */
////////////////////////////////////////////////////////////////////////////	
		
//Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ. 
		
function makeCounter() {
  let count = 0;

  return function() {
    return count++; // есть доступ к внешней переменной "count"
  };
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
		
//Other Example
	
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1	
		
////////////////////////////////////////////////////////////////////////////
/*      IIFE*/
////////////////////////////////////////////////////////////////////////////	

 //«immediately-invoked function expressions» 
 
 // Пути создания IIFE

(function() {
  alert("Скобки вокруг функции");
})();

(function() {
  alert("Скобки вокруг всего");
}());

!function() {
  alert("Выражение начинается с побитового оператора NOT");
}();

+function() {
  alert("Выражение начинается с унарного плюса");
}();
		
////////////////////////////////////////////////////////////////////////////
/*    Функции Конструкторы NEW и This*/
////////////////////////////////////////////////////////////////////////////	
	
// External Function and object
var dog = {
  breed: 'Beagles',
  lovesToChase: 'rabbits'
};

function chase() {
  console.log(this.breed + ' loves chasing ' + this.lovesToChase + '.'); 
}

dog.foo = chase;
dog.foo(); // в консоль попадёт Beagles loves chasing rabbits.

chase(); //так эту функцию лучше не вызывать		
		
// This and Default + New		
		
let City = function(city, state) {
  this.city = city || "Phoenix";
  this.state = state || "AZ";
  this.sentence = function() {
    console.log(`I live in ${this.city}, ${this.state}.`);
  };
};

let phoenix = new City(); // используем параметры по умолчанию
console.log(phoenix); // выводит в консоль строковое представление объекта
phoenix.sentence(); // выводит I live in Phoenix, AZ.

let spokane = new City('Spokane', 'WA');
console.log(spokane); // выводит сам объект
spokane.sentence(); // выводит I live in Spokane, WA		
		
		
////////////////////////////////////////////////////////////////////////////
/*       CALL  apply */
//Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. 
//Основная работа по-прежнему выполняется функцией.

    func.call(context, arg1, arg2…)// вызывает func с данным контекстом и аргументами. func.apply(this, 1,2,3)
    func.apply(context, args)// вызывает func, передавая context как this и массив args как список аргументов. func.apply(this, [1,2,3])
		
		//arguments -это псевдомасив 
////////////////////////////////////////////////////////////////////////////
func.call(context, arg1, arg2, ...)
func.call(obj, 1, 2, 3)  // obj - к которому привязываем контекст this, 1,2,3 аргументы
		
// пример:
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// используем 'call' для передачи различных объектов в качестве 'this'
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
		
// Other example:
		
function say(phrase) {
  alert(this.name + ': ' + phrase);
}
let user = { name: "John" };
// 'user' становится 'this', и "Hello" становится первым аргументом
say.call( user, "Hello" ); // John: Hello		

// func.apply(context, args) принимает только Псевдомасив
		
//Единственная разница в синтаксисе между call и apply состоит в том, что call ожидает список аргументов,
//в то время как apply принимает псевдомассив		
				
func.call(context, ...args); // передаёт массив как список с оператором расширения
func.apply(context, args);   // тот же эффект
// ex
let wrapper = function() {
  return func.apply(this, arguments);
};	
// заимствование метода		
function hash() {
  alert( [].join.call(arguments) ); // 1,2
}

hash(1, 2);	
////////////////////////////////////////////////////////////////////////////
/*      this */	
// чтобы не потерять  this способы  - не вызывает функцию а возвращает новую
// 1 способ: Функция обертка
		
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};
setTimeout(function() {
  user.sayHi(); // Привет, Вася!
}, 1000);
		
		
// 2 способ: привязать контекст с помощью bind
let bound = func.bind(context, [arg1], [arg2], ...);		
//=>
let user = {
  firstName: "Вася"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // Вася		

