const { execSync } = require('child_process');

function fetchRepository({ url, dir}) {
    try {
        execSync(`cd ${dir} && git clone ${url}`, { stdio: 'inherit' });
    } catch (error) {
        console.error('Error fetching repository:', error);
    }
}

module.exports = { 
    fetchRepository 
};