# Random Joke Generator 😂

A fun and interactive web application that fetches random jokes from the Official Joke API and allows you to manage your favorites and browse joke history.

## Features

- 🃏 **Random Joke Generation** - Get random jokes with a single click
- 📂 **Multiple Categories** - Choose from General, Programming, and Knock-Knock jokes
- ❤️ **Favorites Management** - Save your favorite jokes for later
- 📋 **Joke History** - Keep track of all jokes you've viewed
- 📋 **Copy to Clipboard** - Easily share jokes with friends
- 💾 **Local Storage** - Your favorites and history are saved automatically
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Beautiful UI** - Modern and intuitive interface

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - Functionality and API integration
- **Official Joke API** - https://official-joke-api.appspot.com/
- **LocalStorage API** - Data persistence

## How to Use

1. **Clone the repository**
   ```bash
   git clone https://github.com/sojeedhoq-tech/joke-generator.git
   cd joke-generator
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Getting Started**
   - Click "Get a Joke" to fetch a random joke
   - Select a category from the dropdown to filter jokes
   - Click "❤️ Add to Favorites" to save your favorite jokes
   - Use the "History" tab to see previously viewed jokes
   - Click "Copy Joke" to copy the current joke to clipboard

## Features Explained

### 1. Random Joke Generator
- Fetches jokes from the Official Joke API
- Supports multiple categories
- Smooth loading state indicator

### 2. Category Selection
- **All Categories** - Random jokes from any category
- **General** - General/Clean jokes
- **Programming** - Tech and programming jokes
- **Knock-Knock** - Classic knock-knock jokes

### 3. Favorites System
- Save jokes you love
- Remove jokes from favorites
- All favorites are persisted in localStorage
- Easy deletion of favorite jokes

### 4. History Tracker
- Automatically records all viewed jokes
- Shows timestamp for each joke
- Can store up to 50 jokes
- Delete individual jokes from history

### 5. Copy Functionality
- One-click copy to clipboard
- Confirmation message after copying
- Works on all modern browsers

## File Structure

```
joke-generator/
├── index.html      # Main HTML file
├── style.css       # Styling and responsive design
├── script.js       # JavaScript logic and API calls
└── README.md       # Project documentation
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## API Information

This project uses the **Official Joke API**:
- **Base URL**: https://official-joke-api.appspot.com/
- **Free to use**: No authentication required
- **Rate Limit**: 100 requests per hour

## Local Storage

The application uses browser's localStorage to persist:
- **jokeHistory** - Array of all viewed jokes
- **favorites** - Array of favorite jokes

Data is automatically synced on every action.

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Export jokes to PDF
- [ ] Share jokes on social media
- [ ] Custom joke categories
- [ ] Joke ratings/voting system
- [ ] Multi-language support
- [ ] Notification when new jokes are available

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Made with ❤️ by Sojeed Hoq**

Happy joking! 😂