Project Proposal - Weight Tracking Web Application
App Overview
For my term project, I plan to create a weight tracking web application that allows users to
record their body weight over time and visualize their progress using graphs.
The main purpose of this application is to make it simple and motivating for people to track
changes in their weight. Many existing fitness apps are overly complicated or include features
that users do not need. This project focuses on doing one thing well: helping users log their
weight quickly and clearly see trends over time.
Users will be able to enter their body weight for a specific date and view charts showing
progress across customizable time ranges such as the past week, month, or year. This helps
users understand long-term trends rather than focusing only on daily fluctuations.
The target users include individuals interested in fitness tracking, weight loss, weight gain, or
general health monitoring. The application will be designed to be simple, clean, and easy to
use on both desktop and mobile devices.
The frontend of the application will be built using React to create a responsive and interactive
user interface, while maintaining a strong focus on usability and clarity.
What makes this app unique is its focus on simplicity and customization. Instead of
overwhelming users with many fitness metrics, the app emphasizes clear visual feedback and
flexible graph views that allow users to understand their progress at a glance.
Team Responsibilities
• Planning and designing the application
• Creating the frontend interface using React
• Implementing backend logic
• Designing and managing the database
• Implementing authentication and user data storage
• Testing and debugging
• Deployment and presentation
Although I am working independently, I will maintain consistent Git commits to demonstrate
steady progress throughout the semester.
Database Design (Initial Plan)
The application will use a cloud database (Firebase Cloud Firestore). The structure will be
organized similarly to relational tables.
Users Collection
Stores account information for each user.
• user_id - Unique identifier
• email
• display_name
• account_created_date
WeightEntries Collection
Stores individual weight records entered by users.
• entry_id - Unique identifier
• user_id - References the owner of the entry
• weight_value - Numeric weight measurement
• entry_date - Date the weight was recorded
• created_at - Timestamp of entry creation
Each user will only be able to view and modify their own weight entries, ensuring data privacy.
Shared data may include general application settings or publicly accessible example datasets.
Application Features (CRUD Operations)
• Create new weight entries
• Read and display past entries
• Update existing entries
• Delete incorrect entries
External Services
• React - Frontend framework for building the user interface
• Firebase Authentication - User login and account management
• Firebase Cloud Firestore - Cloud data storage
• Chart.js (or similar library) - Interactive graph visualization
No additional third-party services are currently planned, although small UI libraries may be
used to improve visual design and responsiveness