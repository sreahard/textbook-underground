import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    	books : [],
    	text : ''

    };
  }

  componentDidMount(){
	var self = this
	fetch('/api/v1/books')
	.then(function(response) {
		return response.json()
	}).then(function(json) {
		self.setState({books: json})
		console.log(self.state.books)
	}).catch(function(ex) {
		console.log('parsing failed', ex)
	})
  }

  compare(){
	var self = this
	if(this.state.text===""){
		return ""
	}
	//console.log(this.state.text,this.state.books)
	return this.state.books
	.filter((value) => value.title && value.title.toLowerCase().startsWith(self.state.text.toLowerCase())
		|| value.author && value.author.toLowerCase().startsWith(self.state.text.toLowerCase()) 
		|| value.ISBN && value.ISBN.toLowerCase().startsWith(self.state.text.toLowerCase()))
	.map((value) => 
	 	(<li key= {value._id}>
		 	<div>{value.title}</div>
		 	<div>{value.author}</div> 
		 	<div>{value.ISBN}</div> 
		 	<div>{value.price}</div> 
		 	<div>{value.condition}</div>
		 	<div>{value.description}</div>
	    </li>))
  }

  textChange(event){
    this.setState({text: event.target.value})
  }
  
  render() {
    return (
      <div>
        <h1>Stick it to the Universe(ity)!</h1>
        <input 
	   		type="text"
	   		name="search" 
	   		value={this.state.text} 
	   		onChange={(event) => {this.textChange(event)}} 
	   		placeholder="Title, Author, ISBN" />
	   		<br/>
	   		<ul>{this.compare()}</ul>
      </div>
    );
  }
};
