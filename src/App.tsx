import { useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { PartySelector } from './components/PartySelector';
import { FactionList } from './components/FactionList';
import { parties, getFactionsByParty } from './data';

function App() {
  const [searchParams] = useSearchParams();
  const partyId = searchParams.get('party');

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
    </div>
  );
}

export default App;
