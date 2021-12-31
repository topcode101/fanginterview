// import Navbar from './navbar'
// import Footer from './footer'
import Header from './header'
export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <div id='footer'></div>
    </>
  )
}