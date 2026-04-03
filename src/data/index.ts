import likudParty from './parties/likud.json';
import democratsParty from './parties/democrats.json';
import zionutdatitParty from './parties/zionutdatit.json';

import likud001 from './factions/likud-001.json';
import likud002 from './factions/likud-002.json';
import likud003 from './factions/likud-003.json';
import likud004 from './factions/likud-004.json';
import likud005 from './factions/likud-005.json';
import likud006 from './factions/likud-006.json';
import likud007 from './factions/likud-007.json';
import likud008 from './factions/likud-008.json';
import likud009 from './factions/likud-009.json';
import likud010 from './factions/likud-010.json';
import likud011 from './factions/likud-011.json';
import likud012 from './factions/likud-012.json';
import likud013 from './factions/likud-013.json';
import likud014 from './factions/likud-014.json';
import likud015 from './factions/likud-015.json';
import likud016 from './factions/likud-016.json';
import likud017 from './factions/likud-017.json';

import democrats001 from './factions/democrats-001.json';
import democrats002 from './factions/democrats-002.json';
import democrats003 from './factions/democrats-003.json';
import democrats004 from './factions/democrats-004.json';
import democrats005 from './factions/democrats-005.json';
import democrats006 from './factions/democrats-006.json';
import democrats007 from './factions/democrats-007.json';
import democrats008 from './factions/democrats-008.json';

import zionutdatit001 from './factions/zionutdatit-001.json';
import zionutdatit002 from './factions/zionutdatit-002.json';
import zionutdatit003 from './factions/zionutdatit-003.json';


export interface Party {
  id: string;
  name: string;
  name2: string;
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
  likud005,
  likud006,
  likud007,
  likud008,
  likud009,
  likud010,
  likud011,
  likud012,
  likud013,
  likud014,
  likud015,
  likud016,
  likud017,  
  democrats001,
  democrats002,
  democrats003,
  democrats004,
  democrats005,
  democrats006,
  democrats007,
  democrats008,
  zionutdatit001,
  zionutdatit002,
  zionutdatit003,
] as Faction[];

export const getFactionsByParty = (partyId: string): Faction[] => {
  return allFactions.filter((faction) => faction.party === partyId);
};
