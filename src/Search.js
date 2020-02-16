import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ShowBooks from './ShowBooks'
import * as BooksAPI from './BooksAPI'

const Search = (props) => {

  const {booksOnShelf, moveBook} = props
  const [result, setResult] = useState([])

  const onSearch = (event) => {
      if(event.target.value){
        BooksAPI.search(event.target.value).then((result) => {
          if(Array.isArray(result)){
            setResult(checkShelfs(result))
          }else if('error' in result){
            setResult([])
          }
        })
      }else{
        setResult([])
      }
  }

  const checkShelfs = (searchRes) => {
    const booksIds = booksOnShelf.map((book) => book.id)
    searchRes.forEach((book) => {
      if(booksIds.indexOf(book.id) >= 0){
        book.shelf = booksOnShelf[booksIds.indexOf(book.id)].shelf
      }
    })
    return searchRes
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
        className="close-search"
        to="/">
        Close
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onInput={(event) => onSearch(event)}/>
        </div>
      </div>
      <div className="search-books-results">
        {result.length > 0 && <ShowBooks books={result} moveBook={moveBook}/>}
        {result.length === 0 && <div>Search for a book by title, author or a valid search term</div>}
      </div>
    </div>
  )
}

export default Search
