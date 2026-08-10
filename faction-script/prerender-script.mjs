import fs from 'fs';
import path from 'path';

// Party mapping configuration: template paths and target output folders in dist
const PARTY_CONFIG = {
  'democrats': {
    templateFile: './faction-script/democrats-template.html',
    distFolder: 'faction-democrats'
  },
  'likud': {
    templateFile: './faction-script/likud-template.html',
    distFolder: 'faction-likud'
  },
  'zionutdatit': {
    templateFile: './faction-script/zionutdatit-template.html',
    distFolder: 'faction-zionutdatit'
  }
};

const DOMAIN = 'https://mitpakdim.progdemocracy.com';
const FACTIONS_DIR = './src/data/factions';
const DIST_DIR = './dist';

// Check if the factions directory exists
if (!fs.existsSync(FACTIONS_DIR)) {
  console.error(`Error: Directory ${FACTIONS_DIR} not found.`);
  process.exit(1);
}

// Read all JSON files in the factions folder
const files = fs.readdirSync(FACTIONS_DIR).filter(file => file.endsWith('.json'));

let generatedCount = 0;
let sitemapUrls = [];

files.forEach(file => {
  const filePath = path.join(FACTIONS_DIR, file);
  const rawData = fs.readFileSync(filePath, 'utf8');
  
  let faction;
  try {
    faction = JSON.parse(rawData);
  } catch (err) {
    console.error(`Error parsing JSON in file: ${file}`);
    return;
  }

  // Extract party prefix from filename (e.g., "democrats" from "democrats-003.json")
  const partyPrefix = file.split('-')[0];
  const config = PARTY_CONFIG[partyPrefix];

  if (!config) {
    console.warn(`No configuration found for party prefix: ${partyPrefix} (file: ${file})`);
    return;
  }

  if (!fs.existsSync(config.templateFile)) {
    console.warn(`Template file not found: ${config.templateFile}`);
    return;
  }

  // Load the party HTML template from faction-script
  let pageHtml = fs.readFileSync(config.templateFile, 'utf8');

  // Faction identifier
  const factionId = faction.id || faction.slug || file.replace('.json', '');
  const pageUrl = `${DOMAIN}/${config.distFolder}/${factionId}/`;

  // SEO text data
  const title = `${faction.name} - Organized Factions | Mitpakdim`;
  const description = faction.description
    ? faction.description.replace(/"/g, '&quot;').substring(0, 155)
    : `מידע אודות הקבוצה ${faction.name} `;

  // Replace placeholders in template
  pageHtml = pageHtml
    .replaceAll('{{TITLE}}', title)
    .replaceAll('{{DESCRIPTION}}', description)
    .replaceAll('{{FACTION_ID}}', factionId)
    .replaceAll('{{URL}}', pageUrl);

  // Create target directory inside dist (e.g., dist/faction-democrats/democrats-003)
  const outputDir = path.join(DIST_DIR, config.distFolder, factionId);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save the static index.html file for the faction
  fs.writeFileSync(path.join(outputDir, 'index.html'), pageHtml);
  generatedCount++;
  sitemapUrls.push(pageUrl);
});

console.log(`Prerender completed! Successfully generated ${generatedCount} static pages in dist.`);

