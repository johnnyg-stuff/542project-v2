import React, { Component } from 'react';
import {Form, Button, Col, Alert} from 'react-bootstrap';
import Moment from 'moment';

class ProblemFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.data._id ? this.props.data._id.$oid : this.props.data.id,
            questionNo: this.props.data.questionNo,
            question: this.props.data.question,
            description: this.props.data.description,
            answer: this.props.data.answer,
            hint: this.props.data.hint,
            note: this.props.data.note,
            importance: this.props.data.importance,
            category: this.props.data.category,
            sub_category: this.props.data.sub_category,
            review_date: this.props.data.review_date,
            mode: '',
            showAnswer: false,
            showHint: false
         }
        this.toggleContent = this.toggleContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //console.log(this.props);
      }

      toggleContent(ctrl){
        if(ctrl == 'a'){
            this.setState({ showAnswer: !this.state.showAnswer });
        }
        if(ctrl == 'n'){
            this.setState({ showHint: !this.state.showHint });
        }
      }


     componentDidMount(){
        let pageMode = 'unknown';
        if (window.location.pathname.includes('/problem/add')){
            pageMode = 'add'
        }
        if (window.location.pathname.includes('/problem/view')){
            pageMode = 'view'
        }
        if (window.location.pathname.includes('/problem/edit')){
            pageMode = 'edit'
        }
        if (window.location.pathname.includes('/problem/review')){
            pageMode = 'review'
        }
        this.setState({
            mode: pageMode
        });
     }

     
    answerFormControl(answer){
        let a = '';
        const show = (this.state.showAnswer) ? true : false ;
        if(show===true){
            a = answer;
        }
        return <Form.Control as="textarea" rows={3} placeholder="Answer" name="answer" defaultValue={a} onChange={this.handleChange}/>;
    }

    noteFormControl(hint){
        let h = '';
        const show = (this.state.showHint) ? true : false ;
        if(show==true){
            h = hint;
        }
        return <Form.Control as="textarea" rows={3} placeholder="Note" name="note" defaultValue={h} onChange={this.handleChange}/>
    }
    

    onSave = async() =>{
        const p = this.state;
        const url = '/problem/edit/' + this.state.id;
        const response = fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        }).then(
            response => {
                if(response.ok){
                    this.props.onSave(p);
                }
                else{
                    alert("Error " + response.status + " " + response.statusText);
                }
        });
    }

    handleChange(event) {    
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value    
        });
    }

    // onSaveTest = async() =>{
    //     const p = this.state;
    //     console.log(p);
    // };

    onSaveTest = () => {
        this.props.onSave();            
    }

    renderForm(){
        if (this.props.data){
            var newDate = Moment(new Date(this.props.data.last_review_date * 1000)).format('MM/DD/YYYY hh:MM');
            return (                
                <Form>
                    <Form.Group controlId="question">
                        <Form.Label>Question</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={1} 
                            placeholder="Question" 
                            name="question" 
                            defaultValue={this.props.data.question}
                            onChange = {(event) => this.setState({question: event.target.value })}
                            type="text"
                            />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" rows={3} 
                            placeholder="Description" 
                            name="description" 
                            defaultValue={this.props.data.description}
                            onChange={this.handleChange}
                            />
                    </Form.Group>
                    
                    <Form.Group controlId="note">
                        <Form.Label><Button id="note" variant="outline-info" onClick={e => this.toggleContent('n')}>Note</Button></Form.Label>
                        {this.noteFormControl(this.props.data.note)}
                    </Form.Group>
        
                    <Form.Group controlId="answer">
                        <Form.Label> <Button id="answer" variant="outline-info" onClick={e => this.toggleContent('a')}>Answer</Button> </Form.Label>
                        {this.answerFormControl(this.props.data.answer)}
                    </Form.Group>
        
                    <Form.Row>
                        <Form.Group as={Col} controlId="importance">
                            <Form.Label>Importance</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Importance (1-10)" 
                                name="importance"  
                                defaultValue={this.props.data.importance}
                                onChange={this.handleChange}
                                />
                        </Form.Group>
        
                        <Form.Group as={Col} controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Category" name="category"  defaultValue={this.props.data.category}/>
                        </Form.Group>
        
                        <Form.Group as={Col} controlId="subCategory">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Sub Category" 
                                name="subCategory" 
                                defaultValue={this.props.data.sub_category}
                                onChange={this.handleChange}
                                />
                        </Form.Group>
                        
                        {/* <Form.Group as={Col} controlId="lastReviewDate">
                            <Form.Label>Last Review Date</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Last Review Date" 
                                name="lastReviewDate" 
                                value={newDate}
                                onChange={this.handleChange}
                                />
                        </Form.Group> */}

                    </Form.Row>
        
                    <Button id="save" variant="primary" onClick={this.onSave}>
                        Save
                    </Button>
        
                </Form> );
        }
        else{
            return <p>Loading</p>
        }
    }

    render() { 
        return (                 
            <div>
                {this.renderForm()}
            </div>
        );
    }



}
 
export default ProblemFormComponent;