#!/bin/bash

# Development Server Manager
# This script helps you start both frontend and backend servers

echo "🚀 Starting Development Servers..."

# Function to start backend
start_backend() {
    echo "📡 Starting Backend Server (Port 5000)..."
    cd "Google-hackathon/Backend"
    npm start &
    BACKEND_PID=$!
    echo "✅ Backend started with PID: $BACKEND_PID"
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting Frontend Server (Port 5173)..."
    cd "Google-hackathon/Frontend"
    npm run dev &
    FRONTEND_PID=$!
    echo "✅ Frontend started with PID: $FRONTEND_PID"
}

# Function to check if servers are running
check_servers() {
    echo "🔍 Checking server status..."
    
    # Check backend
    if curl -s http://localhost:5000/api/auth/signup > /dev/null 2>&1; then
        echo "✅ Backend (Port 5000): Running"
    else
        echo "❌ Backend (Port 5000): Not running"
    fi
    
    # Check frontend
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo "✅ Frontend (Port 5173): Running"
    else
        echo "❌ Frontend (Port 5173): Not running"
    fi
}

# Function to stop all servers
stop_servers() {
    echo "🛑 Stopping all servers..."
    pkill -f "npm start"
    pkill -f "npm run dev"
    pkill -f "node.*server.js"
    pkill -f "vite"
    echo "✅ All servers stopped"
}

# Main menu
case "$1" in
    "start")
        start_backend
        sleep 2
        start_frontend
        echo "🎉 Both servers started!"
        echo "📡 Backend: http://localhost:5000"
        echo "🎨 Frontend: http://localhost:5173"
        ;;
    "backend")
        start_backend
        ;;
    "frontend")
        start_frontend
        ;;
    "status")
        check_servers
        ;;
    "stop")
        stop_servers
        ;;
    *)
        echo "Usage: $0 {start|backend|frontend|status|stop}"
        echo ""
        echo "Commands:"
        echo "  start     - Start both frontend and backend servers"
        echo "  backend   - Start only backend server"
        echo "  frontend  - Start only frontend server"
        echo "  status    - Check server status"
        echo "  stop      - Stop all servers"
        ;;
esac
