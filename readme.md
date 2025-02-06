# Node.js Project Scaffolding CLI

A command-line interface tool that helps you quickly scaffold Node.js projects with a complete MVC architecture and generate various components.

## Features

- 🚀 Quickly scaffold a new Node.js project with MVC structure
- ⚡ Generate controllers, routes, services, models, and validations
- 📝 Automatic generation of CRUD operations
- 🔧 Built-in MongoDB integration
- ✨ Automatic environment file generation

## Usage

### Scaffolding a New Project

To create a new Node.js project: `npx forgi scaffold`

You'll be prompted to enter:

- Project name

This will:

1. Clone the base project structure
2. Install dependencies
3. Set up environment variables
4. Configure MongoDB connection

### Generating Components

To generate new components (controllers, routes, services, etc.): `npx forgi generate`

You'll be prompted to enter:

- Entity name
- Project name
- Fields (comma-separated)
- Field types (comma-separated)

This will generate:

- Controller with CRUD operations
- Service layer with database operations
- Route definitions
- Mongoose model
- Validation schemas

### Supported Field Types

- string
- number
- boolean
- date
- objectid

## Available commands

- `npx forgi scaffold` - Creates and configures base project
- `npx forgi generate` - Generates new components for an entity
