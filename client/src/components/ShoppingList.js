import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem, addImage } from "../actions/itemActions";
import PropTypes from "prop-types";
import "../App.css";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  onAddClick = (id) => {
    this.props.addImage(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, picture }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Fragment>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                      <Button
                        className="remove-btn"
                        color="blue"
                        size="sm"
                        onClick={this.onAddClick.bind(this, _id)}
                      >
                        Add
                      </Button>
                    </Fragment>
                  ) : null}

                  {name}
                  {/* <img src={ require('./images/image1.jpg') } /> */}
                  <img
                    alt="itemImage"
                    className="item-photo"
                    src={require(`../../../images/${picture}`)}
                  />
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
