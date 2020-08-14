import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    
    constructor(props){
        super(props)
        this.state = {
        };
    };

    renderDish(dish){
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt="dish.name" />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    };

    renderComments(comments){
        var options = {  year: 'numeric', month: 'short', day: 'numeric' };
        const commentList = comments.map((comment) =>
            <div key={comment.id}>
                <li>
                    <p>{comment.comment}</p>
                    <p> --{comment.author}, {new Date(comment.date).toLocaleDateString("en-US",options)}</p>
                </li>
            </div>
        );

        if(comments!=null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                       {commentList}
                    </ul>
                </div>
            )
        }
        else{
            return (
            <div></div>
            );
        }
    };

    render(){
        if(this.props.dish!=null){
            return (
                <div className="container">
                    <div className="row">
                        <div className=" col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className=" col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    };
};

export default DishDetail;