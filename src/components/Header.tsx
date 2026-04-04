import { Party } from '../data';

interface HeaderProps {
  selectedParty: Party | null;
}

export function Header({ selectedParty }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <a
          href="https://www.progdemocracy.com/mitpakdim"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img
            src="https://static.wixstatic.com/media/354971_81d6ab5a94a54dc585a58854cef02fe2~mv2.png/v1/fill/w_264,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%9E%D7%AA%D7%A4%D7%A7%D7%93%D7%99%D7%9D%20-%20%D7%9C%D7%95%D7%92%D7%95%20%D7%A0%D7%A7%D7%99.png"
            alt="מתפקדים"
            className="h-16 w-auto"
          />
        </a>

        {!selectedParty && (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-4">
                קבוצות מאורגנות של חברי מפלגה (סיעות פנים-מפלגתיות)
            </h1>
        )}

        {selectedParty && (
          <div className="flex flex-col items-center justify-center mt-1 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                הקבוצות המאורגנות
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                ב{selectedParty.name2}
            </h2>
            <img
              src={selectedParty.logo}
              alt={selectedParty.name}
              className="w-44 h-auto max-h-28 object-contain"
            />           
          </div>
        )}

        {selectedParty && (
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">					אתר נסיוני בתהליך עבודה!				</h1>
          </div>
		)}

      </div>
    </header>
  );
}
