import { useNavigate } from 'react-router-dom';
import { parties } from '../data';

export function PartySelector() {
  const navigate = useNavigate();

  const handlePartySelect = (partyId: string) => {
    navigate(`?party=${partyId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        אנא בחרו מפלגה
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(parties).map((party) => (
          <button
            key={party.id}
            onClick={() => handlePartySelect(party.id)}
            className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src={party.logo}
                alt={party.name}
                className="h-24 w-24 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {party.name}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
