import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem ,  Modal, ModalHeader, Label, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';
import ModalBody from 'reactstrap/lib/ModalBody';
import { Control, LocalForm, Errors  } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

//this is presentational component which receive props passes by conatiner component

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            </div>
        );
    }

    function RenderComments({comments, postComment, dishId}){
        if (comments != null){
            let comms = comments.map((comm,i) => {
               // console.log("***** "+i+"  *  "+comm.id); 
                let date = new Intl.DateTimeFormat('en-US', {
                    year:'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comm.date)))
                
                return (
                    
                        
                        <React.Fragment >
                             <ul key={i} className="list-unstyled">
                             <Stagger in>
                             <Fade in>
                            <li className="comment">{comm.comment}</li>
                            <li className="author">-- {comm.author}, {date}</li>
                            </Fade>
                            </Stagger>
                        </ul>
                        
                        
                        </React.Fragment>
                       
                        
                        
                        
                        
                       
                        
                        
                    );
                })
            
            
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>
                    {comms}
                    <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
                    
                </div>
                
            );
        }
        else {
            return(
                <div></div>
            )
        }
    }

   
      class CommentForm extends Component {
          constructor(props){
              super(props);
              this.toggleButton = this.toggleButton.bind(this);
           //   this.handleLogin = this.handleLogin.bind(this);
              this.handleSubmit = this.handleSubmit.bind(this);
              this.state = {
                 isOpen : false
              };
             
          }
          toggleButton() {
            this.setState({
              isOpen: !this.state.isOpen
            });
          
        }
    

        handleSubmit(values) {
           // console.log('Current State is: ' + JSON.stringify(values));

           // alert('Current State is: ' + JSON.stringify(values));
           this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
           // this.toggleButton();
           // event.preventDefault();
        }

    


              render () {

              


                  return (
                      <React.Fragment>
                      <Button outline onClick={this.toggleButton} ><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                      <Modal isOpen={this.state.isOpen} toggle={this.toggleButton}>
                        <ModalHeader toggle={this.toggleButton}>Submit Content</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Col className="form-group">
                                    <Label htmlFor="rating">Ratings</Label>
                                    
                                     <Control.select model=".ratings" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        
                                    </Control.select>
                                    </Col>
                        <Col className="form-group">
                        <Label htmlFor="YourName">Your Name</Label>
                        
                        <Control.text model=".author" id="YourName" name="YourName"
                                placeholder="YourName"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                 className="text-danger"
                                 model=".author"
                                 show="touched"
                                 messages={{
                                     required: 'Required ! ',
                                     minLength: 'Must be greater than 2 characters',
                                     maxLength: 'Must be 15 characters or less'
                                 }}
                              />
                        
                        </Col>
                                <Col className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                               
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                        className="form-control" />
                                
                                </Col>
                        <Col >
                            <Button type="submit" color="primary" onClick={this.toggleButton}>
                             Submit
                            </Button>
                        </Col>
                        
                         </LocalForm>
                        </ModalBody>
                        
                        </Modal>
                      </React.Fragment>
                      
                      
                  );
              }
          }

    const DishDetail = (props) => {

        console.log('Dishdetail Component render invoked');
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if (props.dish != null) {
            return (
                <div className="container">
                <div className="row">
                <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id}/>
                    </div>
                </div>
                
            );
        } else {
            return (
                <div></div>
            );
        }

        
    }

export default DishDetail;