const {gql}= require('apollo-server-express');

const typeDef= gql`
type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [bookSchema]
}

type Book {
    bookId: String
    authors:[String]
    description: String
    title: String
    image:String
    link:String
}

input booksInput{
    bookId: String
    authors:[String]
    description: String
    title: String
    image:String
    link:String
}
type Auth{
    toke:ID!
    user:User
}

type Query{
    me:User
}

type Mutation{
    addUser(username:String!, email:String!,password:String!):Auth
    
}
`

module.exports = typeDef;