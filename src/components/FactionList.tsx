import { useState, useMemo } from 'react';
import { FactionCard } from './FactionCard';
import { Faction } from '../data';

interface FactionListProps {
  factions: Faction[];
}

type SortOption = 'random' | 'supporters' | 'alphabetical';

export function FactionList({ factions }: FactionListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('random');
  const [showOfficial, setShowOfficial] = useState(true);
  const [showIndependent, setShowIndependent] = useState(true);
  const [dismissedFactions, setDismissedFactions] = useState<Set<string>>(
    new Set()
  );

  // Assign a stable random weight to each faction based on its ID (changes with every refresh / session).
  // This prevents the list from reshuffling when users toggle filters.
  const randomWeights = useMemo(() => {
    const weights: Record<string, number> = {};
    factions.forEach(f => {
      weights[f.id] = Math.random();
    });
    return weights;
  }, [factions]);

  const toggleDismiss = (factionId: string) => {
    setDismissedFactions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(factionId)) {
        newSet.delete(factionId);
      } else {
        newSet.add(factionId);
      }
      return newSet;
    });
  };

  const sortedAndFilteredFactions = useMemo(() => {
    let filtered = factions.filter((faction) => {
      if (!showOfficial && faction.type === 'official') return false;
      if (!showIndependent && faction.type === 'independent') return false;
      return true;
    });

    const activeFactions = filtered.filter(
      (faction) => !dismissedFactions.has(faction.id)
    );
    const dismissedFactionsList = filtered.filter((faction) =>
      dismissedFactions.has(faction.id)
    );

    const sortFactions = (list: Faction[]) => {
      return [...list].sort((a, b) => {
        if (sortBy === 'random') {
          return randomWeights[a.id] - randomWeights[b.id];
        }
        if (sortBy === 'supporters') {
          const aSupp = a.supporters === 'unknown' ? 0 : (a.supporters as number);
          const bSupp = b.supporters === 'unknown' ? 0 : (b.supporters as number);
          if (aSupp === bSupp) {  //  If supporters are equal, use random weights
            return randomWeights[a.id] - randomWeights[b.id];
          } else {
            return bSupp - aSupp;
          }
        }
        if (sortBy === 'alphabetical') {
          return a.name.localeCompare(b.name, 'he');
        }
      });
    };

    return [
      ...sortFactions(activeFactions),
      ...sortFactions(dismissedFactionsList),
    ];
  }, [factions, sortBy, showOfficial, showIndependent, dismissedFactions, randomWeights]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              מיון לפי:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="random">אקראי</option>
              <option value="supporters">מספר תומכים</option>
              <option value="alphabetical">סדר אלפביתי</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              סינון לפי סוג:
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOfficial}
                  onChange={(e) => setShowOfficial(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">קבוצות רשמיות (מטעם המפלגה)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIndependent}
                  onChange={(e) => setShowIndependent(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">קבוצות עצמאיות</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAndFilteredFactions.map((faction) => (
          <FactionCard
            key={faction.id}
            faction={faction}
            isDismissed={dismissedFactions.has(faction.id)}
            onToggleDismiss={() => toggleDismiss(faction.id)}
          />
        ))}
      </div>

      {sortedAndFilteredFactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            לא נמצאו קבוצות בהתאם לסינון שנבחר
          </p>
        </div>
      )}
	
	  <h2 className="mt-16 text-lg font-semibold text-center text-gray-800 mb-6">
		<a     href="https://www.progdemocracy.com/contact-us"     target="_blank"     rel="noopener noreferrer"    className="hover:text-blue-600 transition-colors"  >
			מצאת טעות? יש לך הצעה או שאלה? צרו קשר!
		</a>
      </h2>
	
    </div>
  );
}
