import React, { useState, useEffect } from 'react'
import ShowBooks from './showBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

const BooksApp = () => {
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [wantToRead, setWantToRead] = useState([])
  const [read, setRead] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    BooksAPI.getAll().then((books) => {
      setCurrentlyReading(
        filterToShelf(books, 'currentlyReading')
      )
      setWantToRead(
        filterToShelf(books, 'wantToRead')
      )
      setRead(
        filterToShelf(books, 'read')
      )
    })
  }, [])

  const filterToShelf = (books, shelf) => books.filter((book) => book.shelf.includes(shelf))

  const addToShelf = (shelf, book) => {
    switch(shelf){
      case 'currentlyReading':
        setCurrentlyReading([...currentlyReading, book])
      break;
      case 'wantToRead':
        setWantToRead([...wantToRead, book])
      break;
      case 'read':
        setRead([...read, book])
      break;
      default:
      break;
    }
  }

  const tidyShelf = (shelf, ids) => {
    switch(shelf){
      case 'currentlyReading':
        setCurrentlyReading(currentlyReading.filter((book) => ids.includes(book.id)))
      break;
      case 'wantToRead':
        setWantToRead(wantToRead.filter((book) => ids.includes(book.id)))
      break;
      case 'read':
        setRead(read.filter((book) => ids.includes(book.id)))
      break;
      default:
      break;
    }
  }

  const moveBook = (event, book) => {
    const oldShelf = book.shelf
    const newShelf = event.target.value
    book.shelf = newShelf
    BooksAPI.update(book, newShelf).then((shelfs) => {
       //add to new shelf
       addToShelf(newShelf, book)
       //remove from old shelf
       tidyShelf(oldShelf, shelfs[oldShelf])
    })

  }


  return (
    <div className="app">
      <ShowBooks books={currentlyReading} shelfTitle="Currently Reading" moveBook={moveBook}/>
      <ShowBooks books={wantToRead} shelfTitle="Want to Read" moveBook={moveBook}/>
      <ShowBooks books={read} shelfTitle="Read" moveBook={moveBook}/>
    </div>

  )
}

export default BooksApp
