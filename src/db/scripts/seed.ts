#!/usr/bin/env node

import pg from 'pg'
import initDotEnv from './env'

initDotEnv()

// You can use that in production
const seed = async () => {
  
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined')
  }

  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_URL}`)

  await client.connect()

  const start = Date.now()

  // password: rootroot1
  // username: bastien@test.fr
  await client.query(` 
      INSERT INTO "public"."users" ("id", "name", "email", "password", "salt", "role", "createdat", "updatedat", "deletedat") VALUES ('f1579709-9ef2-4e67-95cf-8dcd1509d3db', 'Bastien Dev', 'bastien@test.fr', '41aa7ceb301e25f151ad0bd15ee514982968eaa8594ee28bbb06288013969afe', '74aaa8b7fbf4cc3cb6e45ffeaa155045', 'SUPER_ADMIN', '2024-12-08', '2024-12-08', NULL);
    `)

  // Sources, you add more
  await client.query(`
    INSERT INTO "source" ("name") VALUES ('Other');
    INSERT INTO "source" ("name") VALUES ('Linkedin');
    INSERT INTO "source" ("name") VALUES ('Indeed');
    INSERT INTO "source" ("name") VALUES ('Google');
    INSERT INTO "source" ("name") VALUES ('Facebook');
  `)

  await client.query(`

    INSERT INTO technology (name, description, value)
VALUES 
    ('Java', 'An object-oriented programming language.', 1),
    ('JavaScript', 'A high-level, lightweight programming language.', 2),
    ('Python', 'A versatile high-level programming language.', 3),
    ('C++', 'A general-purpose, high-level programming language.', 4),
    ('Kotlin', 'A statically typed programming language for Java Virtual Machine (JVM).', 5),
    ('Ruby on Rails', 'A web application framework written in the Ruby programming language.', 6),
    ('Node.js', 'JavaScript runtime environment that allows you to run JavaScript code outside a browser.', 7),
    ('Docker', 'Open-source platform for developing, shipping, and running applications.', 8),
    ('Kubernetes', 'An open-source container orchestration system for automating software deployment, scaling, and management.', 9),
    ('Ansible', 'An automation platform that simplifies the process of application deployment and configuration management across multiple servers.', 10),
    ('Jenkins', 'A continuous integration/continuous deployment (CI/CD) server written in Java.', 11),
    ('GitHub', 'Web-based Git version control service with more than 50 million users.', 12),
    ('PHP', 'A server-side scripting language designed primarily for web development.', 13),
    ('Swift', 'An programming language developed by Apple Inc. for iOS, macOS, watchOS, and tvOS.', 14),
    ('Rust', 'Systems programming language that focuses on safety, concurrency, memory safety, and low-level control.', 15),
    ('Go (Golang)', 'A statically-typed language designed at Google by Robert Griesmer and Rob Pike for system programming.', 16),
    ('Scala', 'Multilingual static type system for functional programming using the Java Virtual Machine.', 17),
    ('Elixir', 'A dynamic, functional programming language designed for building scalable and maintainable applications.', 18),
    ('Clojure', 'Lisp-based programming language that provides a unique approach to software development.', 19),
    ('Haskell', 'A strictly typed, purely functional programming language.', 20),
    ('C#', 'General-purpose, object-oriented programming language developed by Microsoft.', 21),
    ('Groovy', 'Dynamic and reflective programming language for the Java platform.', 22),
    ('TypeScript', 'Superset of JavaScript for large-scale application development.', 23),
    ('Lua', 'Lightweight scripting language designed for embedding into applications.', 24),
    ('Erlang', 'Functional programming language used in telecommunications and real-time systems.', 26),
    ('MATLAB', 'Numerical computing environment and programming language developed by MathWorks.', 27),
    ('Pascal', 'High-level, procedural programming language designed for cross-platform development.', 28),
    ('Prolog', 'Logic programming language developed in the 1970s.', 29),
    ('Smalltalk', 'Object-oriented programming language created at Xerox PARC in the 1970s.', 30),
    ('FORTRAN (Fortran)', 'High-level programming language used for scientific and engineering calculations.', 31),
    ('Julia', 'High-level, high-performance programming language.', 32),
    ('R', 'Programming language and software environment for statistical computing and graphics.', 34),
    ('Elm', 'Functional programming language for web applications.', 37),
    ('F#', 'Multilingual, functional-first programming language designed to integrate with .NET framework.', 38),
    ('Lisp (Common Lisp)', 'General-purpose, high-level programming language first implemented in 1958.', 39),
    ('Haxe', 'High-level, multi-paradigm programming language for game development.', 41),
    ('D', 'General-purpose, imperative programming language developed by Digital Mars and improved by Chris Lattner at Apple Inc.', 52);
    
  `)

  const end = Date.now()

  console.log('✅ Seed inserted in', end - start, 'ms')

  process.exit(0)
}

export default seed

async function main() {
  try {
    await seed()
  } catch (error) {
    console.error('❌ Connexion failed')
    console.error(error)
    process.exit(1)
  }
}

main()
