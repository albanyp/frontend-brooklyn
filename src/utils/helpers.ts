import jwtDecode from 'jwt-decode';

export const post = async (path: string, requestBody: object) => {
   const req = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(requestBody)
  })
  return req.json()
}

export const get = async (path: string) => {
  const req = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
   method: "GET",
   credentials: "same-origin",
   mode: "cors",
   headers: {
     "Content-Type": "application/json; charset=UTF-8"
   },
 })

 return req.json()
}

export const isTokenValid = (token: string) => {
  try {
    const decodedToken: { email: string, exp: number, iat: number, id: string} = jwtDecode(token)
    const time = Date.now() / 1000

    if(decodedToken.exp > time) {
      return token
    }
    
    localStorage.setItem('auth', null)
    return null
  } catch(err) {
    //handle error
    console.log(err)
  }
}
