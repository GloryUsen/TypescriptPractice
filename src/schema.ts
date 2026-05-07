import { createSchema } from 'graphql-yoga';
import axios from "axios";
import { Post, User } from './type.ts';

let counter = 0

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
  
  type Post{
  userId: Int
  id: Int
  title: String 
  body: String
  user: User
  }

  type Geo{
      lat: String
      lng: String
  }

  type Company{
      name: String
      catchPhrase: String
      bs: String

      }
  type Address{
      street: String
      suite: String 
      city: String
      zipcode: String
      geo: Geo
  }
  type User{
  id: Int!
  name: String!
  username: String
  email: String
  address: Address
  phone: String
  website: String
  company: Company
  nextUser: User
  posts: [Post]             #This is an array of Post
  }
    type Query { 
      hello: String
      number: Int
      user(id: Int!): User            #(So this field can only be query it if you pass an ID)
    }
  `,
  resolvers: {
    Post: {
      user: async ({ userId }: Post): Promise<User> => {
        const { data: user } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )
         counter++
        console.log({ counter })
       
        return user
      },

    },

    User: {
      posts: async ({ id }: User) => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`

        );
         counter++
        console.log({ counter })
       
        return data;

      },
      name: (parent) => parent.name + '🕯',
      nextUser: async ({ id }: User) => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id + 1}`
        );
         counter++
        console.log({ counter })
       
        return data

      }

    },

    Query: {
      hello: () => 'world',
      number: () => 1,
      //  user: () => ({ id: 1, name: 'Glory' }),
      user: async (_, { id }: { id: number }): Promise<User> => {  // Developer can define this anywhere in the code, but in this one, its define in the root result.(typeQuery)
        // console.log({ id })
        const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`
        );
        counter++
        console.log({ counter })
        return user;
      },
    },
  },
});
