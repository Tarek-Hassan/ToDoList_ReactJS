import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,InputGroup,Col,ListGroup,Container,Row,Navbar,Nav} from 'react-bootstrap';
import {
BrowserRouter as Router,
Switch,
Route,
Link,

} from "react-router-dom";

// npm install react-router-dom




class App extends React.Component {

		constructor() {
			super();

			this.state = {
				addtask:'',
				tasks: [{
					id:1,
					name:"fristTask",
					is_mark:false},
					],
				users: [{
					name:"tarek",
					email:"admin@admin.com",
					password:"123456789",
					},
					],
				};
			}

		addUser = (user) => {			
			let users=this.state.users;
			users.push(user);
			this.setState({users:users});
			console.log(this.state.users);
		};
		addTask = (e) => {
			e.preventDefault();
			let tasks=this.state.tasks;
			let addtask=this.state.addtask;
			tasks.push(
			{
				id:Math.floor(Math.random()*100),
				name:addtask,
				is_mark:false
			}
			);
			this.setState({tasks:tasks});
		};

		handleChange=(e)=> {
			this.setState({ addtask:e.target.value});
		}

		deleteObj=(e)=> {
		//
			let tasks=this.state.tasks;
			function arrayRemove(arr, value) {
			return arr.filter((ele)=>{
			return ele.id !== value; });
			}
			this.setState({tasks:arrayRemove(tasks,e)});
		}

		markObj=(e)=> {
			let tasks=this.state.tasks;
			function arrayRemove(arr, value) {
			return arr.filter((ele)=>{
				if( ele.id === value){
					ele.is_mark= !ele.is_mark;
				}
					return ele;
				});
			}
			this.setState({tasks:arrayRemove(tasks,e)});
		}

		
		render() {
			return (
				<Router>
					<div>
						<Navbar bg="light" variant="dark">
							<Nav >
								<Nav className="mr-5"><Link to="/home">Home</Link></Nav>
								<Nav className="mr-5"> <Link to="/about">About</Link></Nav>
								<Nav className="mr-5"> <Link to="/list">ToDoList</Link></Nav>

							</Nav>
						</Navbar>
						<Switch>
							<Route path="/home">
								<Home />
							</Route>
							<Route path="/about">
								<About />
							</Route>
							<Route path="/list">
								<Container fluid="md"  >
									<List tasks={this.state.tasks}handleChange={this.handleChange} addTask={this.addTask} deleteObj={this.deleteObj}
										markObj={this.markObj} />
									</Container>
							</Route>
							<Route path="/register">
								<Container fluid="md"  >
									<Register addUser={this.addUser}/>
								</Container>
							</Route>
							<Route path="/">
								<Container fluid="md"  >
									<Login users={this.state.users}/>
								</Container>
							</Route>
						</Switch>
					</div>
				</Router>
			);
		}
	}
	  
	  function Home() {
		return <h2>Home</h2>;
	  }
	  
	  function About() {
		return <h2>About</h2>;
	  }

	  



class Login extends React.Component {
	constructor() {
		super();
	
		this.state = {
			email:'',
			password:''
			};
		}
		handleEmailChange=(e)=> {
			this.setState({ email:e.target.value});
		}
		handlePasswordChange=(e)=> {
			this.setState({ password:e.target.value});
		}

