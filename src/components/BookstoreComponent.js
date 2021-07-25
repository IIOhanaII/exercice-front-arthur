import React, { Component } from "react";
import {
  CardGroup,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";

class Bookstore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      areBooksLoaded: false,
      books: [],
    };

    this.loadBooks = this.loadBooks.bind(this);
  }

  loadBooks() {
    fetch("https://henri-potier.techx.fr/books")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            areBooksLoaded: true,
            books: result,
          });
        },
        (error) => {
          this.setState({
            areBooksLoaded: true,
            error: true,
          });
        }
      );
  }

  componentDidMount() {
    // Get the books data as soon as everything else have been loaded
    this.loadBooks();
  }

  render() {
    const { error, areBooksLoaded, books } = this.state;
    if (error) {
      return (
        <div>
          Un problème est survenu et nous en sommes désolés, veuillez bien s'il
          vous plaît rafraîchir la page ou revenir plus tard
        </div>
      );
    } else if (!areBooksLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="container">
          <CardGroup className="mt-4">
            {books.map((book) => (
              <Card
                key={book.isbn}
                style={{ width: "17rem" }}
                className="border-0 me-sm-4"
              >
                <CardImg
                  src={book.cover}
                  alt={book.title}
                  style={{ height: "25rem" }}
                />
                <CardBody className="ps-0 pb-4">
                  <CardTitle tag="h5">{book.title} </CardTitle>
                  <CardSubtitle tag="h6">{book.price}€</CardSubtitle>
                </CardBody>
              </Card>
            ))}
          </CardGroup>
        </div>
      );
    }
  }
}

export default Bookstore;
