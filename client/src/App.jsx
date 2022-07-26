import { useState } from 'react'
import {Navbar, Footer, Welcome, Transactions, Services, Loader} from './components';

const App = () => {
  
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <div>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
