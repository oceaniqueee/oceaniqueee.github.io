document.addEventListener('DOMContentLoaded', function () {
    const personalAccessToken = 'patkqoSMXyJT2r2rU.bf9dfb57446248ff640177ba3054d485c96d5fa716c2d537af4412e98f033fce'; // Replace with your Airtable API key
    const baseId = 'app1FO8Dyc0awQ1jo'; // Replace with your Airtable Base ID
    const tableName = 'art'; // Replace with your Airtable Table Name

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const headers = {
        Authorization: `Bearer ${personalAccessToken}`,
    };

    fetch(url, { headers })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Log the response to see its structure

            if (data.records) {
                data.records.forEach((record) => {
                    console.log('Retrieved', record.fields.Name); // Adjust based on your field names
                });
            } else {
                console.error('No records found.');
            }
        })
        .catch((error) => console.error('Error:', error));
});