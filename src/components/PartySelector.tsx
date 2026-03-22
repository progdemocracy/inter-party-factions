import { useNavigate } from 'react-router-dom';
import { parties } from '../data';

export function PartySelector() {
  const navigate = useNavigate();

  const handlePartySelect = (partyId: string) => {
    navigate(`?party=${partyId}`);
  };

const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

    <p className="text-base text-gray-700 leading-relaxed mb-4">    
    הקבוצות הפנימיות במפלגות קיימות <strong className="font-bold">כי הן אפקטיביות</strong>.  
    באמצעות התארגנות משותפת מספר קטן יחסית של חברי מפלגה יכולים להשפיע על הפריימריז הרבה יותר מאשר הצבעה מפוזרת ולא מתואמת. בנוסף יש לקבוצות אלה השפעה רבה על התנהלות ח"כים לאורך כל כהונתם בכנסת, מכיוון שהם מעוניינים להיבחר שוב.
    בוויקיפדיה:     <a     href="https://he.wikipedia.org/wiki/סיעה_פנים-מפלגתית"     target="_blank"     rel="noopener noreferrer"    className="text-inherit no-underline hover:underline"    >סיעה פנים-מפלגתית</a>.
    </p>

    <div className="text-base text-gray-700 leading-relaxed mb-4">
        <p className={isExpanded ? '' : 'hidden md:block'}>
        <strong className="font-bold">טוב לדמוקרטיה</strong>: כל קבוצה שואפת להגדיל את מספר החברים בה, כך שסך כל המתפקדים למפלגות גדל, מה שתורם לדמוקרטיה וממתן את הלחץ של כל קבוצה בנפרד. בנוסף הקבוצות מסיעות לאנשים להתפקד, מוודאות שההתפקדות תקינה, מזכירות ומעודדות ללכת להצביע, וכמובן מסייעות להחליט למי להצביע, ובאופן כללי מעודדות השתתפות במנגנון הדמוקרטי. חברי המפלגה יכולים להצטרף או לעקוב אחר הקבוצות כרצונם, ובסופו של דבר כל אחד מקבל את ההחלטה למי להצביע בפריימריז בעצמו.
        </p>
    </div>
    {!isExpanded && (
    <span       onClick={() => setIsExpanded(true)}      className="md:hidden block text-blue-600 cursor-pointer mt-1 font-semibold hover:underline"    >
      להמשך קריאה...
    </span>
    )}  
    
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 mt-12">
        בחרו מפלגה
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
      
    <p className="text-base text-gray-700 leading-relaxed mt-16">    
      למה דווקא 3 המפלגות האלה? <br />
      כי רק הן קיימו 'פריימריז' לקראת הבחירות האחרונות וגם עברו את אחוז החסימה. 
      כלומר החברים במפלגות האלה השתתפו בבחירות ישירות שקבעו חלק מחברי הכנסת והשרים המכהנים כיום.
    </p>
      
    </div>
  );
}
