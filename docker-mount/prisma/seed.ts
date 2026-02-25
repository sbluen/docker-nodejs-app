import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.definitions.createMany({
        data: [
{ term: "Express.js", meaning: "A fast, unopinionated, minimalist web framework for Node.js that simplifies the development of server-side applications." },
{ term: "TypeScript", meaning: "An open-source programming language developed and maintained by Microsoft, which is a strict syntactical superset of JavaScript and adds optional static typing." },
{ term: "jQuery", meaning: "A fast, small, and feature-rich JavaScript library that makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API." },   
{ term: "Node.js", meaning: "A JavaScript runtime environment built on Chrome's V8 engine, used for building scalable server-side applications and network applications." },
{ term: "Docker", meaning: "A platform for developing, shipping, and running applications inside lightweight, portable containers that ensure consistency across environments." },
{ term: "Bind Mount", meaning: "A Docker volume type that maps a specific file or directory from the host machine directly into a container, allowing real-time file sharing." },
{ term: "JSON", meaning: "JavaScript Object Notation, a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate." },
{ term: "SQLite", meaning: "A lightweight, serverless, self-contained relational database engine that stores data in a single file, making it ideal for embedded applications, mobile apps, and small to medium-sized projects where simplicity and zero-configuration are key." },
{ term: "JSON API", meaning: "An application programming interface using JavaScript Object Notation, a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate." },
{ term: "GraphQL", meaning: "GraphQL is a query language and runtime for APIs that lets clients request exactly the data they need in a single structured query." },
                ],
    });
    console.log("Seed data inserted successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });