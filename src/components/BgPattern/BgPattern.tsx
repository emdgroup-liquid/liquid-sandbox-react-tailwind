import AthiniaPattern from './athinia-pattern.svg'

const BgPattern: React.FC = () => (
  <div className="absolute inset-0 flex justify-end bg-neutral-900">
    <img className="h-full object-cover" src={AthiniaPattern} alt="Athinia Pattern" />
  </div>
)

export default BgPattern
