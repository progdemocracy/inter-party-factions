import { Party } from '../data';

interface FooterProps {
  selectedParty: Party | null;
}

export function Footer({ selectedParty }: FooterProps) {
  // If no party is selected, the footer is empty
  if (!selectedParty) return null;

  return (
    <footer className="max-w-7xl mx-auto px-4 py-8">
    
      {/* Dynamic Link and Logo Section */}
      <p className="mt-16 text-lg font-normal text-center text-gray-800">
        <a href={`https://www.progdemocracy.com/mitpakdim-${selectedParty.id}`} 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <span>חזרה לדף המידע</span>
          <img 
            src={selectedParty.logo} 
            alt={`לוגו ${selectedParty.name}`} 
            className="h-12 w-auto object-contain" 
          />            
        </a>
      </p>

      <p className="mt-16 text-lg font-normal text-center text-gray-800">
        התאמצנו להביא את המידע המקיף והמדויק ביותר, אך יתכן שנפלו טעויות בתום לב.
      </p>

      <p className="mt-3 text-lg font-semibold text-center text-gray-800 mb-5">
        <a href="https://www.progdemocracy.com/contact-us" 
          rel="noopener noreferrer" 
          className="hover:text-blue-600 transition-colors"
        >
          מצאת טעות? יש לך הצעה או שאלה? צרו קשר!
        </a>
      </p>
      
              

     
      
    </footer>
  );
}