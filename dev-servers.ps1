# Development Server Manager for Windows PowerShell
# This script helps you start both frontend and backend servers

param(
    [Parameter(Position=0)]
    [ValidateSet("start", "backend", "frontend", "status", "stop")]
    [string]$Action = "start"
)

function Start-Backend {
    Write-Host "📡 Starting Backend Server (Port 5000)..." -ForegroundColor Green
    Set-Location "Google-hackathon\Backend"
    Start-Process powershell -ArgumentList "-Command", "npm start" -WindowStyle Minimized
    Write-Host "✅ Backend started" -ForegroundColor Green
}

function Start-Frontend {
    Write-Host "🎨 Starting Frontend Server (Port 5173)..." -ForegroundColor Blue
    Set-Location "Google-hackathon\Frontend"
    Start-Process powershell -ArgumentList "-Command", "npm run dev" -WindowStyle Minimized
    Write-Host "✅ Frontend started" -ForegroundColor Blue
}

function Test-Servers {
    Write-Host "🔍 Checking server status..." -ForegroundColor Yellow
    
    # Check backend
    try {
        $backendResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/signup" -Method POST -ContentType "application/json" -Body '{"username":"test","email":"test@test.com","password":"password123"}' -ErrorAction SilentlyContinue
        Write-Host "✅ Backend (Port 5000): Running" -ForegroundColor Green
    } catch {
        Write-Host "❌ Backend (Port 5000): Not running" -ForegroundColor Red
    }
    
    # Check frontend
    try {
        $frontendResponse = Invoke-WebRequest -Uri "http://localhost:5173" -ErrorAction SilentlyContinue
        Write-Host "✅ Frontend (Port 5173): Running" -ForegroundColor Green
    } catch {
        Write-Host "❌ Frontend (Port 5173): Not running" -ForegroundColor Red
    }
}

function Stop-Servers {
    Write-Host "🛑 Stopping all servers..." -ForegroundColor Red
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "✅ All servers stopped" -ForegroundColor Green
}

# Main execution
switch ($Action) {
    "start" {
        Start-Backend
        Start-Sleep -Seconds 2
        Start-Frontend
        Write-Host "🎉 Both servers started!" -ForegroundColor Cyan
        Write-Host "📡 Backend: http://localhost:5000" -ForegroundColor Green
        Write-Host "🎨 Frontend: http://localhost:5173" -ForegroundColor Blue
    }
    "backend" {
        Start-Backend
    }
    "frontend" {
        Start-Frontend
    }
    "status" {
        Test-Servers
    }
    "stop" {
        Stop-Servers
    }
    default {
        Write-Host "Usage: .\dev-servers.ps1 {start|backend|frontend|status|stop}" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Commands:" -ForegroundColor White
        Write-Host "  start     - Start both frontend and backend servers" -ForegroundColor Green
        Write-Host "  backend   - Start only backend server" -ForegroundColor Green
        Write-Host "  frontend  - Start only frontend server" -ForegroundColor Green
        Write-Host "  status    - Check server status" -ForegroundColor Green
        Write-Host "  stop      - Stop all servers" -ForegroundColor Green
    }
}
