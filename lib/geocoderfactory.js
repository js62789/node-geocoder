(function() {

	var Helper = require('./helper.js');

	var Geocoder = require('./geocoder.js');

	var GeocoderFactory = {

		_getHttpAdapter: function(adapterName) {

			if (adapterName === 'requestify') {
				var RequestifyAdapter = new require('./httpadapter/requestifyadapter.js');

				return new RequestifyAdapter();
			}

			if (adapterName === 'http') {
				var HttpAdapter = new require('./httpadapter/httpadapter.js');

				return new HttpAdapter();
			}
		},
		_getGeocoder: function(geocoderName, adapter) {
			if (geocoderName === 'google') {
				var GoogleGeocoder = new require('./geocoder/googlegeocoder.js');

				return new GoogleGeocoder(adapter);
			}
			if (geocoderName === 'freegeoip') {
				var FreegeoipGeocoder = new require('./geocoder/freegeoipgeocoder.js');

				return new FreegeoipGeocoder(adapter);
			}
			if (geocoderName === 'datasciencetoolkit') {
				var DataScienceToolkitGeocoder = new require('./geocoder/datasciencetoolkitgeocoder.js');

				return new DataScienceToolkitGeocoder(adapter);
			}
			if (geocoderName === 'openstreetmap') {
				var OpenStreetMapGeocoder = new require('./geocoder/openstreetmapgeocoder.js');

				return new OpenStreetMapGeocoder(adapter);
			}
		},
		_getFormatter: function(formatterName) {
			if (formatterName === 'gpx') {
				var GpxFormatter = new require('./formatter/gpxformatter.js');

				return new GpxFormatter();
			}
		},
		getGeocoder: function(geocoderAdapter, httpAdapter, formatter) {

			if (!httpAdapter || httpAdapter === 'undefined') {
				httpAdapter = 'http';
			}

			if (Helper.isString(httpAdapter)) {
				httpAdapter = this._getHttpAdapter(httpAdapter);
			}

			if (Helper.isString(geocoderAdapter)) {
				geocoderAdapter = this._getGeocoder(geocoderAdapter, httpAdapter);
			}
			
			if (Helper.isString(formatter)) {
				formatter = this._getFormatter(formatter);
			}

			var geocoder = new Geocoder(geocoderAdapter, formatter);

			return geocoder;
		}

	};

	module.exports = GeocoderFactory;

})();