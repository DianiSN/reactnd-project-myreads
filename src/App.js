import React, {useState, useEffect} from 'react'
import { Route, Link } from 'react-router-dom'
import Shelfs from './Shelfs.js'
import Search from './Search'
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
      <Route exact path="/" render={() => (
        <div className="list-books">
          <Shelfs currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} moveBook={moveBook} />
          <div className="open-search">
            <Link
            to="/search">
            <button>Add a book</button>
            </Link>
          </div>
        </div>
      )}/>
    <Route exact path="/search" render={({ history }) => (<Search booksOnShelf={[...currentlyReading, ...wantToRead, ...read]} moveBook={(event, book) => {
      moveBook(event, book)
      history.push('/')
    }}/>)}/>
    </div>
  )
}

export default BooksApp
