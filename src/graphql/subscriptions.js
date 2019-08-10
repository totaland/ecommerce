// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateBasket = `subscription OnCreateBasket {
  onCreateBasket {
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
export const onUpdateBasket = `subscription OnUpdateBasket {
  onUpdateBasket {
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
export const onDeleteBasket = `subscription OnDeleteBasket {
  onDeleteBasket {
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
export const onCreateItem = `subscription OnCreateItem {
  onCreateItem {
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
export const onUpdateItem = `subscription OnUpdateItem {
  onUpdateItem {
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
export const onDeleteItem = `subscription OnDeleteItem {
  onDeleteItem {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
