import { gql, useQuery } from '@apollo/client';


const GET_ME= gql`
query Me {
    me {
      username
      email
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
`

module.exports= GET_ME;