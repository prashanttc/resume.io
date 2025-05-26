'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function PremiumButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleSubscribe = async () => {
    const res = await fetch('/api/create-subscription', {
      method: 'POST',
    });
    const { subscriptionId, user } = await res.json();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Set this in .env
      name: 'Resumate Pro',
      description: 'Monthly Premium Access',
      subscription_id: subscriptionId,
      handler: async function (response: any) {
        toast.success('Payment successful! It’ll activate in a few seconds.');
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#6366F1',
      },
    };

    // @ts-ignore
    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handleSubscribe}
      className=" text-black px-4 py-2 rounded-xl transition"
    >
      Go Premium ₹100/month
    </button>
  );
}
