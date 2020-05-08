import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,InputGroup,Col,ListGroup,Container,Row} from 'react-bootstrap';



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
    	};
  	}
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
	<Container fluid="md" bgColor="info" >
		<Form.Group >
        	<InputGroup>
            	<Form.Row>
  					<Form.Label column="lg" lg={2}>AddTask:</Form.Label>
              		<Form.Control type="text"  onChange={this.handleChange} placeholder="Enter Task Name" />
              		<InputGroup.Append>
        				<Button onClick={this.addTask} variant="primary" className="my-2">AddTask</Button>
        			</InputGroup.Append>
  				</Form.Row>
        	</InputGroup>
      		<ListGroup>
        		{this.state.tasks.map((task, i) => (
        			<TableRow data={task} deleteMethod={this.deleteObj} markMethod={this.markObj}/>
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
	<ListGroup.Item  variant={this.props.data.is_mark ? "success":""}>
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