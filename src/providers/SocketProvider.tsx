"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/redux/hooks"; // Assumes you have Redux for Auth Token if needed

// Define the shape of our context
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Create the context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Custom hook to easily access the socket instance from any component
export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Example: Grab token from Redux if you need authenticated sockets
  // const { token } = useAppSelector((state) => state.cmAuth);

  useEffect(() => {
    // ---------------------------------------------------------
    // DEVELOPER NOTE:
    // Initialize the socket connection. 
    // Ensure the backend URL is correctly set in your .env file
    // as NEXT_PUBLIC_API_URL (e.g., http://localhost:5000)
    // ---------------------------------------------------------
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || "http://localhost:5000";

    const socketInstance = io(socketUrl, {
      // Optional: Add authentication headers if your backend requires them
      // auth: {
      //   token: token, 
      // },
      transports: ["websocket", "polling"], // prioritize websocket for speed
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("🟢 [Socket.IO] Connected to server:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 [Socket.IO] Disconnected from server");
      setIsConnected(false);
    });

    // Save instance to state so we can provide it down the tree
    setSocket(socketInstance);

    // Cleanup function: disconnect when the provider unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []); // Re-run if `token` changes (if you uncomment token logic)

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
