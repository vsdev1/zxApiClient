var config = {};
config.api = {};
config.api.host = 'api.zanox.com';
config.api.application_id = '';
config.api.public_key = '';
config.api.prefix_signature = 'ZXWS';
config.api.verb = 'GET';
config.api.sales_uri = '/reports/sales/date/';
config.api.datatype = 'json';
config.api.api_version = '2011-03-01';
	
// User specific conf
config.api.secret_key = ''; 
config.api.connect_id = ''; 

module.exports = config;