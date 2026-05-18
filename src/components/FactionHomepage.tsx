import { Faction, Party } from '../data';
import { FactionCard } from './FactionCard';

interface FactionHomepageProps {
  faction: Faction;
  party: Party;
}

export function FactionHomepage({ faction, party }: FactionHomepageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Load font (כתב יד בעברית) */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playpen+Sans+Hebrew:wght@500&display=swap');`}
      </style>

      <div className="flex flex-col items-center">
      
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {faction.name}
        </h1>

        <h2 className="text-2xl text-gray-800 mb-4 text-center font-['Playpen_Sans_Hebrew'] font-normal">
          הבית שלך ב{party.name2}
        </h2>
        
        {faction.logo && faction.logo.trim().length > 0 && (
            <div className="flex items-center gap-3 mb-4">
                <img src={faction.logo} alt={faction.name} className="h-32 w-48 object-contain" />
            </div>
        )}
        
        <div className="w-full max-w-2xl">
          <FactionCard
            faction={faction}
            isDismissed={false} // Hardcoded
            onToggleDismiss={() => {}} // Empty function as it's not needed
            isHomepage={true} // Hardcoded
          />
        </div>

      </div>
    </div>
  );
}