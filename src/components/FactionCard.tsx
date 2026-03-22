import { X, RotateCcw, Globe, Users } from 'lucide-react';
import { Faction } from '../data';

interface FactionCardProps {
  faction: Faction;
  isDismissed: boolean;
  onToggleDismiss: () => void;
}

export function FactionCard({
  faction,
  isDismissed,
  onToggleDismiss,
}: FactionCardProps) {
  const supportersText =
    faction.supporters === 'unknown'
      ? 'לא ידוע'
      : faction.supporters.toLocaleString('he-IL');

  const typeText =
    faction.type === 'official' ? 'קבוצה רשמית' : 'קבוצה עצמאית';

  return (
    <div
      className={`bg-white border-2 rounded-lg p-6 transition-all duration-200 ${
        isDismissed
          ? 'opacity-50 border-gray-200 bg-gray-50'
          : 'border-gray-200 hover:border-primary-400 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {faction.logo && faction.logo.trim().length > 0 && (
            <img src={faction.logo} alt={faction.name} className="h-16 w-24 object-contain" />
          )}
          <div>
            <h3 className="text-xl font-bold text-gray-900">{faction.name}</h3>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                faction.type === 'official'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-secondary-100 text-secondary-700'
              }`}
            >
              {typeText}
            </span>
          </div>
        </div>
        <button
          onClick={onToggleDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={isDismissed ? 'שחזר' : 'הסתר'}
        >
          {isDismissed ? (
            <RotateCcw className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {faction.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <Users className="h-4 w-4" />
        <span>תומכים: {supportersText}</span>
      </div>

      {Object.keys(faction.links).length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Globe className="h-4 w-4" />
          <span>קישורים:</span>
          <div className="flex gap-2">
            {faction.links.website && (
              <a
                href={faction.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                אתר
              </a>
            )}
            {faction.links.facebook && (
              <a
                href={faction.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                פייסבוק
              </a>
            )}
            {faction.links.twitter && (
              <a
                href={faction.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                טוויטר
              </a>
            )}
            {faction.links.instagram && (
              <a
                href={faction.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                אינסטגרם
              </a>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {faction.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
