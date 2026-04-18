# ಫಾಂಟ್ಸ್ ಸಂಚಯ - Kannada Fonts Showcase

Sanchaya is working on building an Index for Kannada fonts to locate the usable fonts for identifying, previewing and possibly fixing the fonts for the best of its abilities. This project would be crowdsourced from the community.

## Font License Notes

Fonts stored here in this project are exclusively for educational and research purposes only. We have retained the license information for each font in respective folders.

## Installation

### Prerequisites

- Node.js (v14 or higher)
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

**Note:** Change the default admin credentials in `index.js` before deploying to production.

## After Adding New Fonts

After adding a new font to the `static/Fonts` folder, run:

```bash
node fontAdded.js
```

## Deployment to GitHub Pages

1. Log in to the admin panel at `/admin`
2. Click "Export" to download the font data with metadata
3. Copy the exported JSON to your GitHub Pages repository

## Contributing

Feel free to contribute to the project by:

- Adding new fonts
- Improving font metadata
- Fixing bugs
- Enhancing the UI/UX

## Project Structure

```
fonts/
├── index.js              # Main Express server
├── fonts.json            # Font data (auto-generated)
├── fontMetadata.json     # Font metadata (admin-managed)
├── configuration.js      # Configuration settings
├── Main/                 # Core application logic
│   └── fontSelectedPage/
├── static/               # Static assets
│   ├── css/             # Stylesheets
│   ├── Fonts/           # Font files
│   ├── img/             # Images
│   └── js/              # JavaScript files
└── views/               # EJS templates
    ├── admin.ejs         # Admin panel
    ├── fontSelectedPage/ # Font detail views
    └── family/           # Family page views
```
