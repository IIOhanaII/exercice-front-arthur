import React, { Component } from "react";

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
            books: result
          });
        },
        (error) => {
          this.setState({
            areBooksLoaded: true,
            error: true
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
      return <div>Un problème est survenu et nous en sommes désolés, veuillez bien s'il vous plaît rafraîchir la page ou revenir plus tard</div>;
    } else if (!areBooksLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <ul>
          {books.map((book) => (
            <li key={book.title}>
              {book.title} {book.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Bookstore;
