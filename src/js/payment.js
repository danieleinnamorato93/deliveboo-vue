
import braintree from 'braintree';
import dotenv from 'dotenv';

//!importare le variabile di .env
dotenv.config();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,  //! Modalità Sandobox per TESTE
  merchantId: process.env.VUE_APP_BRAINTREE_MERCHANT_ID,  
  publicKey: process.env.VUE_APP_BRAINTREE_PUBLIC_KEY,    
  privateKey: process.env.VUE_APP_BRAINTREE_PRIVATE_KEY,  
});

export default gateway;  //! pronta per utilizo in altre parte del progetto