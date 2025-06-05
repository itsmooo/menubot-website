import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ChatDialog } from './ChatDialog';

export default function CartSummary() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, proceedToChat, isChatOpen, closeChat } = useCart();

  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 m-4 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
        <h2 className="text-lg font-bold mb-3">Cart Summary</h2>
        
        {/* Cart Items */}
        <div className="max-h-60 overflow-y-auto mb-3">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-2 border-b pb-2">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-2" />
                <div>
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-orange-600 text-sm">{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-500 hover:text-orange-600"
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-orange-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 ml-2"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Checkout */}
        <div className="border-t pt-3">
          <div className="flex justify-between mb-3">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={proceedToChat}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Proceed to Chat ({totalItems} items)
          </button>
        </div>
      </div>

      {/* Chat Dialog */}
      <ChatDialog isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
}
