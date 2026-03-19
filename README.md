<img width="269" height="58" alt="image" src="https://github.com/user-attachments/assets/32405a02-4f29-44d7-9fa2-84295fb2e60f" />


# Wanderlust - Travel Listings Platform

Wanderlust is a full-stack travel listing platform to discover, create, and review stays around the world. It is built with Node.js, Express, MongoDB, and EJS.

## Features

- 🏠 **Listings Management**: Create, read, update, and delete travel listings
- 👤 **User Authentication**: Secure signup/login with Passport.js
- 📝 **Reviews System**: Add reviews and ratings to listings
- 🖼️ **Image Uploads**: Upload images via Cloudinary integration
- 🗺️ **Map Integration**: Display locations with Mapbox
- 🔐 **Authorization**: Owner-based permissions for editing/deleting
- 📱 **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Authentication & Security
- **Passport.js** - Authentication middleware
- **express-session** - Session management
- **connect-flash** - Flash messages

### Frontend
- **EJS** - Templating engine
- **Bootstrap** - CSS framework
- **JavaScript** - Client-side interactivity

### Third-Party Services
- **Cloudinary** - Image hosting and management
- **Mapbox** - Maps and location services

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local) or MongoDB Atlas account
- Cloudinary account
- Mapbox account (for maps)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd air
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   - `ATLASDB_URL` - MongoDB connection string
   - `SECRET` - Session secret key
   - `CLOUD_NAME` - Cloudinary cloud name
   - `CLOUD_API_KEY` - Cloudinary API key
   - `CLOUD_API_SECRET` - Cloudinary API secret
   - `MAP_TOKEN` - Mapbox access token

4. **Initialize database (optional)**
   ```bash
   node init/index.js
   ```

5. **Run the application**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
air/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── cloudConfig.js        # Cloudinary configuration
├── schema.js             # Joi validation schemas
├── middleware.js         # Custom middleware
├── controllers/          # Route controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/              # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/              # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── utils/               # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
└── init/                # Database initialization
    ├── data.js
    └── index.js
```

## API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - New listing form (authenticated)
- `POST /listings` - Create new listing (authenticated)
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Edit listing form (owner only)
- `PUT /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Reviews
- `POST /listings/:id/reviews` - Add review (authenticated)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (author only)

### Users
- `GET /signup` - Signup form
- `POST /signup` - Create new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## Deployment

Use [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step setup of both frontend and backend in production.

Recommended platform options:
- Render (single full-stack service)
- Vercel (serverless)

On Vercel, always set your database URL in project environment variables before deploying.

## Development

### Running Tests
```bash
npm test
```

### Code Style
- Follow ESLint configuration (if added)
- Use meaningful variable names
- Add comments for complex logic

### Adding New Features
1. Create feature branch
2. Implement feature with tests
3. Submit pull request
4. Code review and merge

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | No (default: 8080) |
| `ATLASDB_URL` | Primary MongoDB connection string | Yes* |
| `MONGODB_URL` | Alternate MongoDB connection string key | Yes* |
| `MONGO_URL` | Alternate MongoDB connection string key | Yes* |
| `DATABASE_URL` | Alternate MongoDB connection string key | Yes* |
| `SECRET` | Session secret key | Yes |
| `CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUD_API_KEY` | Cloudinary API key | Yes |
| `CLOUD_API_SECRET` | Cloudinary API secret | Yes |
| `MAP_TOKEN` | Mapbox access token | Yes |

`Yes*` means one of these MongoDB keys must be set (not all): `ATLASDB_URL`, `MONGODB_URL`, `MONGO_URL`, or `DATABASE_URL`.

## Security

- Passwords are hashed using passport-local-mongoose
- Session cookies are HTTP-only and secure in production
- CSRF protection via methods override
- Input validation with Joi schemas
- MongoDB injection prevention via Mongoose
- Environment variables for sensitive data

## Notes

- This is a single Express + EJS project, so `npm run dev` runs both frontend pages and backend routes together.
- For MongoDB connection, set at least one of: `ATLASDB_URL`, `MONGODB_URL`, `MONGO_URL`, or `DATABASE_URL`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Mapbox for maps integration
- Cloudinary for image hosting
- MongoDB Atlas for database hosting
- Bootstrap for UI components

## Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Happy Traveling! 🌍✈️**
