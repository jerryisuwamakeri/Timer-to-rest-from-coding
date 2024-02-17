import * as vscode from 'vscode';

let codingHoursThisWeek: number = 0;
const MAX_WEEKLY_HOURS = 70;
let timer: NodeJS.Timeout | undefined = undefined;

// Function to update coding hours
function updateCodingHours() {
    codingHoursThisWeek += 1; // Incrementing by 1 hour for demonstration purposes

    // Check if weekly hours exceed the threshold and show notification
    if (codingHoursThisWeek > MAX_WEEKLY_HOURS) {
        vscode.window.showInformationMessage(`Warning: You've coded ${codingHoursThisWeek} hours this week! Consider taking a break.`);
    }
}

// Function to start the timer
function startTimer() {
    if (!timer) {
        timer = setInterval(updateCodingHours, 3600000); // 1 hour in milliseconds
    }
}

// Function to stop the timer
function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
    }
}

// Activate function for the extension
export function activate(context: vscode.ExtensionContext) {
    // Start the timer when the extension is activated
    startTimer();

    // Update coding hours when files change
    vscode.workspace.onDidChangeTextDocument(() => {
        updateCodingHours();
    });
}

// Deactivate function for the extension
export function deactivate() {
    // Stop the timer when the extension is deactivated
    stopTimer();
}
