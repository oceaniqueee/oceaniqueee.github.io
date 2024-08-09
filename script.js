document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'keyYurexeESWy31sK'; // Replace with your Airtable API key
    const baseId = 'app1FO8Dyc0awQ1jo' // Replace with your Airtable Base ID
    const tableName = 'art'; // Replace with your Airtable Table Name

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const headers = {
        Authorization: `Bearer ${apiKey}`,
    };

    fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
            const itemsContainer = document.getElementById('items-container');
            data.records.forEach((record) => {
                const item = record.fields;

                const itemElement = document.createElement('div');
                itemElement.classList.add('item');

                const imgElement = document.createElement('img');
                imgElement.src = item.Image[0].url; // Assuming Image is an attachment field
                itemElement.appendChild(imgElement);

                const titleElement = document.createElement('h2');
                titleElement.textContent = item.Name;
                itemElement.appendChild(titleElement);

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.Description;
                itemElement.appendChild(descriptionElement);

                const priceElement = document.createElement('p');
                priceElement.classList.add('price');
                priceElement.textContent = `$${item.Price}`;
                itemElement.appendChild(priceElement);

                itemsContainer.appendChild(itemElement);
            });
        })
        .catch((error) => console.error('Error fetching data:', error));
});
