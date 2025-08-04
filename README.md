# Memory Game - Find the Pairs 🧩

A beautiful, responsive memory game built with vanilla HTML, CSS, and JavaScript. Features an Airbnb-inspired modern UI design and smooth animations.

## 🎮 Game Features

- **4x4 Grid**: 16 tiles with 8 pairs to match
- **Random Image Selection**: Each game randomly selects 8 images from 15 available photos
- **Modern UI**: Clean, Airbnb-style design with smooth animations
- **Game Statistics**: Track time, moves, and pairs found
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Victory Modal**: Celebration screen with game statistics
- **Smooth Animations**: Card flip effects and hover animations

## 🖼️ Image Requirements

The game expects images named in the format:
- `IMG (1).jpg`
- `IMG (2).jpg`
- ...
- `IMG (15).jpg`

Images can be of different shapes and resolutions - the CSS handles proper scaling and cropping.

## 🚀 Deployment on GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `memory-game` or `marghi-fun`
3. Make sure it's public (required for free GitHub Pages)

### Step 2: Upload Files
Upload all the files to your repository:
- `index.html`
- `style.css`
- `script.js`
- `README.md`
- All your `IMG (1).jpg` to `IMG (15).jpg` files

### Step 3: Enable GitHub Pages
1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### Step 4: Access Your Site
Your site will be available at: `https://yourusername.github.io/repository-name`

## 🛠️ Local Development

To run the game locally:

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```

## 🎯 How to Play

1. Click "New Game" to start
2. Click on any tile to reveal the image
3. Click on another tile to find its match
4. If the images match, they stay revealed
5. If they don't match, they flip back over
6. Find all 8 pairs to win!
7. Try to complete the game in the fewest moves and fastest time

## 🎨 Design Features

- **Modern Card Design**: Rounded corners, shadows, and smooth transitions
- **Color Scheme**: Purple gradient background with clean white cards
- **Typography**: Inter font for excellent readability
- **Icons**: Font Awesome icons for enhanced visual appeal
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Proper contrast ratios and keyboard support

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Change Number of Images
Edit the `totalImages` variable in `script.js`:
```javascript
this.totalImages = 15; // Change this number
```

### Modify Grid Size
To change from 4x4 to a different size:
1. Update CSS grid in `style.css`:
   ```css
   .game-board {
       grid-template-columns: repeat(4, 1fr); /* Change 4 to desired size */
   }
   ```
2. Update game logic in `script.js`:
   ```javascript
   this.gridSize = 16; // Update total tiles
   this.pairsNeeded = 8; // Update pairs needed
   ```

### Add More Images
Simply add more images following the naming convention:
- `IMG (21).jpg`
- `IMG (22).jpg`
- etc.

And update the `totalImages` variable accordingly.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Enjoy playing the Memory Game! 🎉**
