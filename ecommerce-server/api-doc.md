# e-commerce Content Management System (CMS) Admin (Renetuku)
Renetuku is application e-commerce for admin to add, update, delete products. It performs CRUD action based on RESTful concepts.

## Dependencies
1. Node JS
2. Express JS framework
3. PostgreSQL + Sequelize
4. bcryptjs
5. axios
6. cors

## Dev Dependencies
1. dotenv
2. nodemon
3. jest
4. supertest

## Route List
- POST /login
- POST /loginCustomer
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /banners
- POST /banners
- GET /banners/:id
- PUT /banners/:id
- DELETE /banners/:id
- POST /register (customer only)
- GET /carts
- POST /carts/:ProductId
- PATCH /carts/:ProductId
- DELETE /carts/:id
- POST /carts/checkout
- GET /wishlists
- POST /wishlists
- DELETE /wishlists/:id
- GET /checkout
- POST /checkout


## Register via Seeders
### Seed Data
``` json
    {
        "email" : "admin@mail.com",
        "password" : "1234",
        "role" : "admin",
        "createdAt" : <timestamp>,
        "updatedAt" : <timestamp>,
    }
```

## POST /register,
### Requirement/Request
``` json
    Request Body
    {
        "email" : <user@mail.com, string>,
        "password" : <hidden, string>
    }
```
### Response
```json
    Response (201 - created)
    {
        "id": <given id by system, integer>,
        "email": <user@mail.com, string>,
    }
    {
        "message" : "Account successfully created, please login to continue"
    }

    Response (401) Authorization
    Response (500) Internal Server
```


## POST /login,
### Requirement/Request
``` json
    Request Body
    {
        "email" : <user@mail.com, string>,
        "password" : <hidden, string>
    }
```
### Response
```json
    Response (200 - Success)
    {
        "id": <given id by system, integer>,
        "email": <user@mail.com, string>,
        "access_token": <access_token>
    }
    {
        "message" : "Login Success"
    }

    Response (401) Authorization
    Response (500) Internal Server
```

## POST /loginCustomer,
### Requirement/Request
``` json
    Request Body
    {
        "email" : <user@mail.com, string>,
        "password" : <hidden, string>
    }
```
### Response
```json
    Response (200 - Success)
    {
        "id": <given id by system, integer>,
        "email": <user@mail.com, string>,
        "access_token": <access_token>
    }
    {
        "message" : "Login Success"
    }

    Response (401) Authorization
    Response (500) Internal Server
```

## POST /products
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }

    Request Body
    {
        "name" : <product name, string>,
        "category" : <product category, string>,
        "stock" : <product stock, integer>,
        "price" : <product price, integer>,
        "image_url": <product image, string>
    }
```

### Response
```json
    Response (201 - Created)
    {"newProduct":
        {
                "id": <given id by system, integer>,
                "UserId" : <current user id, integer>
                "name" : <product name, string>,
                "category" : <product category, string>,
                "stock" : <product stock, integer>,
                "price" : <product price, integer>,
                "image_url": <product image, string>,
                "createdAt": <timestamp, date>,
                "updatedAt": <timestamp, date>
        }
    },
    {
        "message" : "Product Added Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## GET /products
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }
```

### Response
```json
    Response (200 - Success)
    [
        {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "name" : <product name, string>,
            "category" : <product category, string>,
            "stock" : <product stock, integer>,
            "price" : <product price, integer>,
            "image_url": <product image, string>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
        },
        {
            ...
        }
    ],
    {
        "message" : "Products Loaded Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## GET /products/:id
### Requirement/Request
```json
    Request Header
    {
         "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - Success)
    {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "name" : <product name, string>,
            "category" : <product category, string>,
            "stock" : <product stock, integer>,
            "price" : <product price, integer>,
            "image_url": <product image, string>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
    },
    {
        "message" : "Product Loaded Successfully"
    }

    Response (404) Data not found,
    Response (500) Internal Server
```

## PUT /products/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param>
    }

    Request Body
    {
        "name" : <product name, string>,
        "category" : <product category, string>,
        "stock" : <product stock, integer>,
        "price" : <product price, integer>,
        "image_url": <product image, string>
    }
```

### Response
``` json
    Response (200 - OK)
    {
        "message" : "Product Updated Succesfully"
    }

    Response (400) Validate not meet requirement
    Response (404) Data not found
    Response (500) Internal Server
```

## DELETE /products/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - Success)
    {
        "message" : "Product deleted successfully"
    }

    Response (404) Data not found
    Response (500) Internal Server
```

## POST /banners
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }

    Request Body
    {
        "banner_url" : <banner url, string>,
        "category" : <banner category, string>,
        "status" : <status stock, string>,
    }
```

### Response
```json
    Response (201 - Created)
    {
        "message" : "Banner Added Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## GET /banners
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }
```

### Response
```json
    Response (200 - Success)
    [
        {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "banner_url" : <banner url, string>,
            "category" : <banner category, string>,
            "status" : <status stock, string>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
        },
        {
            ...
        }
    ],
    {
        "message" : "Banners Loaded Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## GET /banners/:id
### Requirement/Request
```json
    Request Header
    {
         "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - Success)
    {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "banner_url" : <banner url, string>,
            "category" : <banner category, string>,
            "status" : <status stock, string>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
    },
    {
        "message" : "Banner Loaded Successfully"
    }

    Response (404) Data not found,
    Response (500) Internal Server
```

## PUT /banners/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param>
    }

    Request Body
    {
        "banner_url" : <banner url, string>,
        "category" : <banner category, string>,
        "status" : <status stock, string>,
    }
