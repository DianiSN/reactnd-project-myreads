import React from 'react'
import ShowBooks from './ShowBooks.js'

const Shelfs = (props) => {

  const {currentlyReading, wantToRead, read, moveBook} = props

  return (
    <div>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <ShowBooks books={currentlyReading} moveBook={moveBook}/>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <ShowBooks books={wantToRead} moveBook={moveBook}/>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <ShowBooks books={read} moveBook={moveBook}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shelfs
