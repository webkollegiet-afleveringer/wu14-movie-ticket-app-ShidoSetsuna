import { ShieldCheck, Download } from 'lucide-react'

interface ConfirmationPopupProps {
  type: 'payment' | 'download'
  onAction: () => void
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ type, onAction }) => {
  const isPayment = type === 'payment'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative w-full rounded-t-3xl bg-accent backdrop-blur-xl px-6 pt-10 pb-8 flex flex-col items-center gap-4">

        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center -mt-4 absolute -top-8 border-2 border-white">
          {isPayment
            ? <ShieldCheck size={40} className="text-white" />
            : <Download size={40} className="text-white" />
          }
        </div>

        <h2 className="text-text font-bold text-xl text-center">
          {isPayment ? 'Your payment was successful' : 'Your ticket has been downloaded'}
        </h2>

        <p className="text-text text-sm text-center max-w-xs">
          {isPayment
            ? 'Your tickets have been booked. You can view them in your e-ticket section.'
            : 'Check your downloads folder for the e-ticket PDF.'}
        </p>

        <button
          onClick={onAction}
          className="w-full bg-bg text-text font-semibold py-4 rounded-2xl mt-2"
        >
          {isPayment ? 'See E-Ticket' : 'Back To Home'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPopup