'use client'
import { Provider } from 'react-redux';
import './globals.css';
import { Inter } from 'next/font/google'
import store from '@/redux/store';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
