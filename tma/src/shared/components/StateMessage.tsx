interface StateMessageProps {
  title: string;
  description: string;
}

const StateMessage = ({title, description}: StateMessageProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
    <div className="max-w-md rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-xl backdrop-blur">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  </div>
);

export default StateMessage;
