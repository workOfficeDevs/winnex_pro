// Alternative public access configuration
// This file helps ensure external access to the platform

const express = require('express');
const cors = require('cors');

// Enable CORS for all origins to allow external access
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

module.exports = { corsOptions };