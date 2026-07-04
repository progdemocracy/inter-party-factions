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

  // Check if we are using one of the "the-<party>-faction" pages (Faction Homepages)
  const isFactionHomepageURL = window.location.pathname.includes('-faction');

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
            /* Party Select page */
            <PartySelector />
          ) : selectedFaction ? (
            /* Faction Homepage */
            <FactionHomepage faction={selectedFaction} party={selectedParty}/>
          ) : isFactionHomepageURL ? (
            /* Faction Homepage URL with no faction URL param specified should not happen */
            <div className="max-w-4xl mx-auto px-4 py-24 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                לא נבחרה סיעה
              </h2>
            </div>
          ) : (
            /* Faction List */
            <FactionList key={selectedParty.id} factions={factions} />
          )}
      </main>
      
      <Footer selectedParty={selectedParty} selectedFaction={selectedFaction} />
    </div>
  );
}

export default App;