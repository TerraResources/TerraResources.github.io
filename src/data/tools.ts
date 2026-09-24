const toolCategoryNames = [
  'All',
  'Documents',
  'Automation',
  'Fieldwork',
  'Reference',
  'Mapping',
] as const;

export type ToolCategory = Exclude<(typeof toolCategoryNames)[number], 'All'>;

// FilterBar consumes a mutable string[]; keep the public list mutable while
// deriving the narrower category type from the single source above.
export const toolCategories: Array<'All' | ToolCategory> = [...toolCategoryNames];
export type ToolStatus = 'Ready' | 'Planned';
export type ToolIcon = 'document' | 'hotkey' | 'map' | 'grid' | 'note' | 'guide';

/**
 * The Word archive is one download with two related entry points. Keeping its
 * file list beside the download path makes that relationship explicit instead
 * of duplicating the archive contents in each card.
 */
export const toolPackages = {
  wordToolkit: {
    href: '/downloads/TerraResources-Word-Toolkit.zip',
    fileSize: '3.9 KB',
    contents: [
      'TerraResources-Lecture-Notes.ahk',
      'TerraResources-Master-Hotkeys.ahk',
      'TerraResources-Lecture-Settings.ahk',
    ],
  },
} as const;

export type ToolPackageId = keyof typeof toolPackages;

export type Tool = {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: ToolCategory;
  format: string;
  platform: string;
  version: string;
  fileSize: string;
  updated: string;
  packageId?: ToolPackageId;
  href: string;
  downloadLabel: string;
  status: ToolStatus;
  icon: ToolIcon;
  highlights: readonly string[];
  instructions: readonly string[];
};

