import { Faction } from '../data';
import { FactionCard } from './FactionCard';

interface FactionHomepageProps {
  faction: Faction;
}

export function FactionHomepage({ faction }: FactionHomepageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center">
      
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          מידע על {faction.name}
        </h2>
        
        <div className="w-full max-w-2xl">
          <FactionCard
            faction={faction}
            isDismissed={false} // Hardcoded
            onToggleDismiss={() => {}} // Empty function as it's not needed
          />
        </div>

      </div>
    </div>
  );
}