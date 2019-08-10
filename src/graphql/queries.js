// eslint-disable
// this is an auto generated file. This will be overwritten

export const getBasket = `query GetBasket($id: ID!) {
  getBasket(id: $id) {
    id
    isDelivered
    isPaid
    items {
      items {
        id
        name
        price
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
      isDelivered
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
      isDelivered
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
        isDelivered
        isPaid
        stripeToken
      }
      id
      name
      price
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
        isDelivered
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
