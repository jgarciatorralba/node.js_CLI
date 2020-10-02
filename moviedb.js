#!/usr/bin/env node

// Bring in 'commander' dependency
const { program } = require("commander");

// Add some basic info such as version and short description
program.version("1.0.0").description("Command Line Interface for TMDb API");

// Test that CLI actually works
program.parse(process.argv);
