We use Prerendering a.k.a. SSG (Static Site Generation) to create the single-faction pages during build.

Once ready, we will update the links from the main file and remove the old homepage files.

my-project/
├── faction-script/
│   ├── prerender-script.mjs
│   ├── democrats-template.html
│   ├── likud-template.html
│   └── zionutdatit-template.html
├── src/
│   └── data/
│       └── factions/
│           ├── democrats-baot.json
│           ├── democrats-dor.json
│           └── likud-zion.json
└── dist/ (נוצר אחרי build)


tip:
append to the prerender script this code to automatically generate `sitemap.xml`:
```
if (sitemapUrls.length > 0) {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  sitemapUrls.forEach(url => {
    sitemapXml += `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n`;
  });
  sitemapXml += `</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
  console.log('sitemap.xml file generated successfully!');
}
```