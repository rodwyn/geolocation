<?php
/**
 * Get the distance between two sets of coordinates
 * using the haversine formula
 * @param {Float} $lat1
 * @param {Float} $lon1
 * @param {Float} $lat2
 * @param {Float} $lon2
 * @param {Char} $unit
 * @return {Float} distance
 */
function distance($lat1, $lon1, $lat2, $lon2, $unit) {
	$theta = $lon1 - $lon2;
	$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
	$dist = acos($dist);
	$dist = rad2deg($dist);
	$miles = $dist * 60 * 1.1515;
	$unit = strtoupper($unit);

	if ($unit == "K") {
		return ($miles * 1.609344);
	} else if ($unit == "N") {
		return ($miles * 0.8684);
	} else {
		return $miles;
	}
}

// response type is json
header("content-type:application/json");

if(isset($_GET['lat']) && isset($_GET['long'])) {

	// all the results
	$items = array(
		array(
			'name' => 'Hello',
			'latitude' => 43.540585,
			'longitude' => 58.183594
		),
		array(
			'name' => 'World',
			'latitude' => 27.281485,
			'longitude' => 106.040039
		),
		array(
			'name' => 'Foo',
			'latitude' => 27.319124,
			'longitude' => 107.508774
		),
		array(
			'name' => 'Bar',
			'latitude' => 27.948123,
			'longitude' => 108.286057
		),array(
			'name' => 'Shanghai',
			'latitude' => 32.281328,
			'longitude' => 119.948730
		)
	);

	// get the distance with each of the items
	foreach($items as $key => $item) {
		$distance = distance(
			floatval($_GET['lat']),
			floatval($_GET['long']),
			$item['latitude'],
			$item['longitude'],
			'K'
		);

		// add the distance to the original array
		$items[$key]['distance'] = $distance;
	}

	// // sort by distance
	function sortByDistance($a, $b) {
	    return $a['distance'] - $b['distance'];
	}
	usort($items, 'sortByDistance');

	// crop the array
	if(isset($_GET['number'])) {
		$items = array_slice($items, 0, intval($_GET['number']));
	}

	// send a success header
	header("HTTP/1.0 200 Found");

	// response body
	echo(json_encode($items));

} else {

	// missing parameters, send an error header
	header("HTTP/1.0 404 Not Found");

	// response body
	echo json_encode(array(
		'message' => 'Parameters missing'
	));

}