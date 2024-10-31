const { execSync } = require('child_process');

function fetchRepository(repoUrl) {
    try {
        execSync(`cd playground && git clone ${repoUrl}`, { stdio: 'inherit' });
    } catch (error) {
        console.error('Error fetching repository:', error);
    }
}

module.exports = { 
    fetchRepository 
};