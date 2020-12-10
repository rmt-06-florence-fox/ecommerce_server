# CMS - Server

### POST Sign In

##### request

```
{
	email: 'admin@mail.com',
	password: 123456
}
```

##### success response (200)

```
{
	access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 (example)
}
```

##### failed response 

```
- status 401
{
	error: 'Invalid email/password'
}
```

### POST Product

##### request

```
- headers
{
	access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 (example)
}

- data
{
	name: 'Tango'
	image_url: 'https://www.google.com/url?%2F%2Fwww.dotabuff'
	price: 100
	stock: 100
}
```

##### success response (200)

```
{
	id: 1
	name: 'Tango'
	image_url: 'https://www.google.com/url?%2F%2Fwww.dotabuff'
	price: 100
	stock: 100
	UserId: 1
	createdAt: 2020-12-09T15:27:05.668Z
	updatedAt: 2020-12-09T15:27:05.668Z
}
```

##### failed response 

```
- status 400
{
	error: Price must be a number, Require Product name (example)
}

- status 401
{
	error: 'Authentication failed'
}

- status 500
{
	error: Internal Server Error
}
```

### GET Product

##### request

```
{
	access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 (example)
}
```

##### success response (200)

```
{
	id: 1,
	name: 'Tango',
	image_url: 'https://www.google.com/url?%2F%2Fwww.dotabuff'
	price: 100
	stock: 100
	UserId: 1
	createdAt: 2020-12-09T15:27:05.668Z
	updatedAt: 2020-12-09T15:27:05.668Z
}
```

##### failed response

```
- status 401
{
	error: 'Authentication failed'
}

- status 500
{
	error: Internal Server Error
}
```

### PUT Product by Id

##### request

```
- headers
{
	access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 (example)
}

- params
{
	Product_Id: 1 (example)
}

- body
{
	name: 'Healing Salve'
	image_url: 'https://www.google.com/url?%2F%2Fwww.dotabuff'
	price: 480
	stock: 1
}
```

##### success response (200)

```
{
	name: 'Healing Salve'
	image_url: 'https://www.google.com/url?%2F%2Fwww.dotabuff'
	price: 480
	stock: 1
	UserId: 1
	createdAt: 2020-12-09T15:27:05.668Z
	updatedAt: 2020-12-09T15:27:05.668Z
}
```

##### failed response 

```
- status 400
{
	error: Price must be a number, Require Product name (example)
}

- status 401
{
	error: 'Authentication failed'
}

- status 500
{
	error: 'Internal Server Error'
}
```

### DELETE Task Id

##### request

```
- headers
{
	access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 (example)
}

- params
{
	Product_Id: 1 (example)
}
```

##### success response (200)

```
{
	msg: 'Delete product success'
}
```

##### failed response

```
- status 401
{
	error: 'Authentication failed'
}

- status 500
{
	error: 'Internal Server Error'
}
```

