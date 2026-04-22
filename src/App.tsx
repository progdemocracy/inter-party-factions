import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartySelector } from './components/PartySelector';
import { FactionList } from './components/FactionList';
import { FactionHomepage } from './components/FactionHomepage';
import { parties, getFactionsByParty } from './data';

function App() {
  const [searchParams] = useSearchParams();
  const queryParty = searchParams.get('party');
  const queryFaction = searchParams.get('faction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryParty]); // scroll to the screen's top every time queryParty in the URL changes

  const selectedParty = queryParty && parties[queryParty] ? parties[queryParty] : null;
  const factions = selectedParty ? getFactionsByParty(selectedParty.id) : [];
  const selectedFaction = queryFaction ? factions.find(f => f.username === queryFaction) : null;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      
      <p className="text-gray-700 mb-4 leading-relaxed">
        queryParty
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed">
        queryFaction
      </p>


      { !selectedFaction && 
        <Header selectedParty={selectedParty} /> 
      }
      
      <main>
          { !selectedParty ? (
            <PartySelector />
          ) : selectedFaction ? (
            <FactionHomepage faction={selectedFaction} />
          ) : (
            <FactionList factions={factions} />
          )}
      </main>
      
      <Footer selectedParty={selectedParty} />
      
    </div>
  );
}

export default App;
