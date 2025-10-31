import { useState } from 'react';

export default function CheckoutButton() {
  const [showMessage, setShowMessage] = useState(false);

  const handleCheckout = () => {
    // Bu yerda savatni yuborish logikasi bo'lishi mumkin (masalan, API ga so'rov)
    setShowMessage(true);

    // 5 soniyadan keyin avto yopilishi (ixtiyoriy)
    setTimeout(() => {
      setShowMessage(false);
    }, 8000);
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Checkout
      </button>

      {/* Xabar oynasi */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Your order has been sent!
            </h2>
            <p className="text-gray-700 mb-6">
              Please contact the admin to confirm:
            </p>
            <a
              href="https://t.me/your_bot_username" // ← Bu yerga TG bot linkingizni qo'ying
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Contact Admin via Telegram
            </a>
            <button
              onClick={() => setShowMessage(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}