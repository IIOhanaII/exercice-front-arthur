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

const Bookstore = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [areBooksLoaded, setAreBooksLoaded] = useState(false);
  const [books, setBooks] = useState([]);

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
        },
        (error) => {
          setAreBooksLoaded(true);
          setError(true);
        }
      );
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setBooks(books.filter((book) => book.isbn === item.isbn));
  };

  const handleOnClear = () => {
    loadBooks();
  };

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
        >
          <ReactSearchAutocomplete
            items={books}
            onSearch={handleOnSearch}
            onClear={handleOnClear}
            onSelect={handleOnSelect}
            autoFocus
            fuseOptions={{
              keys: ["title", "synopsis"],
            }}
            resultStringKeyName="title"
            styling={{ zIndex: "10000" }}
          />
        </div>
        <CardGroup className="mt-4">
          {books.map((book) => (
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
                <div className="d-flex justify-content-evenly mt-2">
                  <Button color="primary" size="sm">
                    En savoir plus
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() => dispatch(addBookToCart(book))}
                  >
                    Ajouter au panier
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
