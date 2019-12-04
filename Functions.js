// Function Declaration
function sum(a, b) {
  return a + b;
}

// Function Expression
let sum = function(a, b) {
  return a + b;
};

// functions callbacks

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

//option 2
function showOk() {
  alert( "Вы согласны." );
}

function showCancel() {
  alert( "Вы отменили выполнение." );
}

// использование: функции showOk, showCancel передаются в качестве аргументов ask
ask("Вы согласны?", showOk, showCancel);

//option 3
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Вы согласны?",
  function() { alert("Вы согласились."); },
  function() { alert("Вы отменили выполнение."); }
);

//Named Function Expression

let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // использует func, чтобы снова вызвать себя же
  }
};

sayHi(); // Hello, Guest

// А вот так - не cработает:
func(); // Ошибка, func не определена (недоступна вне функции)

//IIFE

(function () {
    // Code goes here
})();
//OR
(function () {
    // ...
}());

 (function sum(a, b) {
    console.log(a + b); // 5
})(2, 3);
