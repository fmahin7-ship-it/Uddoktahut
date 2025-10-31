# Clickable Links in Chat Messages

## Overview

The chat interface now automatically detects and converts URLs in messages to clickable links.

## Features

- **Auto-detection**: Automatically detects various URL formats:
  - `https://example.com`
  - `http://example.com`
  - `www.example.com`
  - `example.com`
  - `[Link text](https://example.com)` (Markdown format)
- **Safe navigation**: Links open in new tabs with `noopener noreferrer` for security
- **Visual styling**: Links are styled with hover effects and proper colors for both light and dark themes
- **Error handling**: Invalid URLs are caught and logged
- **Responsive**: Links break properly on smaller screens
- **Markdown support**: Converts `[text](url)` format to proper clickable links

## Example Usage

When a message contains text like:

```
Check out our website at https://uddoktahut.com or visit www.example.com for more info.
```

It will render as:

- Regular text: "Check out our website at "
- Clickable link: "https://uddoktahut.com"
- Regular text: " or visit "
- Clickable link: "www.example.com"
- Regular text: " for more info."

**Markdown Links Example:**

```
For more information, connect with [Farhan Masud](https://www.linkedin.com/in/farhanmasud07/) on LinkedIn.
```

Will render as:

- Regular text: "For more information, connect with "
- Clickable link: "Farhan Masud" (opens https://www.linkedin.com/in/farhanmasud07/)
- Regular text: " on LinkedIn."

## Technical Implementation

- **TextWithLinks component**: Handles parsing and rendering
- **utils.js**: Contains URL detection logic (added to existing utils file)
- **MessageList**: Updated to use TextWithLinks for message content

## Files Modified

- `/components/common/TextWithLinks.jsx` - New component for rendering text with links
- `/lib/utils.js` - Added URL detection utilities to existing utils file
- `/components/dashboard/analytics/MessageList.jsx` - Updated to use TextWithLinks

## Styling

Links are automatically styled with appropriate colors:

- **User messages**: Light green links on dark background
- **AI messages**: Blue links that adapt to light/dark theme
- **Hover effects**: Color changes on hover for better UX
