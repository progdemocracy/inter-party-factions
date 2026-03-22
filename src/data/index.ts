import likudParty from './parties/likud.json';
import democratsParty from './parties/democrats.json';
import zionutdatitParty from './parties/zionutdatit.json';

import likud001 from './factions/likud-001.json';
import likud002 from './factions/likud-002.json';
import likud003 from './factions/likud-003.json';
import likud004 from './factions/likud-004.json';

import democrats001 from './factions/democrats-001.json';
import democrats002 from './factions/democrats-002.json';
import democrats003 from './factions/democrats-003.json';
import democrats004 from './factions/democrats-004.json';

import zionutdatit001 from './factions/zionutdatit-001.json';
import zionutdatit002 from './factions/zionutdatit-002.json';


export interface Party {
  id: string;
  name: string;
  logo: string;
}

export interface Faction {
  id: string;
  party: string;
  name: string;
  logo: string;
  description: string;
  links: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  supporters: number | 'unknown';
  tags: string[];
  type: 'official' | 'independent';
}

export const parties: Record<string, Party> = {
  likud: likudParty as Party,
  democrats: democratsParty as Party,
  zionutdatit: zionutdatitParty as Party,
};

export const allFactions: Faction[] = [
  likud001,
  likud002,
  likud003,
  likud004,
  democrats001,
  democrats002,
  democrats003,
  democrats004,
  zionutdatit001,
  zionutdatit002,
] as Faction[];

export const getFactionsByParty = (partyId: string): Faction[] => {
  return allFactions.filter((faction) => faction.party === partyId);
};
