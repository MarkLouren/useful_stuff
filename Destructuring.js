functiom get Sizes({width=50, height=60}){
console.log(width,height);
}
getSuzes({});

// Option 2
let [first, , , , fifth] = ['red','yellow','green,'blue','orange']
console.log(first);
console.log(fifth)

// Option 3
let obj = {
id:'123',
attributes: {width,
height
}
}
let {id, attributes: {width, height}} = obj;
console.log(width);
console.log(height);

// Option 4 
let {width,height} = {
width:100,
height:200
}
Console.log(width);
console.log (height);

 //Option 5
let a = 2;
let b = 3;
// перестановка деструктуризацией массива
[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 2

// Function
function topThree ([first, second, third]) {
  return {
    first: first,
    second: second,
    third: third
  }
}

function sayMyName ({
  firstName = 'Zell',
  lastName = 'Liew'
} = {}) {
 console.log(firstName + ' ' + lastName);
}


// Reduction:

const anObject = {
  // ES6
  aShorthandMethod (arg1, arg2) {},
  // ES5
  aLonghandMethod: function (arg1, arg2) {},
}

// Динамические свойства обьектов

const newPropertyName = 'smile';
// ES6
const anObject = {
  aProperty: 'a value',
  // Динамические названия свойств
  [newPropertyName]: ':D',
  ['bigger ' + newPropertyName]: 'XD',
}
// Результат
// {
//   aProperty: 'a value',
//   'bigger smile': 'XD'
//   smile: ':D',
// }