export const tools: readonly Tool[] = [
  {
    id: 'word-toolkit',
    title: 'Word lecture notes toolkit',
    summary: 'Turn repeated lecture-note setup into a few Word shortcuts.',
    description:
      'A small AutoHotkey toolkit for Microsoft Word: create lecture headers, insert sub-topic headings, mark diagrams, apply heading styles, expand everyday shorthand, and insert date and time stamps.',
    category: 'Documents',
    format: 'AHK v2.0',
    platform: 'Windows + Word',
    version: '1.0',
    updated: '24 Sep 2026',
    fileSize: toolPackages.wordToolkit.fileSize,
    packageId: 'wordToolkit',
    href: toolPackages.wordToolkit.href,
    downloadLabel: 'Download toolkit',
    status: 'Ready',
    icon: 'document',
    highlights: ['Lecture templates', 'Heading shortcuts', 'Date/time stamps', 'F1 cheat sheet'],
    instructions: [
      'Install the stable AutoHotkey v2.0 release and extract the ZIP somewhere permanent.',
      'Keep all three .ahk files in the same folder so the shared settings file can be found.',
      'Inspect or edit TerraResources-Lecture-Notes.ahk in a text editor, then run it with AutoHotkey v2.',
      'Switch to Word; type a trigger such as ;;lec followed by a space.',
      'Press F1 in Word to open the full shortcut reference.',
    ],
  },
  {
    id: 'master-hotkeys',
    title: 'Master keyboard shortcuts',
    summary: 'Open study services and apply lecture formatting from the number pad.',
    description:
      'A personal launcher for common study services plus Word-only Numpad shortcuts for lecture headers, sub-topics, diagram markers, and bullet lists. Numpad 4 stays free for a custom launcher.',
    category: 'Automation',
    format: 'AHK v2.0',
    platform: 'Windows + Word',
    version: '1.0',
    updated: '24 Sep 2026',
    fileSize: toolPackages.wordToolkit.fileSize,
    packageId: 'wordToolkit',
    href: toolPackages.wordToolkit.href,
    downloadLabel: 'Download toolkit',
    status: 'Ready',
    icon: 'hotkey',
    highlights: ['One-click launchers', 'Numpad 1–3 and 5', 'Numpad 6–9 Word actions', 'Shared settings'],
    instructions: [
      'Extract the ZIP and keep all three .ahk files in the same folder.',
      'Run TerraResources-Master-Hotkeys.ahk with AutoHotkey v2.',
      'Use Numpad 1–3 and 5 for the configured launchers while the script is running.',
      'Use Numpad 6–9 in Word for the lecture-note and bullet-list shortcuts.',
      'Edit TerraResources-Lecture-Settings.ahk to change shared lecture-note placeholders.',
    ],
  },
  {
    id: 'map-shortcuts',
    title: 'Map shortcuts',
    summary: 'Open OpenStreetMap and control browser zoom without reaching for the mouse.',
    description:
      'A lightweight AutoHotkey helper for opening OpenStreetMap and sending browser-scoped zoom and reset shortcuts in supported browsers.',
    category: 'Mapping',
    format: 'AHK v2.0',
    platform: 'Windows',
    version: '2.0',
    updated: '24 Sep 2026',
    fileSize: '637 B',
    href: '/downloads/MapShortcuts-v2.ahk',
    downloadLabel: 'Download script',
    status: 'Ready',
    icon: 'map',
    highlights: ['F6 opens map', 'Browser-scoped zoom', 'No data collection'],
    instructions: [
      'Install the stable AutoHotkey v2.0 release.',
      'Run MapShortcuts-v2.ahk; F7–F9 work only in supported browser windows.',
      'Press F6 to open OpenStreetMap.',
      'Press F10 to exit the helper.',
    ],
  },
  {
    id: 'coordinate-log',
    title: 'Coordinate log',
    summary: 'Record locations, accuracy, sources, and notes in one reusable CSV.',
    description:
      'A spreadsheet-friendly field record for keeping dates, projects, coordinates, elevation, accuracy, sources, and notes tied to the place they came from.',
    category: 'Fieldwork',
    format: 'CSV',
    platform: 'Any spreadsheet',
    version: '1.0',
    updated: '24 Sep 2026',
    fileSize: '203 B',
    href: '/downloads/Coordinate-Log-Template.csv',
    downloadLabel: 'Download template',
    status: 'Ready',
    icon: 'grid',
    highlights: ['Accuracy column', 'Source field', 'Works offline'],
    instructions: [
      'Open the CSV in a spreadsheet or plain-text editor.',
      'Keep the first row as the field names.',
      'Add one row per location or observation.',
      'Save a copy before changing the template structure.',
    ],
  },
  {
    id: 'field-notes',
    title: 'Field notes template',
    summary: 'Separate what you observed from what you think it means.',
    description:
      'A text template that keeps observations, interpretations, uncertainty, and the next question visible instead of mixing them together.',
    category: 'Fieldwork',
    format: 'TXT',
    platform: 'Any text editor',
    version: '1.0',
    updated: '24 Sep 2026',
    fileSize: '767 B',
    href: '/downloads/Field-Notes-Template.txt',
    downloadLabel: 'Download template',
    status: 'Ready',
    icon: 'note',
    highlights: ['Observation first', 'Uncertainty prompt', 'Next question'],
    instructions: [
      'Duplicate the file for each site or visit.',
      'Fill in the location and purpose before interpreting evidence.',
      'Add observations before writing a possible explanation.',
      'Use the final section to plan the next inspection.',
    ],
  },
  {
    id: 'starter-guide',
    title: 'Toolkit quick-start guide',
    summary: 'One short guide to installing, inspecting, and using the downloads safely.',
    description:
      'Plain-language setup notes for the AutoHotkey scripts and templates, including requirements, shortcut summaries, and a quick safe-use checklist.',
    category: 'Reference',
    format: 'TXT',
    platform: 'Any text editor',
    version: '1.0',
    updated: '24 Sep 2026',
    fileSize: '3.8 KB',
    href: '/downloads/TerraResources-Starter-Guide.txt',
    downloadLabel: 'Download guide',
    status: 'Ready',
    icon: 'guide',
    highlights: ['Requirements listed', 'Plain text', 'Safe-use notes'],
    instructions: [
      'Download the files from this site only.',
      'Inspect scripts and keep a backup of important data.',
      'Test on a small document before using a script on coursework.',
      'Use the included comments to understand what each shortcut sends.',
    ],
  },
];

export const featuredToolIds: readonly string[] = [
  'word-toolkit',
  'master-hotkeys',
  'map-shortcuts',
];

export const featuredTools = tools.filter((tool) => featuredToolIds.includes(tool.id));
