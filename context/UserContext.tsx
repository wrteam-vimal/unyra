"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "Credit" | "Debit";
  amount: number;
  description: string;
  referenceId?: string;
}

export interface OrderItem {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    size: string;
  };
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: Address;
  paymentMethod: string;
  transactionId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  walletBalance: number;
  orders: Order[];
  transactions: Transaction[];
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addWalletFunds: (amount: number) => void;
  placeOrder: (
    items: { product: any; qty: number }[],
    subtotal: number,
    discount: number,
    total: number,
    address: Address,
    paymentMethod: string
  ) => { success: boolean; orderId?: string; error?: string };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const INITIAL_DEMO_USER: User = {
  id: "u1",
  name: "Vimal Patel",
  email: "vimal@unyra.com",
  password: "password123",
  walletBalance: 350.02,
  orders: [
    {
      id: "UNY-892471",
      date: "10 May 2026",
      items: [
        {
          product: {
            id: "p1",
            name: "Face Wash",
            price: "$24.99",
            image: "/images/5.jpeg",
            size: "100ml"
          },
          qty: 1
        },
        {
          product: {
            id: "p3",
            name: "Moisturiser",
            price: "$34.99",
            image: "/images/3.jpeg",
            size: "200ml"
          },
          qty: 1
        }
      ],
      subtotal: 59.98,
      discount: 0,
      total: 59.98,
      status: "Delivered",
      shippingAddress: {
        firstName: "Vimal",
        lastName: "Patel",
        email: "vimal@unyra.com",
        street: "123 Serenity Blvd",
        city: "Aura Valley",
        state: "California",
        zip: "90210"
      },
      paymentMethod: "Wallet",
      transactionId: "TXN-902384"
    }
  ],
  transactions: [
    {
      id: "REF-789012",
      date: "01 May 2026",
      type: "Credit",
      amount: 400.00,
      description: "Wallet Initial Load"
    },
    {
      id: "TXN-902384",
      date: "10 May 2026",
      type: "Debit",
      amount: 59.98,
      description: "Payment for Order #UNY-892471",
      referenceId: "UNY-892471"
    },
    {
      id: "REF-847291",
      date: "15 May 2026",
      type: "Credit",
      amount: 10.00,
      description: "Promo Cashback Reward"
    }
  ]
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load from LocalStorage
    const storedUsers = localStorage.getItem("unyra_users");
    const storedCurrentUser = localStorage.getItem("unyra_currentUser");

    let parsedUsers: User[] = [];
    if (storedUsers) {
      parsedUsers = JSON.parse(storedUsers);
    } else {
      // Initialize with demo user
      parsedUsers = [INITIAL_DEMO_USER];
      localStorage.setItem("unyra_users", JSON.stringify(parsedUsers));
    }
    setUsers(parsedUsers);

    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
    setLoaded(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem("unyra_currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const newUser: User = {
      id: "u_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      walletBalance: 100.0, // Welcome Bonus
      orders: [],
      transactions: [
        {
          id: "TXN-" + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          type: "Credit",
          amount: 100.0,
          description: "Welcome Sign-Up Bonus"
        }
      ],
      actions: []
    } as any;

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("unyra_users", JSON.stringify(updatedUsers));

    setCurrentUser(newUser);
    localStorage.setItem("unyra_currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("unyra_currentUser");
  };

  const addWalletFunds = (amount: number) => {
    if (!currentUser) return;

    const transactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    const newTx: Transaction = {
      id: transactionId,
      date: dateStr,
      type: "Credit",
      amount: amount,
      description: "Wallet Funds Recharge"
    };

    const updatedUser: User = {
      ...currentUser,
      walletBalance: parseFloat((currentUser.walletBalance + amount).toFixed(2)),
      transactions: [newTx, ...currentUser.transactions]
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("unyra_currentUser", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem("unyra_users", JSON.stringify(updatedUsers));
  };

  const placeOrder = (
    items: { product: any; qty: number }[],
    subtotal: number,
    discount: number,
    total: number,
    address: Address,
    paymentMethod: string
  ): { success: boolean; orderId?: string; error?: string } => {
    if (!currentUser) {
      return { success: false, error: "Please log in to complete order" };
    }

    if (paymentMethod === "wallet" && currentUser.walletBalance < total) {
      return { success: false, error: "Insufficient wallet balance" };
    }

    const orderId = "UNY-" + Math.floor(100000 + Math.random() * 900000);
    const txnId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    const orderItems: OrderItem[] = items.map((it) => ({
      product: {
        id: it.product.id,
        name: it.product.name,
        price: it.product.price,
        image: it.product.image,
        size: it.product.size
      },
      qty: it.qty
    }));

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      items: orderItems,
      subtotal,
      discount,
      total,
      status: "Processing",
      shippingAddress: address,
      paymentMethod: paymentMethod === "wallet" ? "Wallet" : "Credit Card",
      transactionId: txnId
    };

    let updatedTransactions = [...currentUser.transactions];
    let newBalance = currentUser.walletBalance;

    if (paymentMethod === "wallet") {
      newBalance = parseFloat((currentUser.walletBalance - total).toFixed(2));
      const newTx: Transaction = {
        id: txnId,
        date: dateStr,
        type: "Debit",
        amount: total,
        description: `Payment for Order #${orderId}`,
        referenceId: orderId
      };
      updatedTransactions = [newTx, ...updatedTransactions];
    }

    const updatedUser: User = {
      ...currentUser,
      walletBalance: newBalance,
      orders: [newOrder, ...currentUser.orders],
      transactions: updatedTransactions
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("unyra_currentUser", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem("unyra_users", JSON.stringify(updatedUsers));

    return { success: true, orderId };
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        login,
        register,
        logout,
        addWalletFunds,
        placeOrder
      }}
    >
      {loaded && children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
