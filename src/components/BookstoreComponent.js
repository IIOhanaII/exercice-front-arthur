import React, { useState, useEffect } from "react";
import {
  Button,
  CardGroup,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { addBookToCart } from "../features/cart/cartSlice";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bookstore = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [areBooksLoaded, setAreBooksLoaded] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const loadBooks = () => {
    fetch("https://henri-potier.techx.fr/books")
      .then((res) => res.json())
      .then(
        (result) => {
          setAreBooksLoaded(true);
          // In order to use the search box from react-search-autocomplete package, it is necessary to add an id to each object of the result array
          // Indeed, this package does not offer the possibility to switch its filtering abilities from id to isbn in our case
          const resultWithIds = result.map((book) => ({
            ...book,
            id: book.isbn,
          }));
          setBooks(resultWithIds);
          setFilteredBooks(resultWithIds);
        },
        (error) => {
          setAreBooksLoaded(true);
          setError(true);
        }
      );
  };

  const handleOnSearch = (string, results) => {
    if (results.length === 0) {
      setFilteredBooks(books);
    }
    else {
      setFilteredBooks(results);
    }
  };

  const handleOnHover = (book) => {
    setFilteredBooks([book]);
  };

  const handleOnSelect = (book) => {
    setFilteredBooks([book]);
  };

  // Allows to display all the books when the user clears the input box by clicking on the clear icon
  const handleOnClear = () => {
    setFilteredBooks(books);
  };

  // Allows to display all the books when the user clears the input box by erasing the search string and clicking outside the input box
  const handleOnBlur = (event) => {          
    let input = document.getElementsByTagName('input')[0];
    if (!event.currentTarget.contains(event.relatedTarget) && input.value === '') setFilteredBooks(books);
  }

  useEffect(() => {
    // Get the books data as soon as everything else have been loaded
    loadBooks();
  }, []);

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
        <div
          style={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
          className="mt-4"
          onBlur={(event) => handleOnBlur(event)}
        >
          <ReactSearchAutocomplete
            items={books}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onClear={handleOnClear}
            autoFocus
            fuseOptions={{
              keys: ["title", "isbn"],
            }}
            resultStringKeyName="title"
            placeholder="Titre, isbn"
            styling={{ zIndex: "10000" }}
          />
        </div>
        <CardGroup className="mt-4">
          {filteredBooks.map((book) => (
            <Card
              key={book.isbn}
              style={{ width: "17rem" }}
              className="border-0 me-sm-4"
            >
              <CardImg
                src={book.cover}
                alt={`Couverture du livre intitulé ${book.title}`}
                style={{ height: "25rem" }}
              />
              <CardBody className="px-0 pb-4">
                <CardTitle tag="h5">{book.title} </CardTitle>
                <CardSubtitle tag="h6">{book.price}€</CardSubtitle>
                <div className="d-flex justify-content-start mt-2">
                  <Button color="primary" size="sm" className="me-2">
                    <FontAwesomeIcon icon={["fas", "info"]} size="lg" />
                  </Button>
                  <Button
                    color="success"
                    size="sm"
                    onClick={() => dispatch(addBookToCart(book))}
                  >
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} size="lg" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </CardGroup>
      </div>
    );
  }
};

export default Bookstore;
