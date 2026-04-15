import { useState } from "react";

const FormPayment: React.FC = () => {
    const [email, setEmail] = useState('Milesmorales@gmail.com')
    const [cardholderName, setCardholderName] = useState('Miles Morales')
    const [cardNumber, setCardNumber] = useState('**** **** **** 51446')
    const [expDate, setExpDate] = useState('11/25')
    const [cvv, setCvv] = useState('123')

    const inputClass = 'w-full bg-bg rounded-xl px-4 py-3 border border-stroke text-text text-sm outline-none focus:border-accent'

  return (
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-text-secondary text-sm mb-1 block">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm mb-1 block">Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={e => setCardholderName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm mb-1 block">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-text-secondary text-sm mb-1 block">Date</label>
              <input
                type="text"
                value={expDate}
                onChange={e => setExpDate(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className="text-text-secondary text-sm mb-1 block">CVV</label>
              <input
                type="text"
                inputMode="numeric"
                value={cvv}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 3)
                  setCvv(v)
                }}
                maxLength={3}
                className={inputClass}
              />
            </div>
          </div>
        </form>
  );
};

export default FormPayment;