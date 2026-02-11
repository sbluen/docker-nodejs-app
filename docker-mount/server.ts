import express, { Express, Request, Response } from 'express';
import ejs from 'ejs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import 'dotenv/config';

const prisma = new PrismaClient();

const app: Express = express();

const hostname = '0.0.0.0';
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'public'));

// Route for the home page
app.get('/', (req: Request, res: Response) => {
   res.render('index.html');
});

// Route for the mount page
app.get('/mount', (req: Request, res: Response) => {
   res.render('mount.html');
});

// Route to serve JSON data
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const definitions = await prisma.definitions.findMany({
      orderBy: { row_id: 'asc' },
    });

    res.json({
      message: 'Hello World from JSON API',
      timestamp: new Date(),
      data: definitions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

const typeDefs = `
type Definition {
  row_id: ID!
  term: String!
  meaning: String!
}

type Query {
  definitions: [Definition]
}`

const resolvers = {
  Query: {
    definitions: async () => {
      return await prisma.definitions.findMany({
        orderBy: { row_id: 'asc' },
      });
    },
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  graphiql: true, // Enable GraphiQL interface for testing
}))

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`JSON API available at http://localhost:${port}/api/data`);
});