		mySubmitHandler=(e)=>{
					e.preventDefault();
			
				let Users={
						"username":this.state.email,
						"password":this.state.password
					};
					
					checkUser(Users)
				
				// FUNCTION DETAILS
				function checkUser(data) {
					fetch('http://todoapp.ahmedrohym.com/api.php?apicall=login', {
						method: 'POST', // or 'PUT'
						headers: {
							// "content-type": "application/json",
							"content-type": "application/x-www-form-urlencoded",
							"accept": "application/json"
						},
						body: JSON.stringify(data),
					
					  })
					  .then(response => response.json())
					  .then(data => {
						  if(data.user){return window.location.href ='list';}else{return window.location.href ='';}
						
					  })
					  .catch((error) => {
						console.error('Error:', error);
					  });
					}
					
					
				
				
			}
	render() {
		return(
			<React.Fragment>
				<div className="alert alert-success" role="alert">
					<Link to="/register">Register</Link>
				</div>
				<Form onSubmit={this.mySubmitHandler}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>userName</Form.Label>
						<Form.Control onChange={this.handleEmailChange} type="text" placeholder="Enter userName" />
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control onChange={this.handlePasswordChange} type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</React.Fragment>

	);
	}

}

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			name:'',
			email:'',
			password:'',
			errors:[]		
			};
	
	}
		handleNameChange=(e)=> {
			this.setState({ name:e.target.value});
			
		}
		handleEmailChange=(e)=> {
			this.setState({ email:e.target.value});
		}
		handlePasswordChange=(e)=> {
			this.setState({ password:e.target.value});
		}

		mySubmitHandler=(e)=>{
			e.preventDefault();
			let name=this.state.name;
			let email=this.state.email;
			let password=this.state.password;
			this.setState({ errors:[]});
			let errors=this.state.errors;
			const validEmailRegex = RegExp("^[a-zA-Z0-9]+@(?:[a-zA-Z0-9])+[A-Za-z]+$");
			if(name.length < 5){
				errors.push("- UserName should be more than 5 letter");
				this.setState({ errors:errors});
			}
			if(email.length < 4  || validEmailRegex.test(email)){
				errors.push("- Email not Vaild should be more than 5 letter");
				this.setState({ errors:errors});
			}
			if(password.length < 8){
				errors.push("- password should be more than 8");
				this.setState({ errors:errors});
			}else{
				let user={
					"username": name,
					"password": password,
					"email": email,
					"gender": "male"
				}
				checkUser(user)
				// console.log(user);
				
				// return window.location.href ='list';
				
			}
				
				// FUNCTION DETAILS
				function checkUser(data) {
					fetch('http://todoapp.ahmedrohym.com/api.php?apicall=signup', {
						method: 'POST', // or 'PUT'
						headers: {
							// "content-type": "application/json",
							"content-type": "application/x-www-form-urlencoded",
							"accept": "application/json"
						},
						body: JSON.stringify(data),
						// body:data,
					  })
					  .then(response => response.json())
					  .then(data => {
						  console.log(data);
						  
						if(data.user){return window.location.href ='list';}else{return window.location.href ='register';}
					  })
					  .catch((error) => {
						console.error('Error:', error);
					  });
					}
		}
	render() {
		return(
			<React.Fragment>
					<div className="alert alert-success" role="alert">
						<Link to="/">Sign In</Link>
					</div>

					
				{
				(this.state.errors).length > 0 ? 	
								<div className='alert alert-danger' role='alert'>
									{this.state.errors.map((ele,i)=>{return <li key={i}>{ele}</li>})}
								</div> 
								:
								 ''
						}

					<Form onSubmit={this.mySubmitHandler}>
						<Form.Group controlId="formBasicUserName">
							<Form.Label>UserName</Form.Label>
							<Form.Control  onChange={this.handleNameChange} type="text" placeholder="Enter UserName" />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control onChange={this.handleEmailChange} type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control onChange={this.handlePasswordChange} type="password" placeholder="Password" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>

					</Form>
			</React.Fragment>

	);
	}

}

class List extends React.Component {
	render() {
		return (
				<Container fluid="md" >
					<Form.Group>
						<InputGroup>
							<Form.Row>
								<Form.Label column="lg" lg={2}>AddTask:</Form.Label>
								<Form.Control type="text" onChange={this.props.handleChange} placeholder="Enter Task Name" />
								<InputGroup.Append>
									<Button onClick={this.props.addTask} variant="primary" className="my-2">AddTask</Button>
								</InputGroup.Append>
							</Form.Row>
						</InputGroup>
						<ListGroup>
							{this.props.tasks.map((task, i) => (
							<TableRow key={i} data={task} deleteMethod={this.props.deleteObj} markMethod={this.props.markObj} />
							))}
						</ListGroup>
					</Form.Group>
				</Container>
		);
	}

}

class TableRow extends React.Component {
	
	deleteButton=(e)=>{
		this.props.deleteMethod(this.props.data.id);
	}

	markButton=(e)=>{
		this.props.markMethod(this.props.data.id);
	}

	render() {
		return (
				<ListGroup.Item variant={this.props.data.is_mark ? "success" :""}>
					<Row>
						<Col sm={7}>
							{this.props.data.name}
						</Col>
						<Col sm={5}>
							<Button onClick={this.markButton} variant="success" className="ml-5">Mark</Button>
							<Button onClick={this.deleteButton} variant="danger" className="ml-2">Delete</Button>
						</Col>
					</Row>
				</ListGroup.Item>

		);
	}
}
export default App;