import { createContext } from "react"

const Context = createContext({
    fetchUserAddToCart: () => {},
    cartProductCount: 0
})

export default Context