```

### Response
``` json
    Response (200 - OK)
    {
        "message" : "Banner Updated Succesfully"
    }

    Response (400) Validate not meet requirement
    Response (404) Data not found
    Response (500) Internal Server
```

## DELETE /banners/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - Success)
    {
        "message" : "Banner deleted successfully"
    }

    Response (404) Data not found
    Response (500) Internal Server
```

## GET /carts
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }
```

### Response
```json
    Response (200 - Success)
    [
        {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "ProductId" : <product name, integer>,
            "quantity" : <destined quantity, integer>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>,
            "Product": {
                "id": <given id by system, integer>,
                "UserId" : <current user id, integer>
                "name" : <product name, string>,
                "category" : <product category, string>,
                "stock" : <product stock, integer>,
                "price" : <product price, integer>,
                "image_url": <product image, string>,
                "createdAt": <timestamp, date>,
                "updatedAt": <timestamp, date>
            }
        },
        {
            ...
        }
    ],
    {
        "message" : "Carts Loaded Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```
## POST /carts/:ProductId
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        ProductId: <id from param>
    }

    Request Body
    {
        ...
    }
```

### Response
``` json
    Response (201 - Created)
    {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>
        "ProductId" : <product name, integer>,
        "quantity" : <destined quantity, integer>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>,
        "Product": {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "name" : <product name, string>,
            "category" : <product category, string>,
            "stock" : <product stock, integer>,
            "price" : <product price, integer>,
            "image_url": <product image, string>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
        }
    },
    {
        "message" : "Cart Succesfully Created"
    }

    Response (400) Validate not meet requirement
    Response (404) Data not found
    Response (500) Internal Server
```

## PATCH /carts/:ProductId
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        ProductQtyId: <id from param>
    }

    Request Body
    {
        "quantity": <destined quantity, integer>
    }
```

### Response
``` json
    Response (200 - Updated)
    {
        "message" : "Quantity succesfully Updated"
    }

    Response (400) Validate not meet requirement
    Response (404) Data not found
    Response (500) Internal Server
```

## DELETE /carts/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

### Response
```json
    Response (200 - Success)
    {
        "message" : "Product succesfully removed from cart"
    }

    Response (404) Data not found
    Response (500) Internal Server
```

## GET /wishlists
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }
```

### Response
```json
    Response (200 - Success)
    [
        {
            "id": <given id by system, integer>,
            "UserId" : <current user id, integer>
            "ProductId" : <product id, integer>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
        },
        {
            ...
        }
    ],
    {
        "message" : "Wishlists Loaded Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## POST /wishlists
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }

    Request Body
    {
        "ProductId" : <Product id, integer>,
    }
```

### Response
```json
    Response (201 - Created)
    {
        "id": <given id by system, integer>,
        "UserId" : <current user id, integer>
        "ProductId" : <product id, integer>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>
    }
    {
        "message" : "Wishlist Added Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```

## DELETE /wishlists/:id
### Requirement/Request
```json
    Request Header
    {
        "access_token": <access token, string>
    }

    Request Params
    {
        id: <id from param, integer>
    }
```

## GET /checkout
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }
```

### Response
```json
    Response (200 - Success)
    [
        {
            "id": <given id by system, integer>,
            "purchasDate" : <purchase date, string>
            "transactionCode" : <transaction code, string>,
            "totalItem" : <total item, integer>,
            "totalPrice" : <total price, integer>,
            "UserId" : <current user id, integer>,
            "createdAt": <timestamp, date>,
            "updatedAt": <timestamp, date>
        },
        {
            ...
        }
    ],
    {
        "message" : "Wishlists Loaded Successfully"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```


## POST /checkout
### Requirement/Request
```json
    Request Header
    {
    "access_token": <access token, string>
    }

    Request Body
    {
        ...
    }
```

### Response
```json
    Response (201 - Created)
    {
        "id": <given id by system, integer>,
        "purchasDate" : <purchase date, string>
        "transactionCode" : <transaction code, string>,
        "totalItem" : <total item, integer>,
        "totalPrice" : <total price, integer>,
        "UserId" : <current user id, integer>,
        "createdAt": <timestamp, date>,
        "updatedAt": <timestamp, date>
    }
    {
        "message" : "Checkout Success"
    }

    Response (400) Validate not meet requirement
    Response (500) Internal Server
```


### Response
```json
    Response (200 - Success)
    {
        "message" : "Product succesfully removed from wishlists"
    }

    Response (404) Data not found
    Response (500) Internal Server
```

## Fail Responses
```json
    Response (400) Validate not meet requirement
    {
        "errors" : [
            "Product name can't be empty"
            "Category can't be empty",
            "Stock can't be empty",
            "Stock must be greater than equals 0",
            "Price can't be empty",
            "Price must be greater than equals 0",
            "Image Url can't be empty",
            "Image Url must contain only url link",
            "Banner Url can't be empty",
            "Banner Url must contain only url link",
            "Status can't be empty",
        ]
    }

    Response (401) Authorization  
    {
        "errors" : [
            "Invalid Email/Password",
            "Email can't be empty",
            "Password can't be empty",
            "You don't have permission to edit this products"
            "You don't have permission to edit this banner"
            ]
    }

    Response (404) Data not found
    {
        "errors" : ["Data not found"]
    }

    Response (500) Internal Server
    {
        "errors" : ["Internal server error"]
    }

```