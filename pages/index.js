import Head from 'next/head'
import ProductsList from '../components/productsComponents/ProductsList'

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>Agro Chain</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ProductsList products={products} key={products.PRODUCT_ID}/>
      </main>

      <footer>
        
      </footer>
    </div>
  )
}

Home.getInitialProps = async () => {
  const response = await fetch('http://localhost:3000/api/products', )
  let data = await response.json();
  return {products: data}
}