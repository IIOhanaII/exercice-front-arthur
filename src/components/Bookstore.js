import React, { useState, useEffect } from "react";
import "./Bookstore.css";
import { CardGroup, Container, Spinner } from "reactstrap";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { BookCard } from "./BookCard";
import { Fade } from "react-animation-components";
import { v4 as uuidv4 } from "uuid";

export const Bookstore = () => {
  const [error, setError] = useState(false);
  const [areBooksLoaded, setAreBooksLoaded] = useState(false);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalBook, setModalBook] = useState({});

  const loadBooks = () => {
    fetch("https://henri-potier.techx.fr/books")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
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
    if (results.length === 0 || string.length <= 1) {
      setFilteredBooks(books);
    } else {
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

  // Makes sure to display all the books when the user clears the input box by erasing fast the search string and clicking outside the input box
  const handleOnBlur = (event) => {
    let input = document.getElementsByTagName("input")[0];
    if (
      !event.currentTarget.contains(event.relatedTarget) &&
      input.value === ""
    )
      setFilteredBooks(books);
  };

  const toggleModal = (book) => {
    setModal(!modal);
    setModalBook(book);
  };

  useEffect(() => {
    // Get the books data as soon as everything else have been loaded
    loadBooks();
  }, []);

  if (error) {
    return (
      <div className="mt-5 text-center">
        Un problème est survenu et nous en sommes désolés, veuillez bien s'il
        vous plaît rafraîchir la page ou revenir plus tard
      </div>
    );
  } else if (!areBooksLoaded) {
    return (
      <div className="mt-5 text-center">
        <Spinner
          style={{ animationDuration: "1.25s" }}
          type="grow"
          color="primary"
          children=""
        />
      </div>
    );
  } else {
    return (
      <Container>
        {/* The searchbox */}
        <div
          className="mt-4 mx-auto searchbox"
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
              minMatchCharLength: 2,
            }}
            resultStringKeyName="title"
            placeholder="Titre, isbn"
            styling={{ zIndex: "1000" }}
          />
        </div>
        {/* Display all the books */}
        <CardGroup className="mt-4">
          {filteredBooks.map((book) => (
            <Fade in duration={500} timingFn="ease-in-out" key={uuidv4()}>
              <BookCard
                book={book}
                modal={modal}
                toggleModal={toggleModal}
                modalBook={modalBook}
              />
            </Fade>
          ))}
        </CardGroup>
      </Container>
    );
  }
};
