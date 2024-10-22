document.getElementById('fetch-news').addEventListener('click', fetchNews);

const apiKey = '6619367bff32d8e0f2158b49d73e8231'; 
const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${apiKey}`; 

async function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    const loadingDiv = document.getElementById('loading');
    newsContainer.innerHTML = ''; 
    loadingDiv.style.display = 'block';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newsData = await response.json();
        displayNews(newsData);
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `<p>Error fetching news: ${error.message}. Please try again.</p>`;
    } finally {
        loadingDiv.style.display = 'none'; 
    }
}

function displayNews(data) {
    const newsContainer = document.getElementById('news-container');

    if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';
            
            const title = document.createElement('h2');
            const description = document.createElement('p');
            const link = document.createElement('a');

            title.textContent = article.title;
            description.textContent = article.description || 'No description available.';
            link.href = article.url;
            link.textContent = 'Read more';
            link.target = '_blank';

            articleDiv.appendChild(title);
            articleDiv.appendChild(description);
            articleDiv.appendChild(link);
            newsContainer.appendChild(articleDiv);
        });
    } else {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
    }
}
