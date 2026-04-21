import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartySelector } from './components/PartySelector';
import { FactionList } from './components/FactionList';
import { parties, getFactionsByParty } from './data';

function App() {
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('party');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [partyId]); // scroll to the screen's top every time the partyId in the URL changes

  const selectedParty = partyId && parties[partyId] ? parties[partyId] : null;
  const factions = selectedParty ? getFactionsByParty(selectedParty.id) : [];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header selectedParty={selectedParty} />
      <main>
        {selectedParty ? (
          <FactionList factions={factions} />
        ) : (
          <PartySelector />
        )}
      </main>
      <Footer selectedParty={selectedParty} />
    </div>
  );
}

export default App;
