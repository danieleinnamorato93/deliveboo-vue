<script>
export default {
    name: 'Payment',
    data() {
        return {
            instance: null, // Armazena a instância do Drop-in UI
            clientToken: '',  // Usar clientToken gerado pelo backend
            checkoutMessage: '', // Armazena mensagens de sucesso ou erro
            isSubmitting: false, // Controle de submissão para desabilitar o botão
        };
    },
    mounted() {
        // Inicializa o Braintree Drop-in UI
        this.fetchClientToken();
    },
    methods: {
        // Método para buscar o client token
        async fetchClientToken() {
            try {
                // const response = await fetch('/client_token');
                // const data = await response.json();
                // this.clientToken = data.client_token;
                // this.initializeDropin();
                const response = await fetch('/client_token');
                const text = await response.text(); // Lê a resposta como texto
                console.log('Response text:', text); // Verifica o conteúdo da resposta

                const data = JSON.parse(text); // Tenta converter a resposta para JSON
                this.clientToken = data.client_token;
                this.initializeDropin();
            } catch (error) {
                console.error('Error fetching client token:', error);
            }
        },
        // Método para inicializar o Drop-in UI
        initializeDropin() {
            if (!this.clientToken) {
                console.error('Client token is not available');
                return;
            }

            braintree.dropin.create({
                authorization: this.clientToken,  // Agora usa o client token
                container: '#dropin-container',
            }, (createErr, instance) => {
                if (createErr) {
                    console.error('Error creating Drop-in UI:', createErr);
                    this.checkoutMessage = '<h1>Error</h1><p>Could not load the payment UI. Check the console for details.</p>';
                    return;
                }
                this.instance = instance;
            });
        },
        // Método para enviar o pagamento quando o botão é clicado
        submitPayment() {
            if (!this.instance || this.isSubmitting) {
                return; // Impede envio múltiplo ou caso a instância não tenha sido criada
            }

            this.isSubmitting = true; // Indica que o pagamento está sendo processado

            this.instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                if (requestPaymentMethodErr) {
                    console.error('Error requesting payment method:', requestPaymentMethodErr);
                    this.checkoutMessage = '<h1>Error</h1><p>Could not retrieve payment method. Check the console.</p>';
                    this.isSubmitting = false;
                    return;
                }

                // Envia o nonce para o backend
                this.sendPayment(payload.nonce);
            });
        },
        // Método para enviar o pagamento para o backend
        sendPayment(paymentMethodNonce) {
            fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodNonce: paymentMethodNonce,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        this.handleSuccess();
                    } else {
                        this.handleError(result);
                    }
                })
                .catch((err) => {
                    console.error('Error processing payment:', err);
                    this.handleError(err);
                });
        },
        // Método para lidar com o sucesso do pagamento
        handleSuccess() {
            this.instance.teardown((teardownErr) => {
                if (teardownErr) {
                    console.error('Could not tear down Drop-in UI!');
                } else {
                    console.info('Drop-in UI has been torn down!');
                    // Remove o botão de pagamento
                    this.checkoutMessage = `
                        <h1>Success</h1>
                        <p>Your payment was successful! Check your <a href="https://sandbox.braintreegateway.com/login">Braintree Sandbox Control Panel</a> for test transactions.</p>
                        <p>Refresh to try another transaction.</p>
                    `;
                }
            });
        },
        // Método para lidar com erro no pagamento
        handleError(err) {
            this.checkoutMessage = `
                <h1>Error</h1>
                <p>Something went wrong during the payment process. Check the console for more details.</p>
            `;
            console.error('Payment Error:', err);
            this.isSubmitting = false;
        },
    },

}

</script>

<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-6">
                <div id="dropin-wrapper">
                    <div v-if="checkoutMessage" id="checkout-message" v-html="checkoutMessage"></div>
                    <div id="dropin-container"></div>
                    <button id="submit-button" @click="submitPayment" :disabled="isSubmitting">Submit payment</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>