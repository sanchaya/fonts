# ಫಾಂಟ್ಸ್ ಸಂಚಯ - Kannada Fonts Showcase

Sanchaya is building an index for Kannada fonts to locate, preview, and identify fonts. This project is crowdsourced from the community.

## Font License Notes

Fonts stored in this project are for educational and research purposes only. Each font retains its own license (SIL OFL, Proprietary, Free, etc.) as noted in its metadata and folder.

## Project License

The project code (Express server, views, scripts) is licensed under the **MIT License**. See [LICENSE](./LICENSE).

## Features

- **Font Browser** — Browse, search, and filter 70+ Kannada font families
- **Font Detail** — View glyphs, OpenType features, and font metadata per font
- **Statistics** — Dashboard showing font counts, foundries, and license distribution
- **Visualizations** — Word cloud, font comparison, glyph gallery, and font bingo
- **Unicode Character Blocks** — Reference table of all 346 Unicode blocks (Unicode 17.0). Click any block to expand its character grid; paste a character into the search to find which block it belongs to.
- **Bug Reports** — Submit and acknowledge font rendering issues
- **Font Suggestions** — Community-driven font submission

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fonts
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   node index.js
   ```

4. **Access the application**
   - Open your browser and go to: `http://localhost:4040`

### Server Configuration

- Default port: `4040`
- To change the port, set the `PORT` environment variable:
  ```bash
  PORT=3000 node index.js
  ```

## Admin Panel

The application includes an admin panel for managing font metadata.

### Access Admin Panel

1. Go to `/login`
2. Default credentials:
   - Username: `admin`
   - Password: `fontsadmin123`

### Admin Features

- View and edit font metadata (author, license, source, foundry, description)
- Export font data for GitHub Pages deployment
- Manage font suggestions

**Note:** Change the default admin credentials before deploying to production.

## Adding New Fonts

1. Place the font file(s) in `static/Fonts/<Font-Name>/`
2. Run the indexer:
   ```bash
   node fontAdded.js
   ```
3. Update `fontMetadata.json` with author, license, source, and foundry info

## Deployment to GitHub Pages

1. Log in to the admin panel at `/admin`
2. Click "Export" to download the font data with metadata
3. Copy the exported JSON to your GitHub Pages repository

## Contributing

Feel free to contribute by:

- Adding new Kannada fonts
- Improving font metadata
- Fixing bugs
- Enhancing the UI/UX

## Project Structure

```
fonts/
├── index.js              # Main Express server
├── fonts.json            # Font index (auto-generated)
├── fontMetadata.json     # Font metadata (admin-managed)
├── fontAdded.js          # Font indexer script
├── configuration.js      # Configuration settings
├── unicodeBlocksData.js  # Unicode block definitions (Unicode 17.0)
├── LICENSE               # MIT License
├── Main/                 # Core application logic
│   └── fontSelectedPage/ # Font listing and filtering
├── static/               # Static assets
│   ├── css/              # Stylesheets
│   ├── Fonts/            # Font files (70+ families)
│   ├── img/              # Images
│   └── js/               # JavaScript files
└── views/                # EJS templates
    ├── admin.ejs         # Admin panel
    ├── fontSelectedPage/ # Font detail views
    ├── home/             # Home page with filters
    ├── unicodeBlocks/    # Unicode Character Blocks table
    └── visualizations/   # Font visualization tools
```
