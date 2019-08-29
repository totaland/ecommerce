// eslint-disable
// this is an auto generated file. This will be overwritten

export const createBasket = `mutation CreateBasket($input: CreateBasketInput!) {
  createBasket(input: $input) {
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
export const updateBasket = `mutation UpdateBasket($input: UpdateBasketInput!) {
  updateBasket(input: $input) {
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
export const deleteBasket = `mutation DeleteBasket($input: DeleteBasketInput!) {
  deleteBasket(input: $input) {
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
export const createItem = `mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
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
export const updateItem = `mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
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
export const deleteItem = `mutation DeleteItem($input: DeleteItemInput!) {
  deleteItem(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
