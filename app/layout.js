'use client'
import { Provider } from 'react-redux';
import './globals.css';
import { Inter } from 'next/font/google'
import store from '@/redux/store';
import Sidebar from './components/layout/Sidebar';
import MainLayout from './components/layout/MainLayout';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
            <MainLayout>
            {children}
            </MainLayout>
        </Provider>
      </body>
    </html>
  )
}
