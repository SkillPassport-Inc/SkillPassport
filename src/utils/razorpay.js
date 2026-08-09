export function openRazorpayCheckout({
  amount,
  planName,
  userEmail = '',
  userName = '',
  onSuccess,
  onCancel,
}) {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      reject(new Error('Razorpay SDK not loaded'));
      return;
    }

    // Convert amount in INR (₹) to paise
    const amountInPaise = amount * 100;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SkillPassportKey123',
      amount: amountInPaise,
      currency: 'INR',
      name: 'SkillPassport Inc.',
      description: `Subscription to ${planName} Plan`,
      image: '/favicon.png',
      handler: function (response) {
        if (onSuccess) {
          onSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            planName,
            amount,
          });
        }
        resolve(response);
      },
      prefill: {
        name: userName || 'Developer',
        email: userEmail || 'developer@example.com',
        contact: '9999999999',
      },
      notes: {
        platform: 'SkillPassport SaaS',
        plan: planName,
      },
      theme: {
        color: '#4F46E5',
      },
      modal: {
        ondismiss: function () {
          if (onCancel) onCancel();
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      alert(`Payment Failed: ${response.error.description || 'Transaction declined'}`);
    });
    rzp.open();
  });
}
