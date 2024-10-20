import { Consumer } from '../lib/soda-js';

var consumer = new Consumer('data.lacity.org');

consumer.query()
	.withDataset('63jg-8b9z')
	.limit(5)
	.where({ issuing_agency: 'LAPD' })
	.order('DR_NO', DESC)
	.getRows()
	.on('success', function(rows) { console.log(rows); })
	.on('error', function(error) { console.error(error); });

// API URL for LA Crime

// const LAcrimeUrl = "https://data.lacity.org/resource/2nrs-mtv8.json?$$app_token=cKFNajfV5dXE0VNv6LOpnAZqR&$order=DR_NO DESC&$limit=100000"

// // const LAcrimeUrl = "https://data.lacity.org/resource/2nrs-mtv8.json?" + "$select=DATE OCC,DR_NO" + "&$where=DATE OCC between '2023-09-01T00:00:00' and '2024-09-30T24:00:00'" + "&$$app_token=cKFNajfV5dXE0VNv6LOpnAZqR"

// // Fetch current information regarding LA Crime
// d3.json(LAcrimeUrl).then(function(data) {
//     console.log('Crime Information:', data);
// }).catch(function(error) {
//     console.error('Error fetching Crime data:', error);
// });