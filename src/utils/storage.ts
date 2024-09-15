
export const storage = {
  setObject: <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data))
  },

  getObject: <T>(key: string): T => {
    return JSON.parse(localStorage.getItem(key))
  }
}