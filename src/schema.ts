import { createSchema } from 'graphql-yoga';
import axios from "axios";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
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
  }
    type Query { 
      hello: String
      number: Int
      user(id: Int!): User #(So this field can only be query it if you pass an ID)
    }
  `,
  resolvers: {
    User: {
      name: (parent) => parent.name + '🕯',
      nextUser: (parent) => {

      }

    },

    Query: {
      hello: () => 'world',
      number: () => 1,
      //  user: () => ({ id: 1, name: 'Glory' }),
      user: async (_, { id }: { id: number }) => {  // Developer can define this anywhere in the code, but in this one, its define in the root result.(typeQuery)
        // console.log({ id })
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`
        );
        return data
      }
    },
  },
});