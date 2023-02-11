import { gql, useQuery } from '@apollo/client';


const GET_ME = gql`
query Query {
    me {
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

module.exports = GET_ME;