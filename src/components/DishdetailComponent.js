import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg,
  CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form'

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class Comment extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    this.toggleModal();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return(
        <React.Fragment>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={2}>Rating</Label>
                  <Col md={10}>
                    <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={2}>Your Name</Label>
                  <Col md={10}>
                    <Control.text model=".author" id="author" name="author"
                                  placeholder="Your Name"
                                  className="form-control"
                                  validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                  }}
                    />
                    <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less',
                        }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={2}>Comment</Label>
                  <Col md={10}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                                      rows="6"
                                      className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{size:10, offset:2}}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
        </React.Fragment>
    );
  }
}

function Dishdetail(props) {

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
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <h3>Comments</h3>
            <RenderComments comments={props.comments} />
            <Comment />
          </div>
        </div >
      </div>
  );
}


const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>

    )
  }
  else {
    return (<div></div>)
  }
}

const RenderComments = ({ comments }) => {

  if (comments != null) {
    const com = comments.map(co => {

          return (
              <React.Fragment>
                <li>{co.comment}</li><br />
                <li>-- {co.author}, <FormatDate date = {co.date}/> </li><br />
              </React.Fragment>
          );
        }
    );
    return (
        <ul className="list-unstyled">
          {com}
        </ul>
    )
  }
  else {
    return (<div></div>)
  }
}

function FormatDate({ date }) {
  const option = { year: 'numeric', month: 'short', day: 'numeric' };
  const date1 = new Date(date)
  const newdate = date1.toLocaleDateString("en-US", option)
  return newdate;
}

export default Dishdetail; 