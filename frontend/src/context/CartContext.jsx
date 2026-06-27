import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useCurrency } from './CurrencyContext'
import { useUserData } from './UserContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { getPrice } = useCurrency()
  const { loggedIn, userData, authChecked } = useUserData()
  const hasLoadedFromUser = useRef(false)

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cartItems')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    if (authChecked && loggedIn && userData?.cart && !hasLoadedFromUser.current) {
      setCartItems(userData.cart)
      hasLoadedFromUser.current = true
    }
    if (authChecked && !loggedIn) {
      hasLoadedFromUser.current = false
    }
  }, [authChecked, loggedIn, userData])

  useEffect(() => {
    if (!loggedIn || !hasLoadedFromUser.current) return

    const syncCart = async () => {
      try {
        const tokenRes = await fetch('/api/users/get-token', { credentials: 'include' })
        const tokenData = await tokenRes.json()
        if (tokenData.err) return

        await fetch('/api/users/update-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: tokenData.data },
          credentials: 'include',
          body: JSON.stringify({ cart: cartItems })
        })
      } catch (err) {
        console.error('Cart sync error:', err)
      }
    }

    syncCart()
  }, [cartItems, loggedIn])

  const addToCart = (product, variant, quantity = 1) => {
    const name = product.title ?? product.name ?? ''
    const image = product.images?.[0]?.src ?? product.image ?? ''
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.variant.title === variant.title
      )
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.variant.title === variant.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name,
          image,
          price: variant.price,
          oldPrice: variant.compare_at_price ?? null,
          variant,
          quantity,
        },
      ]
    })
  }

  const removeFromCart = (id, variantTitle) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.variant.title === variantTitle))
    )
  }

  const updateQuantity = (id, variantTitle, quantity) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant.title === variantTitle ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + getPrice(item.price) * item.quantity, 0)
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.oldPrice) return sum + (getPrice(item.oldPrice) - getPrice(item.price)) * item.quantity
    return sum
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)