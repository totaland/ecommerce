// eslint-disable
// this is an auto generated file. This will be overwritten

export const getBasket = `query GetBasket($id: ID!) {
  getBasket(id: $id) {
    id
    isPaid
    items {
      items {
        id
        name
        price
        time
      }
      nextToken
    }
    stripeToken
    user {
      id
      name
      email
      baskets {
        nextToken
      }
    }
  }
}
`;
export const listBaskets = `query ListBaskets(
  $filter: ModelBasketFilterInput
  $limit: Int
  $nextToken: String
) {
  listBaskets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      isPaid
      items {
        nextToken
      }
      stripeToken
      user {
        id
        name
        email
      }
    }
    nextToken
  }
}
`;
export const getItem = `query GetItem($id: ID!) {
  getItem(id: $id) {
    basket {
      id
      isPaid
      items {
        nextToken
      }
      stripeToken
      user {
        id
        name
        email
      }
    }
    id
    name
    price
    time
  }
}
`;
export const listItems = `query ListItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      basket {
        id
        isPaid
        stripeToken
      }
      id
      name
      price
      time
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    baskets {
      items {
        id
        isPaid
        stripeToken
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      baskets {
        nextToken
      }
    }
    nextToken
  }
}
`;
