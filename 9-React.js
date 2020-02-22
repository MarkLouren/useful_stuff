/* CheetSheets
- https://devhints.io/react
- https://reactcheatsheet.com/
- http://www.developer-cheatsheets.com/react 
- https://ru.reactjs.org/docs/hooks-reference.html 
*/

// new date
   <h3>creation date: { (new Date()).toDateString()}</h3>

// 3-method pass a state to component
openModal = (boolean) => {
        this.setState({showModal:boolean});
        return this.state;
    };
