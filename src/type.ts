

export type User = {

    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
    nextUser: User
}

export type Post = {

    id: number
    userId: number
    title: string
    body: string 

}

type Geo = {
      lat: string
      lng: string
  }

  type Company = {
      name: string
      catchPhrase: string
      bs: string

      }
  type Address ={
      street: string
      suite: string 
      city: string
      zipcode: string
      geo: Geo 
  }