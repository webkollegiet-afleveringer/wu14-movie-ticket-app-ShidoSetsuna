const PaymentCard: React.FC = () => {
  return (
        <div className="bg-linear-to-br from-accent to-accent/70 rounded-2xl p-5 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
          <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 -ml-3" />
        </div>
        <div className="text-right">
          <p className="text-white/70 text-xs">Balance</p>
          <p className="text-white font-bold text-lg">$120,580.00</p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-white/60 text-xs">Card Holder</p>
          <p className="text-white font-semibold text-sm">Miles Morales</p>
        </div>
        <p className="text-white/80 text-sm">**** **** **** 51446</p>
      </div>
    </div>
  )
};

export default PaymentCard;
