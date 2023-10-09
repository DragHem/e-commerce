const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'PLN',
  }).format(amount / 100);
};

export default formatPrice;
