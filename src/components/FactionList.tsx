import { useState, useMemo } from 'react';
import { FactionCard } from './FactionCard';
import { Faction } from '../data';

interface FactionListProps {
  factions: Faction[];
}

type SortOption = 'supporters' | 'alphabetical';

export function FactionList({ factions }: FactionListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('supporters');
  const [showOfficial, setShowOfficial] = useState(true);
  const [showIndependent, setShowIndependent] = useState(true);
  const [dismissedFactions, setDismissedFactions] = useState<Set<string>>(
    new Set()
  );

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
        if (sortBy === 'supporters') {
          const aSupp =
            a.supporters === 'unknown' ? 0 : (a.supporters as number);
          const bSupp =
            b.supporters === 'unknown' ? 0 : (b.supporters as number);
          return bSupp - aSupp;
        } else {
          return a.name.localeCompare(b.name, 'he');
        }
      });
    };

    return [
      ...sortFactions(activeFactions),
      ...sortFactions(dismissedFactionsList),
    ];
  }, [factions, sortBy, showOfficial, showIndependent, dismissedFactions]);

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
                <span className="text-sm text-gray-700">קבוצות רשמיות</span>
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
    </div>
  );
}
