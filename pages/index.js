import Page from './components/page';
import Head from 'next/head';

export default function Index() {
  return(
    <div>
      <Head>
        <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpJL1Xw6hgwZ9Qopjrjqgf1KirBnI8nLM&libraries=places"></script>
      </Head>
      <Page />
    </div> 
  )
}
  
