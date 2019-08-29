// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateBasket = `subscription OnCreateBasket {
  onCreateBasket {
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
export const onUpdateBasket = `subscription OnUpdateBasket {
  onUpdateBasket {
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
export const onDeleteBasket = `subscription OnDeleteBasket {
  onDeleteBasket {
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
export const onCreateItem = `subscription OnCreateItem {
  onCreateItem {
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
export const onUpdateItem = `subscription OnUpdateItem {
  onUpdateItem {
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
export const onDeleteItem = `subscription OnDeleteItem {
  onDeleteItem {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
