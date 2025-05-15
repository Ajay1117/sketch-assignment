# Processing Sketch Manager

A modern web application for managing and previewing community-submitted Processing sketches. Built with Next.js 13+, TypeScript, and Tailwind CSS.

## Features

- **Sketch Submission**
  - Upload .pde files
  - Add title, description, author name, and tags
  - Drag & drop file upload support

- **Sketch Management**
  - View all submitted sketches in a responsive grid
  - Filter sketches by status (Pending, Approved, Rejected)
  - Detailed view of each sketch with metadata

- **Moderation Tools**
  - Approve or reject submissions
  - Add moderation comments
  - Track submission status

- **Modern UI/UX**
  - Clean and minimal design
  - Responsive layout for all devices
  - Accessible components
  - Smooth transitions and interactions

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: In-memory store (mock data)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sketch-assignment.git
   cd sketch-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Home page
│   ├── submit/         # Sketch submission page
│   └── sketches/       # Sketch listing and detail pages
├── components/         # Reusable React components
├── lib/               # Utility functions and store
└── types/             # TypeScript type definitions
```

## Future Improvements

- [ ] Add p5.js integration for live sketch preview
- [ ] Implement user authentication
- [ ] Add backend integration for persistent storage
- [ ] Add unit tests for core components
- [ ] Implement drag & drop file upload
- [ ] Add search functionality
- [ ] Add pagination for sketch listings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
