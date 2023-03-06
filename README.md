<h1 align="center">Professional Coding Practices</h1>
<h2 align="center"><a href="https://ahasan-suncor.github.io/ProfessionalCodingPractices/">View Live</a></h2>

<div align="center">

[Overview](#overview) • 
[Folder Structure](#folder-structure) • 
[How to Run Locally](#how-to-run-locally) • 
[Contribute](#contribute)
</div>

---
## Overview
This guide is intended for developers to help write readable, and maintainable code.
The website includes naming conventions, code formatting, and documentation standards.
It also includes a checklist that can be used during a code review to ensure that all coding practices are followed.

<p align="center"><img  src="https://user-images.githubusercontent.com/84206795/223031233-eaf4003e-8313-4fd7-b9ec-d8975fd438a5.gif" width="60%"></p>

---
## Folder Structure
```
├── css/
│   ├── style.css - Style shared between multiple pages
│   └── checklistStyle.css - Style specific to the checklist page
├── scripts/
│   └── checklistScript.js - Functionality for the checklist page
├── data/
│   └── checklistItems.json - Checklist data
├── images/
├── pages/
│   ├── overview.html
│   ├── checklist.html
│   ├── namingConventions.html
│   ├── functions.html
│   ├── codeFormattingAndStyle.html
│   ├── documentation.html
│   ├── testing.html
│   ├── acknowledgements.html
│   └── glossary.html
├── index.html - Redirects to main site. Needed for GitHub pages
└── README.md
```

---
## How to Run Locally
To run this code, you need a local HTTP server. You can use Node.js and the http-server package. Here are the steps to clone the repo, install and run http-server:
1. Clone this repository to your local machine using git clone
2. Install Node.js on your machine from the Node.js website: https://nodejs.org/en/download/
3. Once Node.js is installed, open your terminal/command prompt and run the following command to install http-server globally: `npm install http-server -global`
4. Navigate to the directory where the project files are located using your terminal/command prompt
5. Start the HTTP server by running the following command: `http-server`
6. This will start the server and display the URL where your app is running. Open your web browser and navigate to the URL to view the app

---
## Contribute
1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. When ready, create a pull request

---
## Author
**Ahmed (&#097;&#104;&#097;&#115;&#097;&#110;&#064;&#115;&#117;&#110;&#099;&#111;&#114;&#046;&#099;&#111;&#109;)**

Hakuna Matata! 😊

<div align="center">

[⬆ Back to Top](#overview)
</div>
