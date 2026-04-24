import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'velmora.cart.v1'

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return safeParse(raw, [])
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, size, quantity = 1) => {
    if (!product?.id || !size || quantity <= 0) return
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === product.id && i.size === size)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      return [
        ...prev,
        {
          productId: product.id,
          size,
          quantity,
          price: product.price,
          name: product.name,
          image: product.image,
        },
      ]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId, size) => {
    setCartItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }

  const updateQuantity = (productId, size, quantity) => {
    const q = Math.max(0, Number(quantity || 0))
    setCartItems((prev) => {
      if (q === 0) return prev.filter((i) => !(i.productId === productId && i.size === size))
      return prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, quantity: q } : i,
      )
    })
  }

  const clearCart = () => setCartItems([])

  const getCartTotal = () =>
    cartItems.reduce((sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 0), 0)

  const getCartCount = () =>
    cartItems.reduce((sum, i) => sum + Number(i.quantity || 0), 0)

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [cartItems, isCartOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

