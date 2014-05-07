<?php
function getDistance($lat1, $lon1, $lat2, $lon2) {
	$R = 6371;
	$dLat = deg2rad($lat2 - $lat1);
	$dLon = deg2rad($lon2 - $lon1);
	$a = sin($dLat/2) * sin($dLat/2) +
		cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
		sin($dLon/2) * sin($dLon/2);

	$c = 2 * atan2(sqrt(a), sqrt(1-a));
	$d = R * c;
	return $d;
}

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

$hospitals = array(
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

header("content-type:application/json");

if(isset($_GET['lat']) && isset($_GET['long'])) {
	header("HTTP/1.0 200 Found");

	// get the distance
	foreach($hospitals as $key => $hospital) {
		
		//$distance = distance(floatval($_GET['lat']), floatval($_GET['long']), $hospital['latitude'], $hospital['longitude'], 'K');
		$distance = distance(floatval($_GET['lat']), floatval($_GET['long']), $hospital['latitude'], $hospital['longitude']);
		
		// modify the original array
		$hospitals[$key]['distance'] = $distance;

	}

	// sort by distance
	function sortByDistance($a, $b) {
	    return $a['distance'] - $b['distance'];
	}
	usort($hospitals, 'sortByDistance');

	// crop
	if(isset($_GET['number'])) {
		$hospitals = array_slice($hospitals, 0, intval($_GET['number']));
	}

	echo json_encode($hospitals);

} else {
	header("HTTP/1.0 404 Not Found");
	echo json_encode(array(
		'message' => 'Parameters missing'
	));
}