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
    .then(data => {
      console.log(data)
    })
    .catch(err => console.error(err))
}

export default CreateUser
