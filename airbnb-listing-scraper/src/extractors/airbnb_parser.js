onst axios = require('axios');
const cheerio = require('cheerio');

async function extractAirbnbData(url) {
const response = await axios.get(url);
const $ = cheerio.load(response.data);

const data = {
url: url,
headline: $('h1').text().trim(),
name: $('h2').text().trim(),
description: $('div[data-testid="description"]').text().trim(),
images: extractImages($),
location: extractLocation($),
host: extractHost($),
rating: extractRating($),
};

return data;
}

function extractImages($) {
const images = [];
$('img').each((index, element) => {
images.push({
url: $(element).attr('src'),
caption: $(element).attr('alt'),
});
});
return images;
}

function extractLocation($) {
const location = {
address: {
city: $('div[data-testid="address"]').text().trim(),
country: 'Unknown',
postcode: 'Unknown',
},
coordinates: {
lat: 'Unknown',
lng: 'Unknown',
},
};
return location;
}

function extractHost($) {
const host = {
name: $('span[data-testid="host_name"]').text().trim(),
superhost: $('span[data-testid="superhost_badge"]').length > 0,
};
return host;
}

function extractRating($) {
const rating = {
overall_rating: parseFloat($('span[data-testid="rating_value"]').text().trim()),
total_reviews: parseInt($('span[data-testid="review_count"]').text().trim()),
};
return rating;
}

module.exports = { extractAirbnbData };