import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import FeaturedStores from './components/FeaturedStores'
import Plans from './components/Plans'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductGrid />
      <FeaturedStores />
      <Plans />
      <Footer />
    </>
  )
}
