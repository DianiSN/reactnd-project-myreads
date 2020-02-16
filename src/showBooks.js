import React from 'react'

const ShowBooks = (props) => {

  const {books, moveBook} = props

  return (
      <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book, index) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${'imageLinks' in book ? book.imageLinks.thumbnail : 'nopreview.png'}")`}}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue={'shelf' in book ? book.shelf : 'none'} onChange={(event) => moveBook(event, book)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{'authors' in book && book.authors.join(', ')}</div>
                  </div>
                </li>
              ))
            }
          </ol>
      </div>
  )

}

export default ShowBooks
