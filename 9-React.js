```
npm install --save react-router-dom
npm install --save react-transition-group //animation

```


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

// Axios//
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
   state = {
      posts:[]
   }
componentDidMount(){
   axios.get ('http://wwww.reddit.com/r/${this.props.subreddit}.json')
      .then(res=>{ 
      const posts =res.data.data.children.map(obj=>obj.data);
      this.setState({posts});
   });
}

render(){
   return (
      <div>
      {'/r/${this.props.subreddit}'}
      </div>
      )}
