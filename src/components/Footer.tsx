import { Party } from '../data';

interface FooterProps {
  selectedParty: Party | null;
}

function PartyBanner({ selectedParty }: { selectedParty: Party }) {
  return (
    <footer className="max-w-7xl mx-auto px-4 py-8">

      <div id="footer-explanation"></div>
      
      <p className="mt-6 font-semibold text-gray-800">
            הסברים והבהרות לגבי המידע המוצג
      </p>
    
    <div className="text-right mt-4 space-y-4 text-gray-800 text-base font-normal [&_p]:mt-0">
    
      <p>    
        בדף זה מוצגות קבוצות מאורגנות של חברי המפלגה (סיעות פנים-מפלגתיות). קבוצות אלה הן חלק מהדמוקרטיה הישראלית, ויש להן השפעה רבה. הרעיון פשוט: באמצעות התארגנות ופעולה מתואמת, מספר קטן יחסית של חברי מפלגה יכולים להשפיע על תוצאות הבחירות הפנימיות הרבה מעבר להצבעה מפוזרת. בנוסף, לקבוצות אלה יש השפעה על התנהלות ח"כים ושרים לאורך כל תקופת כהונתם, מכיוון שהם מעוניינים להיבחר שוב.
      </p>

      <p>
        המידע מוצג כשירות לציבור במטרה להנגיש ולהשקיף את כלל הקבוצות המאורגנות במפלגה, ללא הטיה כזו או אחרת, והוא מבוסס על מידע פומבי ועל משוב שמתקבל מהציבור.
      </p>

      <p>
      מי מוצג בדף? קבוצות מטעם המפלגה הן אלו שמוזכרות בפרסומים פומביים של המפלגה. קבוצות עצמאיות הן אלו ש (1) קוראות להתפקדות או להשפעה של חברי מפלגה (2) מפעילות אתר אינטרנט או פועלות בפומבי ברשתות חברתיות, ו (3) יש אינדיקציה לפעילותן בשנתיים האחרונות. קבוצות לא-פורמליות הן כל שאר הקבוצות הפעילות במפלגה, כפי שניתן ללמוד עליהן בפומבי מפרסומים בכלי התקשורת.
      </p>

      <p>
      הופעה של קבוצה בדף זה לא מעידה על תמיכה של העמותה לדמוקרטיה מתקדמת בפעילותה, וגם להיפך - הופעה של קבוצה בדף זה לא מעידה על תמיכה שלה בעמותה לדמוקרטיה מתקדמת ואף לא על קשר או שיתוף פעולה כלשהו ביניהן. כל קבוצה המופיעה בדף זה עומדת בפני עצמה, ללא שהדבר מעיד על קשר בינה לבין קבוצות אחרות.
      </p>
    
      <p>
        נציגים של קבוצות המופיעות ברשימה אשר מעוניינים לעדכן פרטים, לשנות את אופן ההצגה, להודיע על הפסקת פעילות הקבוצה, או בכל נושא אחר, מוזמנים 
        {' '}
        <a href="https://www.progdemocracy.com/contact-us" 
          rel="noopener noreferrer" 
          className="hover:text-blue-600 transition-colors underline"
        >
        ליצור עימנו קשר
        </a>.
      </p>      
     </div>


      <p className="text-lg font-semibold text-center text-gray-800 mt-12">
        <a href={`https://www.progdemocracy.com/mitpakdim-${selectedParty.id}`} 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <span>חזרה לדף המידע על</span>
          <img 
            src={selectedParty.logo} 
            alt={`לוגו ${selectedParty.name}`} 
            className="h-12 w-auto object-contain" 
          />            
        </a>
      </p>
    
    
      <p className="mt-8 text-lg font-normal text-center text-gray-800">
        אנו מתאמצים להביא את המידע המקיף והמדויק ביותר, אך יתכן שנפלו טעויות בתום לב
      </p>

      <p className="mt-3 text-lg font-semibold text-center text-gray-800 mb-5">
        <a href="https://www.progdemocracy.com/contact-us" 
          rel="noopener noreferrer" 
          className="hover:text-blue-600 transition-colors"
        >
          מצאת טעות? יש לך הצעה או שאלה? לחצו ליצירת קשר!
        </a>
      </p>
      
    </footer>
  );
}


function BottomBanner() {
  return (
    <div className="bg-[#1B8AA7] text-white py-6 w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-around items-center gap-6 md:gap-0">
    
        <div className="text-center">
          <p className="text-sm font-medium">
            © העמותה לדמוקרטיה מתקדמת
          </p>
        </div>

        <div className="text-center">
          <a href="https://www.progdemocracy.com/accessibility-statement" rel="noopener noreferrer"  className="text-sm font-medium hover:underline transition-all">
            הצהרת נגישות
          </a>
        </div>

        <div className="text-center">
          <a href="https://www.progdemocracy.com/contact-us" rel="noopener noreferrer"  className="text-sm font-medium hover:underline transition-all">
            צרו קשר
          </a>
        </div>

      </div>
    </div>
  );
}



export function Footer({ selectedParty }: FooterProps) {
    return (
    <>
    { selectedParty && <PartyBanner selectedParty={selectedParty} /> }
    
    <BottomBanner />
    </>   
  );
}