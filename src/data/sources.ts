const sourceCategoryNames = [
  'All',
  'Plymouth',
  'Academic search',
  'UK data',
  'Maps & GIS',
  'Climate & environment',
  'Reference & quality',
] as const;

export type SourceCategory = Exclude<(typeof sourceCategoryNames)[number], 'All'>;

// FilterBar consumes a mutable string[]; keep the public list mutable while
// deriving the narrower category type from the single source above.
export const sourceCategories: Array<'All' | SourceCategory> = [...sourceCategoryNames];
export type SourceAccess = 'Free' | 'Plymouth login' | 'Free account' | 'Terms apply';

export type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: SourceCategory;
  access: SourceAccess;
  useFor: string;
  tags: readonly string[];
};

export const featuredSourceIds: readonly string[] = [
  'plymouth-primo',
  'plymouth-referencing',
  'plymouth-subject-guides',
  'cite-them-right',
  'google-scholar',
  'ons',
];

export const sources: readonly Source[] = [
  {
    id: 'plymouth-primo',
    name: 'Plymouth Library Search (Primo)',
    description: 'Search the University catalogue, books, articles, and other resources available through Plymouth.',
    url: 'https://primo.plymouth.ac.uk/nde/search?vid=44PLY_INST%3AUoP_NDE&lang=en&sortby=rank',
    category: 'Plymouth',
    access: 'Plymouth login',
    useFor: 'Finding readings and checking what the University has access to',
    tags: ['library', 'books', 'articles', 'databases'],
  },
  {
    id: 'plymouth-referencing',
    name: 'Plymouth Referencing Guide',
    description: 'University guidance on referencing, including style guides, citation support, and links to related skills.',
    url: 'https://plymouth.libguides.com/searchingandreferencing/referencing',
    category: 'Plymouth',
    access: 'Free',
    useFor: 'Checking the University’s referencing expectations and finding style guidance',
    tags: ['referencing', 'Harvard', 'EndNote', 'plagiarism'],
  },
  {
    id: 'plymouth-subject-guides',
    name: 'Plymouth Subject Guides',
    description: 'Subject-specific resource lists from the Library, including Geography, Earth and Environment Science.',
    url: 'https://plymouth.libguides.com/',
    category: 'Plymouth',
    access: 'Free',
    useFor: 'Finding Geography-specific databases, journals, and skills guides',
    tags: ['geography', 'subject guide', 'resources'],
  },
  {
    id: 'cite-them-right',
    name: 'Cite Them Right',
    description: 'A guided reference guide with examples of Harvard and other styles. Plymouth links to an authenticated copy for students.',
    url: 'https://www.citethemrightonline.com/',
    category: 'Reference & quality',
    access: 'Free',
    useFor: 'Checking how to reference a book, article, website, report, or dataset',
    tags: ['citation', 'Harvard', 'bibliography'],
  },
  {
    id: 'google-scholar',
    name: 'Google Scholar',
    description: 'A broad academic search engine useful for finding papers, authors, citations, and related work.',
    url: 'https://scholar.google.com/',
    category: 'Academic search',
    access: 'Free',
    useFor: 'Finding scholarly articles and checking who cites a paper',
    tags: ['articles', 'papers', 'citations', 'authors'],
  },
  {
    id: 'crossref',
    name: 'Crossref Search',
    description: 'Search DOI metadata and official publication details for journal articles and other registered works.',
    url: 'https://search.crossref.org/',
    category: 'Academic search',
    access: 'Free',
    useFor: 'Finding a DOI and checking author, title, journal, and publication details',
    tags: ['DOI', 'metadata', 'articles'],
  },
  {
    id: 'openalex',
    name: 'OpenAlex',
    description: 'An open index of scholarly works, authors, institutions, citations, and concepts.',
    url: 'https://openalex.org/',
    category: 'Academic search',
    access: 'Free',
    useFor: 'Exploring open citation networks and finding related research',
    tags: ['open research', 'citations', 'authors'],
  },
  {
    id: 'doaj',
    name: 'DOAJ',
    description: 'A directory of open-access journals and articles across many subjects.',
    url: 'https://doaj.org/',
    category: 'Academic search',
    access: 'Free',
    useFor: 'Finding legally open-access journal articles',
    tags: ['open access', 'journals', 'articles'],
  },
  {
    id: 'jstor',
    name: 'JSTOR',
    description: 'A large digital library of journals, books, and primary sources; access can depend on your institution.',
    url: 'https://www.jstor.org/',
    category: 'Academic search',
    access: 'Terms apply',
    useFor: 'Finding journal articles, books, and historical material',
    tags: ['journals', 'books', 'history', 'archives'],
  },
  {
    id: 'ons',
    name: 'Office for National Statistics',
    description: 'UK demographic, economic, social, and geographic statistics with downloadable tables and datasets.',
    url: 'https://www.ons.gov.uk/',
    category: 'UK data',
    access: 'Free',
    useFor: 'Population, census, migration, deprivation, and UK social patterns',
    tags: ['census', 'population', 'statistics', 'UK'],
  },
  {
    id: 'uk-data-service',
    name: 'UK Data Service',
    description: 'A repository of social, economic, and population datasets for research and teaching.',
    url: 'https://ukdataservice.ac.uk/',
    category: 'UK data',
    access: 'Free account',
    useFor: 'Finding and documenting large UK research datasets',
    tags: ['datasets', 'social science', 'research data'],
  },
  {
    id: 'data-gov-uk',
    name: 'data.gov.uk',
    description: 'The UK government’s catalogue of open datasets and data services.',
    url: 'https://data.gov.uk/',
    category: 'UK data',
    access: 'Free',
    useFor: 'Finding UK government, local, transport, environment, and demographic data',
    tags: ['open data', 'government', 'datasets'],
  },
  {
    id: 'geoportal-ons',
    name: 'ONS Geoportal',
    description: 'Maps and boundary-based versions of UK statistical data.',
    url: 'https://geoportal.statistics.gov.uk/',
    category: 'UK data',
    access: 'Free',
    useFor: 'Viewing UK census and statistical boundaries as maps',
    tags: ['maps', 'boundaries', 'census', 'GIS'],
  },
  {
    id: 'osgb',
    name: 'Ordnance Survey',
    description: 'Maps, geospatial products, and location data for Great Britain.',
    url: 'https://www.ordnancesurvey.co.uk/',
    category: 'Maps & GIS',
    access: 'Terms apply',
    useFor: 'Detailed mapping, fieldwork planning, and UK spatial data',
    tags: ['OS', 'maps', 'fieldwork', 'geospatial'],
  },
  {
    id: 'openstreetmap',
    name: 'OpenStreetMap',
    description: 'A free, editable global map with roads, paths, buildings, land use, and place information.',
    url: 'https://www.openstreetmap.org/',
    category: 'Maps & GIS',
    access: 'Free',
    useFor: 'Quick location checks, route planning, and field-site context',
    tags: ['OSM', 'maps', 'fieldwork', 'basemap'],
  },
  {
    id: 'qgis',
    name: 'QGIS',
    description: 'Free, open-source desktop GIS software for viewing, editing, analysing, and creating maps.',
    url: 'https://qgis.org/',
    category: 'Maps & GIS',
    access: 'Free',
    useFor: 'Coursework maps, spatial analysis, and fieldwork data preparation',
    tags: ['QGIS', 'GIS', 'mapping', 'data'],
  },
  {
    id: 'natural-earth',
    name: 'Natural Earth',
    description: 'Public-domain vector and raster map data at multiple scales, designed for cartographic use.',
    url: 'https://www.naturalearthdata.com/',
    category: 'Maps & GIS',
    access: 'Free',
    useFor: 'General-purpose world maps and map backgrounds',
    tags: ['world', 'basemap', 'vector', 'raster'],
  },
  {
    id: 'met-office',
    name: 'Met Office',
    description: 'Weather observations, forecasts, climate information, and research resources for the UK and beyond.',
    url: 'https://www.metoffice.gov.uk/',
    category: 'Climate & environment',
    access: 'Free',
    useFor: 'Weather, climate, hazard, and fieldwork context',
    tags: ['weather', 'climate', 'hazards', 'UK'],
  },
  {
    id: 'uk-climate-maps-data',
    name: 'UK climate maps and data',
    description: 'Met Office climate maps and data resources for exploring UK climate evidence and future scenarios.',
    url: 'https://www.metoffice.gov.uk/research/climate/maps-and-data',
    category: 'Climate & environment',
    access: 'Free',
    useFor: 'Climate change, adaptation, and future-risk case studies',
    tags: ['climate change', 'projections', 'scenarios', 'adaptation'],
  },
  {
    id: 'copernicus-cds',
    name: 'Copernicus Climate Data Store',
    description: 'A large catalogue of climate and environmental datasets, with some requiring a free account.',
    url: 'https://cds.climate.copernicus.eu/',
    category: 'Climate & environment',
    access: 'Free account',
    useFor: 'Climate reanalysis, satellite, and environmental datasets',
    tags: ['climate data', 'satellite', 'environment', 'datasets'],
  },
  {
    id: 'ceh',
    name: 'Centre for Ecology & Hydrology',
    description: 'UK ecology, hydrology, soils, and environmental monitoring research and data resources.',
    url: 'https://www.ceh.ac.uk/',
    category: 'Climate & environment',
    access: 'Free',
    useFor: 'Ecology, catchments, land cover, soils, and environmental evidence',
    tags: ['ecology', 'hydrology', 'catchments', 'UK'],
  },
  {
    id: 'quality-info',
    name: 'Plymouth: Quality of Information',
    description: 'University guidance on evaluating sources, distinguishing scholarly from non-scholarly work, and avoiding unreliable websites.',
    url: 'https://plymouth.libguides.com/skills/qualityinfo',
    category: 'Reference & quality',
    access: 'Free',
    useFor: 'Judging whether a source is suitable for academic work',
    tags: ['source evaluation', 'reliability', 'research literacy'],
  },
  {
    id: 'search-strategy',
    name: 'Plymouth: Search Strategy',
    description: 'Guidance for turning a topic into a focused search and finding useful terms.',
    url: 'https://plymouth.libguides.com/skills/searchstrategy',
    category: 'Reference & quality',
    access: 'Free',
    useFor: 'Building better searches before opening a database',
    tags: ['search', 'keywords', 'research'],
  },
  {
    id: 'endnote',
    name: 'Plymouth: EndNote support',
    description: 'Guidance for using EndNote to collect, organise, and format references.',
    url: 'https://plymouth.libguides.com/searchingandreferencing/endnote',
    category: 'Reference & quality',
    access: 'Plymouth login',
    useFor: 'Managing a bibliography and generating citations',
    tags: ['EndNote', 'references', 'bibliography'],
  },
];

export const startHereSourceIds: readonly string[] = [
  'plymouth-primo',
  'plymouth-referencing',
  'google-scholar',
  'openstreetmap',
  'ons',
];

export const sourceAnchors: Readonly<Record<string, string>> = {
  'google-scholar': 'academic-search',
  'openstreetmap': 'maps-gis',
};

export const featuredSources = sources.filter((source) => featuredSourceIds.includes(source.id));
