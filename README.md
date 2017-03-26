# Stock Visualizer
This application uses gets Flash Quotes from the Nasdaq-100 via a CSV file and
converts it to JSON data. AngularJS is then used to get that data from a
Flask API endpoint and then display the data in both an HTML table and the
D3.js JavaScript library to create a visualization of that stock data.

It is based on the following blog post https://realpython.com/blog/python/web-development-with-flask-fetching-data-with-requests/, but has been updated to use AngularJS and D3.js version 4.
