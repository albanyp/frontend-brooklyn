import jwtDecode from 'jwt-decode';

export const get = async (path: string) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "GET",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export const post = async (path: string, requestBody: object) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(requestBody)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export const postMedia = async (path: string, requestBody: FormData) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    body: requestBody
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export const put = async (path: string, requestBody: object) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "PUT",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(requestBody)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export const putMedia = async (path: string, requestBody: object) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "PUT",
    credentials: "same-origin",
    mode: "cors",
    body: requestBody as any
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export const remove = async (path: string) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "DELETE",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }
}


export const isTokenValid = (token: string) => {
  try {
    const decodedToken: { email: string, exp: number, iat: number, id: string } = jwtDecode(token)
    const time = Date.now() / 1000

    if (decodedToken.exp > time) {
      return token
    }

    localStorage.setItem('auth', null)
    return null
  } catch (err) {
    //handle error
    console.log(err)
  }
}
