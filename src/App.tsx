import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartySelector } from './components/PartySelector';
import { FactionList } from './components/FactionList';
import { FactionHomepage } from './components/FactionHomepage';
import { parties, getFactionsByParty } from './data';

interface AppProps {
  partyId: string | null;
}

function App({ partyId }: AppProps) {
  // Read the ?faction= parameter natively from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const queryFaction = searchParams.get('faction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [partyId]);   // scroll to the screen's top every time queryParty in the URL changes

  const selectedParty = partyId && parties[partyId] ? parties[partyId] : null;
  const factions = selectedParty ? getFactionsByParty(selectedParty.id) : [];
  const selectedFaction = queryFaction ? factions.find(f => f.username === queryFaction) : null;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      { !selectedFaction && 
        <Header selectedParty={selectedParty} /> 
      }
      
      <main>
          { !selectedParty ? (
            <PartySelector />
          ) : selectedFaction ? (
            <FactionHomepage faction={selectedFaction} party={selectedParty}/>
          ) : (
            <FactionList key={selectedParty.id} factions={factions} />
          )}
      </main>
      
      <Footer selectedParty={selectedParty} selectedFaction={selectedFaction} />
    </div>
  );
}

export default App;