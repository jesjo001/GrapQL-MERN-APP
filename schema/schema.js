const {
  graphqlHTTP,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

//dummy data
var books = [
  {name: 'Name of the People', genre: 'Fantasy', id: '1', authorId: "1"},
  {name: 'Final Revolution', genre: 'History', id: '2', authorId: "2"},
  {name: 'Epicalyps of the People', genre: 'Drama', id: '3', authorId: "3"},
  {name: 'Heros of old', genre: 'History', id: '3', authorId: "3"},
  {name: 'The third empire', genre: 'fantasy', id: '3', authorId: "2"},
  {name: 'The third empire', genre: 'fantasy', id: '3', authorId: "1"},
]

var authors = [
  {name: 'James Block', age: 40, id: '1'},
  {name: 'Adams', age: 5, id: '2'},
  {name: 'pETER', age: 44, id: '3'},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: { 
      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        // return _.find(authors, { id: parent.authorId})
        return Author.findById(parent.authorId)
      }
     }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return _.filter(books, { authorId: parent.id})
        return Book.find({authorId: parent.id})
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book:{
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        //code to get dat from db
        // return _.find(books, { id: args.id})
        return Book.findById(args.id)
      }
    },

    author:{
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        // return _.find(authors, {id: args.id})
        return Author.findById(args.id)
      }
    },

    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return books
        return Book.find({})
      }
    }, 

    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        // return authors
        return Author.find({})
      }
    }, 
  }
})

const Mutation =new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        genre: { type: new GraphQLNonNull(GraphQLString)},
        authorId: { type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
