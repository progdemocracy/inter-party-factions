import { Party } from '../data';

interface HeaderProps {
  selectedParty: Party | null;
}

export function Header({ selectedParty }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
      
        <a href="https://www.progdemocracy.com/mitpakdim"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img src="/mitpakdim_logo.png"
            alt="לוגו מתפקדים"
            className="h-16 w-auto"
          />
        </a>

        <a href="https://www.progdemocracy.com/"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img src="/progdemocracy_logo.png"
            alt="לוגו העמותה לדמוקרטיה מתקדמת"
            className="h-16 w-auto"
          />
        </a>

        {!selectedParty && (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-4">
                קבוצות מאורגנות של חברי מפלגה (סיעות פנים-מפלגתיות)
            </h1>
        )}

        {selectedParty && (
          <div className="flex flex-col items-center justify-center mt-1 mb-2 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                הקבוצות המאורגנות
            </h1>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                ב{selectedParty.name2}
            </h1>
            {selectedParty.true_party_name && (
                <h2 className="text-xl md:text-2xl font-bold text-gray-400">
                    {selectedParty.true_party_name}
                </h2>
            )}
          </div>
        )}

        {selectedParty && (
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">					אתר נסיוני בתהליך עבודה!				</h1>
          </div>
		)}

      </div>
    </header>
  );
}
