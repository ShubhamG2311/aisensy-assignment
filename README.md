# Web Content Q&A Tool

This is a web-based tool where users can enter URLs, ask questions about the content of those pages, and get accurate answers using only the ingested information. The tool has a user-friendly interface and meets all the assignment requirements.

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ShubhamG2311/aisensy-assignment.git
    cd aisensy-assignment
    ```

2. Set up the backend:
    ```bash
    npm install
    node index.js
    ```

3. Set up the frontend:
    ```bash
    cd client
    npm install
    npm start
    ```

4. Access the tool at `http://localhost:3000`.

### Usage
Note: Add your API keys in .env file otherwise code may throw error
1. Enter a URL in the input field and click "Ingest Content".
2. Enter a question about the content of the ingested URL and click "Ask Question".
3. The answer will be displayed below.

