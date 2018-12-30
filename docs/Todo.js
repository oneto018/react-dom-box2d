import React,{Component} from 'react';
import {World,Item} from '../src/index';

const worldStyle = {
		position:'absolute',
		boxSizing: 'border-box',
		border:'1px solid #ccc'
	};

const containerStyle = {
	position:'relative',
	overflow:'auto',
	height:420,
};

const selectStyle = {
    height: 40,
    marginLeft: 30,
    verticalAlign: 'middle',
    display: 'inline-block',
    marginTop: -58,
};	

const textareaStyle={
	width:180,
	height:65,
}

const todoStyle = {	
	lineHeight:'18px',
	fontSize:16,
	fontWeight:'normal',
	whitespace:'pre',
	display:'inline'
};

class TodoApp extends Component{
	constructor(props){
		super(props);
		this.state = {todos:[{task:`some thing... \n I don't remember`,id:-1}],mounted:false,todo:"",filter:'all',bounciness:0.6};
		this.counter = 0;
	}

	componentDidMount() {
		this.setState({mounted:true})
	}

	addToDo = () => {
		let id = this.counter++;
		let {todo,bounciness,todos} = this.state;
		todos.push({id,task:todo,restitution:parseFloat(bounciness)});
		this.setState({todos});
		console.log('added todo');
	};

	toggleTodo = (id) => {
		let {todos} = this.state;

		const index = todos.findIndex(x => (x.id === id));
		todos[index].done = !todos[index].done;
		this.setState({todos});
	};

	render() {
		let {mounted,todos,todo,filter,bounciness} = this.state;
		if(!mounted){
			return null;
		}
		let tryitWidth = document.getElementById('try-it').offsetWidth;
		if(!(tryitWidth>320)){
			tryitWidth = 320;
		}

		let filteredTodos = [];
		if(filter==='all'){
			filteredTodos = todos;
		} else if(filter==='done') {
			filteredTodos = todos.filter(x => x.done);
		} else if(filter === 'notDone'){
			filteredTodos = todos.filter(x => !x.done);
		}

		return(<div style={containerStyle}>
				<div>
					<textarea style={textareaStyle} value={todo} onChange={(e)=>this.setState({todo:e.target.value})} rows="4" placeholder="Enter your todo here..."></textarea>
				 <select style={selectStyle} value={filter} onChange={(e)=> this.setState({filter:e.target.value})}>
				 	<option value="all">show all</option>
					<option value="done">show only done</option>
					<option value="notDone">show only not done</option>
				</select>
				<input type="range" value={bounciness} onChange={(e)=> this.setState({bounciness:e.target.value})} step="0.01" max="0.7" min="0"/>
				</div>
				<button onClick={()=> this.addToDo()}>submit</button>
				<World width={tryitWidth} height={300} style={worldStyle}>
					{filteredTodos.map(x => 
							(<Item key={x.id} restitution={x.restitution}>
								<span onClick={()=>{this.toggleTodo(x.id)}} style={{...todoStyle,textDecoration:(x.done)?'line-through':null}}>{x.task}</span>
							</Item>))
					}
		  		</World>
		  	</div>);

	}
}

export default TodoApp;