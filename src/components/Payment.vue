<script>

export default {
    data() {
        return {
            
        };
    },
    
}

</script>

<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="sub-body">
                    <div class="pay-select">
                        <div class="pay-select__item pay-select--card is-active">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/346994/Card%20Icon.svg" alt="" />
                            <p>Debit/Credit Card</p>
                        </div>
                    </div>

                    <div class="select-body">
                        <div class="select-body__content select-body--card is-active">
                            <form action="/" method="post" id="cardForm">
                                <label class="form__label" for="card-number">Card Number</label>
                                <div class="card-input" id="card-number"></div>

                                <label class="form__label" for="expiration-month">Expiration Date</label>
                                <div class="date__container">
                                    <div class="card-input" id="expiration-month"></div>
                                    <div class="card-input" id="expiration-year"></div>
                                </div>

                                <label class="form__label" for="cvv">CVV</label>
                                <div class="card-input" id="cvv"></div>

                                <input type="submit" value="Subscribe" id="submit" class="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>

<style scoped lang="scss"></style>