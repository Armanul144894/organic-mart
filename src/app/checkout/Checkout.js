'use client';
import React, { useState } from 'react';
import { CreditCard, Truck, Package, Shield, ChevronRight, Home, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Checkout() {
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const cartItems = [
       {
      id: 1,
      name: "Fresh Organic Tomatoes",
      brand: "Fresh Foods",
      price: 45,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=600&fit=crop",
      category: "Vegetables",
    },
    {
      id: 2,
      name: "Fresh Bananas",
      brand: "Fresh Foods",
      price: 60,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop",
      category: "Fruits",
    },
    {
      id: 3,
      name: "Farm Fresh Eggs (12pcs)",
      brand: "Arla Dairy",
      price: 65,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=600&fit=crop",
      category: "Dairy",
    },
    ];

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;
        return (calculateSubtotal() * appliedCoupon.discount) / 100;
    };

    const calculateShipping = () => {
        return calculateSubtotal() > 50 ? 0 : 5.99;
    };

    const calculateTax = () => {
        return (calculateSubtotal() - calculateDiscount()) * 0.08;
    };

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount() + calculateShipping() + calculateTax();
    };

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === 'SAVE10') {
            setAppliedCoupon({ code: 'SAVE10', discount: 10 });
            setCouponCode('');
        } else if (couponCode.toUpperCase() === 'HEALTH20') {
            setAppliedCoupon({ code: 'HEALTH20', discount: 20 });
            setCouponCode('');
        } else {
            alert('Invalid coupon code');
        }
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setCurrentStep(3);
    };

    const handlePlaceOrder = () => {
        alert('Order placed successfully! 🎉');
    };

    return (
        <div className="">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                            <Home size={16} /> Home
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="3" className="hover:text-emerald-600 transition-colors">
                            Cart
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-800 font-semibold">Checkout</span>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="max-w-6xl mx-auto py-5">
                {/* Progress Steps */}
                <div className="mb-8 pt-8">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center">
                            {/* Step 1 */}
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {currentStep > 1 ? <Check size={20} /> : '1'}
                                </div>
                                <span className={`ml-2 font-semibold ${currentStep >= 1 ? 'text-emerald-600' : 'text-gray-500'}`}>
                                    Shipping
                                </span>
                            </div>

                            <div className={`w-16 h-1 mx-2 ${currentStep >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>

                            {/* Step 2 */}
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {currentStep > 2 ? <Check size={20} /> : '2'}
                                </div>
                                <span className={`ml-2 font-semibold ${currentStep >= 2 ? 'text-emerald-600' : 'text-gray-500'}`}>
                                    Payment
                                </span>
                            </div>

                            <div className={`w-16 h-1 mx-2 ${currentStep >= 3 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>

                            {/* Step 3 */}
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {currentStep > 3 ? <Check size={20} /> : '3'}
                                </div>
                                <span className={`ml-2 font-semibold ${currentStep >= 3 ? 'text-emerald-600' : 'text-gray-500'}`}>
                                    Review
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Step 1: Shipping Information */}
                {currentStep === 1 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Truck className="text-emerald-600" size={28} />
                            <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                        </div>

                        <form onSubmit={handleShippingSubmit}>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.firstName}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.lastName}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={shippingInfo.email}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={shippingInfo.phone}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingInfo.address}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                    placeholder="123 Main Street, Apt 4B"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.city}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="New York"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.state}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="NY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        ZIP Code *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.zipCode}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="10001"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Country *
                                </label>
                                <select
                                    value={shippingInfo.country}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    <option>Australia</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
                            >
                                Continue to Payment
                                <ChevronRight size={20} />
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Payment Information */}
                {currentStep === 2 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="text-emerald-600" size={28} />
                            <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`p-4 border-2 rounded-lg transition ${paymentMethod === 'card' ? 'border-secondary bg-teal-50' : 'border-gray-300'
                                    }`}
                            >
                                <CreditCard className="mx-auto mb-2 text-emerald-600" size={32} />
                                <p className="font-semibold text-gray-800">Credit Card</p>
                            </button>
                            <button
                                onClick={() => setPaymentMethod('paypal')}
                                className={`p-4 border-2 rounded-lg transition ${paymentMethod === 'paypal' ? 'border-secondary bg-teal-50' : 'border-gray-300'
                                    }`}
                            >
                                <div className="w-8 h-8 bg-emerald-600 rounded mx-auto mb-2"></div>
                                <p className="font-semibold text-gray-800">PayPal</p>
                            </button>
                            <button
                                onClick={() => setPaymentMethod('cod')}
                                className={`p-4 border-2 rounded-lg transition ${paymentMethod === 'cod' ? 'border-secondary bg-teal-50' : 'border-gray-300'
                                    }`}
                            >
                                <Package className="mx-auto mb-2 text-emerald-600" size={32} />
                                <p className="font-semibold text-gray-800">Cash on Delivery</p>
                            </button>
                        </div>

                        {paymentMethod === 'card' && (
                            <form onSubmit={handlePaymentSubmit}>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Card Number *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={paymentInfo.cardNumber}
                                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Cardholder Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={paymentInfo.cardName}
                                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Expiry Date *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={paymentInfo.expiryDate}
                                            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            CVV *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={paymentInfo.cvv}
                                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                            placeholder="123"
                                            maxLength="4"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(1)}
                                        className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                                    >
                                        Back to Shipping
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
                                    >
                                        Review Order
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </form>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
                                    <p className="text-blue-800 mb-4">You will be redirected to PayPal to complete your payment.</p>
                                    <div className="w-32 h-12 bg-emerald-600 rounded mx-auto mb-2"></div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                                    >
                                        Back to Shipping
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex-1 bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-secondary transition"
                                    >
                                        Continue with PayPal
                                    </button>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'cod' && (
                            <div>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                                    <h3 className="font-semibold text-gray-800 mb-2">Cash on Delivery</h3>
                                    <p className="text-gray-600 text-sm">
                                        You will pay for your order when it is delivered to your address. Please keep exact change ready.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                                    >
                                        Back to Shipping
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex-1 bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-secondary transition"
                                    >
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Review & Confirm */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        {/* Shipping Address Review */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="text-emerald-600 font-semibold hover:text-secondary"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="text-gray-600">
                                <p className="font-semibold text-gray-800">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                                <p>{shippingInfo.address}</p>
                                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                                <p>{shippingInfo.country}</p>
                                <p className="mt-2">{shippingInfo.email}</p>
                                <p>{shippingInfo.phone}</p>
                            </div>
                        </div>

                        {/* Payment Method Review */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Payment Method</h3>
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="text-emerald-600 font-semibold hover:text-secondary"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                {paymentMethod === 'card' && (
                                    <>
                                        <CreditCard className="text-emerald-600" size={24} />
                                        <span className="text-gray-600">Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</span>
                                    </>
                                )}
                                {paymentMethod === 'paypal' && (
                                    <>
                                        <div className="w-6 h-6 bg-emerald-600 rounded"></div>
                                        <span className="text-gray-600">PayPal</span>
                                    </>
                                )}
                                {paymentMethod === 'cod' && (
                                    <>
                                        <Package className="text-emerald-600" size={24} />
                                        <span className="text-gray-600">Cash on Delivery</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Order Items Review */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Items</h3>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                            >
                                Back to Payment
                            </button>
                            <button
                                onClick={handlePlaceOrder}
                                className="flex-1 bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2"
                            >
                                <Shield size={20} />
                                Place Order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

