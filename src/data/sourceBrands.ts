export type SourceBrand = {
  favicon?: string;
  family?: 'plymouth';
};

export const sourceBrands: Readonly<Record<string, SourceBrand>> = {
  'plymouth-primo': { favicon: '/brand/favicons/plymouth-primo.png' },
  'plymouth-referencing': { family: 'plymouth' },
  'plymouth-subject-guides': { family: 'plymouth' },
  'cite-them-right': {},
  'google-scholar': { favicon: '/brand/favicons/google-scholar.png' },
  crossref: { favicon: '/brand/favicons/crossref.png' },
  openalex: { favicon: '/brand/favicons/openalex.png' },
  doaj: { favicon: '/brand/favicons/doaj.png' },
  jstor: { favicon: '/brand/favicons/jstor.png' },
  ons: { favicon: '/brand/favicons/ons.ico' },
  'uk-data-service': { favicon: '/brand/favicons/uk-data-service.jpeg' },
  'data-gov-uk': { favicon: '/brand/favicons/data-gov-uk.png' },
  'geoportal-ons': {},
  osgb: { favicon: '/brand/favicons/ordnance-survey.ico' },
  openstreetmap: { favicon: '/brand/favicons/openstreetmap.png' },
  qgis: { favicon: '/brand/favicons/qgis.png' },
  'natural-earth': { favicon: '/brand/favicons/natural-earth.png' },
  'met-office': { favicon: '/brand/favicons/met-office.png' },
  'uk-climate-maps-data': { favicon: '/brand/favicons/met-office.png' },
  'copernicus-cds': { favicon: '/brand/favicons/copernicus-cds.ico' },
  ceh: { favicon: '/brand/favicons/ceh.ico' },
  'quality-info': { family: 'plymouth' },
  'search-strategy': { family: 'plymouth' },
  endnote: { family: 'plymouth' },
};
