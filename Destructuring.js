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
