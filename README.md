# i18n Admin

A modern, lightweight translation management tool built with React 19, TypeScript, and Tailwind CSS v4.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.x-blue) ![Vite](https://img.shields.io/badge/Vite-7.x-purple)

## Features

- **Hierarchical Structure** - Organize translations in nested folders (e.g., `common.buttons.submit`)
- **Multi-language Support** - Edit translations across multiple languages simultaneously
- **Visual Validation** - Missing translations highlighted in red
- **Collapse/Expand** - Navigate large translation trees easily with ▶/▼ toggles
- **Search** - Find keys or translations instantly
- **Flags** - Language columns show flag emojis (🇬🇧 🇪🇸 🇫🇷 🇩🇪)
- **Export to JSON** - Download properly nested JSON files for each language
- **Responsive** - Works on desktop and mobile
- **Accessible** - ARIA labels, keyboard navigation, semantic HTML

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Add keys** - Click "+ Add key" to create a new folder/parent
2. **Add translations** - Click 📁 (folder) or 🔤 (translation) on a parent row
3. **Edit** - Type directly in the input fields
4. **Collapse/Expand** - Click ▶/▼ on folders, or use ⊞/⊟ buttons for all
5. **Search** - Type in the search bar to filter keys/values
6. **Toggle languages** - Use checkboxes to show/hide language columns
7. **Export** - Click "Export JSON" to generate download links

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS v4** - Styling
- **ESLint** - Linting

## Project Structure

```
src/
├── components/
│   ├── TranslationTable/   # Main table with rows
│   ├── Toolbar/            # Search, buttons, language toggles
│   ├── ExportPanel/        # Download links
│   ├── EmptyState/         # Empty state UI
│   └── Toast/              # Notifications
├── hooks/
│   └── useTranslations.ts  # State management
├── utils/
│   ├── flatten.ts          # Nested → flat conversion
│   ├── unflatten.ts        # Flat → nested conversion
│   ├── validation.ts       # Key validation
│   ├── flags.ts            # Language → flag mapping
│   └── ...
├── types/                  # TypeScript interfaces
└── data/                   # Sample data
```

## License

MIT
