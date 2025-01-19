<template>
  <div class="checkout-container py-4 px-3 bg-gray-900 min-h-screen flex flex-col items-center">
    <h1 class="text-base sm:text-lg lg:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4">Payment Information</h1>
    <form
      @submit.prevent="handleSubmit"
      class="form w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg"
    >
      <div class="form-group mb-3 sm:mb-4">
        <label
          for="cardNumber"
          class="block text-gray-200 text-sm sm:text-base lg:text-lg font-semibold mb-1"
        >
          Card Number
        </label>
        <div class="relative">
          <input
            type="text"
            id="cardNumber"
            v-model="cardNumber"
            @input="detectCardType"
            placeholder="Enter your card number"
            required
            class="w-full px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-yellow-500 text-xs sm:text-sm lg:text-base"
          />
          <img
            v-if="cardType"
            :src="cardTypeImage"
            :alt="cardType"
            class="absolute right-2 sm:right-3 top-1 sm:top-2 lg:right-4 lg:top-3 h-4 sm:h-5 lg:h-6"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div class="form-group">
          <label
            for="expiryDate"
            class="block text-gray-200 text-sm sm:text-base lg:text-lg font-semibold mb-1"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            v-model="expiryDate"
            placeholder="MM/YY"
            required
            class="w-full px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-yellow-500 text-xs sm:text-sm lg:text-base"
          />
        </div>
        <div class="form-group">
          <label
            for="cvv"
            class="block text-gray-200 text-sm sm:text-base lg:text-lg font-semibold mb-1"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            v-model="cvv"
            placeholder="Enter CVV"
            required
            class="w-full px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-yellow-500 text-xs sm:text-sm lg:text-base"
          />
        </div>
      </div>
      <div class="form-group mb-3 sm:mb-4">
        <label
          for="name"
          class="block text-gray-200 text-sm sm:text-base lg:text-lg font-semibold mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Enter your full name"
          required
          class="w-full px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-yellow-500 text-xs sm:text-sm lg:text-base"
        />
      </div>
      <div class="form-group mb-3 sm:mb-4">
        <label
          for="address"
          class="block text-gray-200 text-sm sm:text-base lg:text-lg font-semibold mb-1"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          v-model="address"
          placeholder="Enter your address"
          required
          class="w-full px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-yellow-500 text-xs sm:text-sm lg:text-base"
        />
      </div>
      <div class="form-group mb-4">
        <label
          for="phone"
          class="block text-gray-200 text-sm sm:text-base lg:text-lg font-semibold mb-1"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          v-model="phone"
          placeholder="Enter your phone number"
          required
          class="w-full px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring focus:ring-yellow-500 text-xs sm:text-sm lg:text-base"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 sm:py-3 lg:py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 text-xs sm:text-sm lg:text-base"
      >
        Pay Now
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
      address: '',
      phone: '',
      cardType: '',
    };
  },
  computed: {
    cardTypeImage() {
      const cardLogos = {
        Visa: 'https://cdn.icon-icons.com/icons2/1316/PNG/512/if-visa-2593666_86609.png',
        Mastercard: 'https://cdn.icon-icons.com/icons2/674/PNG/512/Mastercard_icon-icons.com_60554.png',
        'American Express': 'https://cdn.icon-icons.com/icons2/1178/PNG/512/amex_82052.png',
        Discover: 'https://cdn.icon-icons.com/icons2/1178/PNG/512/discover_82082.png',
      };
      return cardLogos[this.cardType] || '';
    },
  },
  methods: {
    detectCardType() {
      const number = this.cardNumber.replace(/\D/g, '');
      if (/^4/.test(number)) {
        this.cardType = 'Visa';
      } else if (/^5[1-5]/.test(number)) {
        this.cardType = 'Mastercard';
      } else if (/^3[47]/.test(number)) {
        this.cardType = 'American Express';
      } else if (/^6(?:011|5)/.test(number)) {
        this.cardType = 'Discover';
      } else {
        this.cardType = '';
      }

      const maxLength = this.cardType === 'American Express' ? 15 : 16;
      this.cardNumber = number.slice(0, maxLength).replace(/(\d{4})/g, '$1 ').trim();
    },
    formatExpiryDate() {
      const value = this.expiryDate.replace(/\D/g, '');
      if (value.length > 2) {
        this.expiryDate = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      } else {
        this.expiryDate = value;
      }
    },
    validateCVV() {
      const maxLength = this.cardType === 'American Express' ? 4 : 3;
      this.cvv = this.cvv.replace(/\D/g, '').slice(0, maxLength);
    },
    validateName() {
      this.name = this.name.replace(/[^a-zA-Z\s]/g, '');
    },
    validatePhone() {
      this.phone = this.phone.replace(/\D/g, '').slice(0, 15);
    },
    handleSubmit() {
      localStorage.setItem(
        'paymentInfo',
        JSON.stringify({
          name: this.name,
          address: this.address,
          phone: this.phone,
        })
      );
      this.$router.push('/summary');
    },
  },
  mounted() {
    const savedData = JSON.parse(localStorage.getItem('paymentInfo'));
    if (savedData) {
      this.name = savedData.name || '';
      this.address = savedData.address || '';
      this.phone = savedData.phone || '';
    }
  },
  watch: {
    cardNumber: 'detectCardType',
    expiryDate: 'formatExpiryDate',
    cvv: 'validateCVV',
    name: 'validateName',
    phone: 'validatePhone',
  },
};
</script>

<style scoped>
.checkout-container {
  background-color: var(--background-dark);
  color: var(--title-text);
}

.form {
  transition: width 0.3s ease-in-out;
}
</style>