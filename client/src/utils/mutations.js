import { gql, useMutation } from '@apollo/client';

export const LOGIN_USER= gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
        bookCount
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`

export const ADD_USER= gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        username
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`

export const SAVE_BOOK= gql`
mutation Mutation($input: booksInput) {
    saveBook(input: $input) {
      _id
      bookCount
      email
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`

