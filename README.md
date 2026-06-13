# ⚖️ Lexis Hub (LegalCite Slate)

A premium, dark-themed React dashboard designed for legal professionals to seamlessly organize, OCR-scan, validate, and review legal documents. Built with a focus on modern UI/UX, featuring a custom flat dark aesthetic using Tailwind CSS.

![Lexis Hub Dashboard](public/favicon.svg) <!-- Replace with a screenshot of your dashboard if you'd like! -->

## ✨ Key Features

- **Document Editor & Scanner**: Built-in text editor that includes a mock OCR scanner to detect unmatched quotes and formatting errors, complete with a version history tracking system.
- **Smart Code Validator**: An autocomplete search bar that validates legal codes (e.g., FRC-2024, SEC-90) and displays recent queries.
- **Document Uploader**: A sleek drag-and-drop file upload zone featuring animated progress bars to simulate OCR document scanning.
- **Clarity Sorter**: A data table that tracks OCR health and clarity scores across your master list of uploaded documents.
- **Review Pipeline**: A dedicated queue for rejecting or approving scanned documents.
- **Premium Dark Mode**: A highly customized, cohesive Tailwind CSS dark theme (`#0A0D14` backgrounds with Indigo/Emerald accents).
- **Authentication Flow**: Includes a beautifully styled mock login screen.

## 🚀 Tech Stack

- **Frontend Framework**: React (Vite)
- **Styling**: Tailwind CSS (Custom utility classes like `.ui-panel`, `.btn-primary`, `.input-field`)
- **Icons**: Lucide React
- **State Management**: React Context API (`SyncContext`)

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/legalcite-slate.git
   cd legalcite-slate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173`. You can bypass the login screen by typing any text into the email and password fields and clicking "Sign In".
