async function loadPortfolio() {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSTm_oPJaAflw7ka_j7A9GFeREFVKX7By3gCMsB34gVzBcp6zR8GGlnNP5apOVy56vVz5W7526h8Ox3/pub?gid=0&single=true&output=csv'; // Replace with your published CSV URL
    
    console.log('Starting to load portfolio...');
    
    try {
        console.log('Fetching from:', sheetURL);
        const response = await fetch(sheetURL);
        const csvText = await response.text();
        
        console.log('CSV Text received:', csvText.substring(0, 200)); // First 200 chars
        
        // Parse CSV with PapaParse
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                console.log('Parse complete. Results:', results);
                console.log('Number of rows:', results.data.length);
                console.log('First row:', results.data[0]);
                
                const container = document.getElementById('portfolio-container');
                console.log('Container found:', container);
                
                // Get first 10 items
                const items = results.data.slice(0, 10);
                console.log('Items to display:', items.length);
                
                items.forEach((row, index) => {
                    console.log(`Processing row ${index}:`, row);
                    
                    if (!row.Headline) {
                        console.log(`Skipping row ${index} - no headline`);
                        return;
                    }
                    
                    const portfolioItem = document.createElement('div');
                    portfolioItem.className = 'uk-width-3-4@m uk-margin-auto';
                    
                    portfolioItem.innerHTML = `
                        <div class="uk-cover-container clip">
                            <a href="${row.URL || '#'}">
                                <img uk-cover src="${row['Image URL'] || 'default-image.jpg'}" />
                            </a>
                        </div>
                        <h5 class="date">${row.Publication || ''} | ${row.Date || ''}</h5>
                        <h3 class="headline">
                            <a href="${row.URL || '#'}">
                                ${row.Headline || ''}
                            </a>
                        </h3>
                        <p>${row.Description || ''}</p>
                        <hr class="uk-divider-small">
                    `;
                    
                    container.appendChild(portfolioItem);
                    console.log(`Added item ${index} to container`);
                });
                
                console.log('Finished loading portfolio');
            },
            error: function(error) {
                console.error('Error parsing CSV:', error);
            }
        });
    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
}

// Load portfolio when page loads
document.addEventListener('DOMContentLoaded', loadPortfolio);
