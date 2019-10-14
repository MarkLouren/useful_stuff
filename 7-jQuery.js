/* BEGINNER:

 https://learn.jquery.com/using-jquery-core/dollar-object-vs-function/
 https://oscarotero.com/jquery/ methods
 https://htmlcheatsheet.com/jquery/  !!! */


 /*
Как получить элемент с помощью jQuery?

Для того чтобы понимать как работает селектор Вам все-же необходимы базовые знания CSS, т.к. именно от принципов CSS отталкивает селектор jQuery:

  -  $("#header") — получение элемента с id=«header»
  -  $(«h3») — получить все <h3> элементы
  -  $(«div#content .photo») — получить все элементы с классом =«photo» которые находятся в элементе div с id=«content»
  -  $(«ul li») — получить все <li> элементы из списка <ul>
  -  $(«ul li:first») — получить только первый элемент <li> из списка <ul>
*/

$(document).ready(function(){
    $(".btn-slide").click(function(){
        $("#panel").slideToggle("slow");
        $(this).toggleClass("active");
    });
});

//Когда мы кликаем по картинке <img class=«delete»>, будет найден родительский элемент <div class=«pane»>, 
//и его прозрачность будет медленно изменяться от opacity= 1.0 до opacity=hide:

$(document).ready(function(){

    $(".pane .delete").click(function(){
        $(this).parents(".pane").animate({ opacity: "hide" }, "slow");
    });

});
// Для изменения нескольких параметров CSS передаём объект в формате ключ-значение (это фактически JSON):

$("#my").css({
    "color": "red",
    "font-size": "18px",
    "background-color": "white"
})

// Работа с классами:

$("#my").addClass("active")  // добавляем класс «active»

$("#my").addClass("active notice") // добавляем несколько классов за раз

$("#my").toggleClass("active") // переключаем класс «active»

$("#my").toggleClass("active notice") // переключаем несколько классов

// атрибуты:

// получение адреса ссылки
$("a").attr("href");

// изменение адреса и заголовка ссылки
$("a").attr({
    "href": "http://anton.shevchuk.name",
    "title": "My Personal Blog"
});

// работа со свойствами

- prop(propName) //получение значения свойства
- prop(propName, propValue) // установка значения свойства (также можно использовать hash либо функцию обратного вызова)
- removeProp(propName)

$("#checkbox-two").removeAttr("checked")  //Удаляем галочку
$("#checkbox-two").attr("checked", "checked")  //Ставим галочку 
$("#radio-two").attr("disabled", false) // Включаем радио-кнопку
$("#radio-two").attr("disabled", true) //Выключаем

/// Работа с событиями
/*
Для работы с событиями существует три основных метода:

- on(event, handler) – добавление обработчика (тут я использую простейшую сигнатуру метода)
- trigger(event) – инициация события из скрипта
-  off(event) – отключение обработчика событий */

// вешаем обработчик
$("p").on("click", function() {
    // что-то делаем
    alert("Click!");

////   
 $("p").trigger("click"); //обработчик запустить программно

//////

 $("p").on("click", function() {
    $(this).css("color", "red");
});
});

/////

$("a").get(0).click()  //event on DOM ELEMENT

 /// CОЗДАНИЕ DOM элементов
 
let $myDiv = $('<div id="my" class="some"></div>');  
let $myDiv = $('<div>', {'id':'my', 'class':'some'}); //better
let $myDiv = $('<div>').attr({'id':'my', 'class':'some'}); //the best

let myDiv = document.createElement('div');
myDiv.id = 'my';
myDiv.className = 'some';

// ВСТАВКА ЭЛЕМЕНТОВ НА СТРАНИЦУ:

$('p').after('<hr/>');   // вставка линии после каждого параграфа

/*
- before(content) — вставляет контент перед каждым выбранным элементом
- insertBefore(element) — вставляет элементы из выборки перед каждым элементом, переданным в качестве аргумента
- append(content) — вставляет контент в конец каждого элемента из выборки, т.е. строку кода $("p").append("<hr/>") 
следует читать как «в конец каждого параграфа будет добавлена линия»
- appendTo(element) — вставляет выбранный контент в конец каждого элемента, 
переданного в качестве аргумента: $("<hr/>").appendTo("p") — «линия будет добавлена в конец каждого параграфа»
- prepend(content) — вставляет контент в начало каждого элемента из выборки
- prependTo(element) — вставляет выбранный контент в начало каждого элемента, переданного в качестве аргумента
- replaceWith(content) – заменяет найденные элементы новым: $("p").replaceWith("<hr/>")
- replaceAll(target) – вставляет контент взамен найденному: $("<hr/>").replaceAll("h3")
- wrap(element) – оборачивает каждый найденный элемент новым элементом; т.е. мы конфеты из коробки заворачиваем в фантики
- wrapAll(element) – оборачивает найденные элементы новым элементом; 
мы берём пучок конфет и заворачиваем в один большой фантик
- wrapInner(element) – оборачивает контент каждого найденного элемента новым элементом; берём конфеты, 
каждую распаковываем, заворачиваем в свой фантик, и сверху заворачиваем в родной фантик
- unwrap() – удаляет родительский элемент у найденных элементов; фантики прочь!
- clone(withDataAndEvents) – клонирует выбранные элементы, для дальнейшей вставки копий назад в DOM, 
позволяет так же копировать и обработчики событий
- detach() – удаляет элемент из DOM, но при этом сохраняет все данные о нём в jQuery; 
следует использовать, если надо лишь временно удалить элемент
- empty() – удаляет текст и дочерние DOM-элементы
- remove() – насовсем удаляет элемент из DOM
- html() – возвращает HTML заданного элемента
- html(newHtml) – заменяет HTML в заданном элементе
- text() – возвращает текст заданного элемента; если внутри элемента будут другие HTML-теги, 
то вернётся сборная солянка из текста всех элементов
- text(newText) – заменяет текст внутри выбранных элементов, при попытке вставить таким образом HTML, 
будет получен текст, где тэги будут приведены к HTML entities
*/


// FILTERING ///////

$('div.foo').has ('p'); // div.foo ele,ents that contain <p> tags
$('h1').not('bar'); // h1 elements that don't have a class of bar
$('ul li').filter('.current'); // unordered list items with class of current
$('ul li').first(); // just the first unordered list item
$('ul li').eq(5); //the sixth list item
