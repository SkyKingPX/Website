# Serephix Icon Theming System

This document explains how to implement dynamic icon theming for users running the Serephix Windows 11 theme system through our custom Electron browser.

## Overview

When users visit our website through the Serephix browser, the browser will:
1. Read the user's theme configuration from `C:/srpx/settings.cnfg`
2. Parse the `theme="themename"` line to determine the active theme
3. Inject theme data into the webpage via a preload script
4. Allow the website to dynamically load themed icons

## Implementation

### Electron Browser Side (Preload Script)

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

function readSerephixTheme() {
  try {
    const configPath = 'C:/srpx/settings.cnfg';
    const config = fs.readFileSync(configPath, 'utf8');
    const themeMatch = config.match(/theme="([^"]+)"/);
    return themeMatch ? themeMatch[1] : 'default';
  } catch {
    return 'default'; // No Serephix installed or file not found
  }
}

contextBridge.exposeInMainWorld('serephix', {
  getTheme: () => readSerephixTheme(),
  isSerephixBrowser: true
});
```

### Website Side Implementation

```javascript
// Check if running in Serephix browser and get theme
async function initializeSerephixTheming() {
  if (window.serephix && window.serephix.isSerephixBrowser) {
    const theme = window.serephix.getTheme();
    
    // Apply theme to document
    document.documentElement.setAttribute('data-serephix-theme', theme);
    
    // Store theme for CSS usage
    document.documentElement.style.setProperty('--serephix-theme', theme);
    
    console.log(`Serephix theme detected: ${theme}`);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeSerephixTheming);
```

## Icon Theming Examples

### Current Website Icons
Our website currently uses these icons that should be themed:

**Social Media Icons:**
- `/icons/discord.png` - Discord social link
- `/icons/youtube.png` - YouTube social link  
- `/icons/instagram.png` - Instagram social link
- `/icons/github.png` - GitHub repository links
- `/icons/mail.png` - Email contact

**Platform Icons:**
- `/icons/modrinth.png` - Modrinth mod platform
- `/icons/curseforge.png` - CurseForge mod platform

**UI Icons:**
- `/icons/filter.png` - Project filter button
- `/icons/checkbox_checked.png` - Selected checkboxes
- `/icons/checkbox_unchecked.png` - Unselected checkboxes
- `/icons/code.png` - Code/development icon
- `/icons/chat.png` - Chat/communication icon

**Category Icons:**
- `/icons/mod.png` - Minecraft mod category
- `/icons/modpack.png` - Minecraft modpack category
- `/icons/plugin.png` - Plugin category
- `/icons/tool.png` - Tool category

### CSS Theming Implementation

```css
/* Default icons */
.social-discord { background-image: url('/icons/discord.png'); }
.social-youtube { background-image: url('/icons/youtube.png'); }
.platform-modrinth { background-image: url('/icons/modrinth.png'); }
.ui-filter { background-image: url('/icons/filter.png'); }

/* Serephix Blue Theme */
[data-serephix-theme="blue"] .social-discord { 
  background-image: url('/icons/themes/blue/discord.png'); 
}
[data-serephix-theme="blue"] .social-youtube { 
  background-image: url('/icons/themes/blue/youtube.png'); 
}
[data-serephix-theme="blue"] .platform-modrinth { 
  background-image: url('/icons/themes/blue/modrinth.png'); 
}
[data-serephix-theme="blue"] .ui-filter { 
  background-image: url('/icons/themes/blue/filter.png'); 
}

/* Serephix Purple Theme */
[data-serephix-theme="purple"] .social-discord { 
  background-image: url('/icons/themes/purple/discord.png'); 
}
[data-serephix-theme="purple"] .social-youtube { 
  background-image: url('/icons/themes/purple/youtube.png'); 
}
/* ... etc for all icons */

/* Serephix Green Theme */
[data-serephix-theme="green"] .social-discord { 
  background-image: url('/icons/themes/green/discord.png'); 
}
/* ... etc */
```

### JavaScript Dynamic Icon Switching

```javascript
// Function to update icon sources dynamically
function updateIconForTheme(iconElement, iconName, theme) {
  const defaultPath = `/icons/${iconName}.png`;
  const themedPath = `/icons/themes/${theme}/${iconName}.png`;
  
  // Check if themed icon exists, fallback to default
  const img = new Image();
  img.onload = () => iconElement.src = themedPath;
  img.onerror = () => iconElement.src = defaultPath;
  img.src = themedPath;
}

// Apply theme to all icons
function applySerephixTheme(theme) {
  // Update Discord icons
  document.querySelectorAll('img[src*="discord.png"]').forEach(img => {
    updateIconForTheme(img, 'discord', theme);
  });
  
  // Update YouTube icons
  document.querySelectorAll('img[src*="youtube.png"]').forEach(img => {
    updateIconForTheme(img, 'youtube', theme);
  });
  
  // Update Modrinth icons
  document.querySelectorAll('img[src*="modrinth.png"]').forEach(img => {
    updateIconForTheme(img, 'modrinth', theme);
  });
  
  // Update filter icons
  document.querySelectorAll('img[src*="filter.png"]').forEach(img => {
    updateIconForTheme(img, 'filter', theme);
  });
  
  // Update checkbox icons
  document.querySelectorAll('img[src*="checkbox_"]').forEach(img => {
    const isChecked = img.src.includes('checked');
    const iconName = isChecked ? 'checkbox_checked' : 'checkbox_unchecked';
    updateIconForTheme(img, iconName, theme);
  });
}
```

## Directory Structure

Create themed icon directories in `public/icons/`:

```
public/
├── icons/
│   ├── discord.png           # Default icons
│   ├── youtube.png
│   ├── modrinth.png
│   ├── filter.png
│   ├── checkbox_checked.png
│   ├── checkbox_unchecked.png
│   └── themes/
│       ├── blue/
│       │   ├── discord.png   # Blue themed versions
│       │   ├── youtube.png
│       │   ├── modrinth.png
│       │   ├── filter.png
│       │   ├── checkbox_checked.png
│       │   └── checkbox_unchecked.png
│       ├── purple/
│       │   ├── discord.png   # Purple themed versions
│       │   ├── youtube.png
│       │   └── ...
│       └── green/
│           ├── discord.png   # Green themed versions
│           ├── youtube.png
│           └── ...
```

## Supported Themes

Based on Serephix theme system, support these theme values:
- `default` - Standard website icons
- `blue` - Blue accent themed icons  
- `purple` - Purple accent themed icons
- `green` - Green accent themed icons
- `red` - Red accent themed icons
- `orange` - Orange accent themed icons

## Testing

To test without the Serephix browser:
1. Open browser dev console
2. Run: `document.documentElement.setAttribute('data-serephix-theme', 'blue')`
3. Icons should switch to blue theme (if implemented)

## Implementation Checklist

- [ ] Add preload script to Serephix browser
- [ ] Create themed icon variants for each theme
- [ ] Update website CSS with theme selectors
- [ ] Add JavaScript dynamic icon switching
- [ ] Test theme switching functionality
- [ ] Add fallback for missing themed icons