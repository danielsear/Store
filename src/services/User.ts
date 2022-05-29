export type User = {
  id?: string
  name: string
  email: string
  password: string
  admin?: boolean
}

function CreateUser(user: User) {
  const { name, email, password, admin } = user

  fetch('http://localhost:3333/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password, admin })
  })
    .then()
    .catch(err => console.error(err))
}

function findUsers() {
  return fetch(`http://localhost:3333/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(data => {
      return data
    })
    .catch(err => console.error(err))
}

function findOneUser(id: string) {
  return fetch(`http://localhost:3333/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(data => {
      return data
    })
    .catch(err => console.error(err))
}

export { CreateUser, findUsers, findOneUser }
