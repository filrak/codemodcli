const { execSync } = require('child_process');

function fetchRepository({ url, copyTo}) {
    try {
        execSync(`cd ${copyTo} && git clone ${url}`, { stdio: 'inherit' });
    } catch (error) {
        console.error('Error fetching repository:', error);
    }
}

module.exports = { 
    fetchRepository 
};