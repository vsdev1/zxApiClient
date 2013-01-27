	function createSignature(httpVerb, uriPath, secretKey) {
		var timestamp = createTimestamp();
		var nonce = createNonce();
		var input = createInput(httpVerb, uriPath, timestamp, nonce);
		// example for an input: GET/profilesMon, 09 Jun 2008 08:17:35 GMT01234567890123456789
		var signature = createSignatureForInput(input, secretKey);
		
//		console.log('signature=' + signature);
		var returnValue = {signature: signature, timestamp: timestamp, nonce: nonce};
		console.log('signature:', returnValue);
		return returnValue;
	}
	
	function createInput(httpVerb, uriPath, timeStamp, nonce) {
		var input = httpVerb + uriPath.toLowerCase() + timeStamp + nonce;
		console.log('input=' + input);

		return input;
	}

	function createSignatureForInput(input, secretKey){
		var sha1 = Crypto.SHA1;
		var hmacBytes = Crypto.HMAC(sha1, input, secretKey, { asBytes: true });
		return Crypto.util.bytesToBase64(hmacBytes);
	}
	
	function createNonce() {
//    var input = Math.floor(Math.random()*89999+10000);
		var currentTime = new Date().getTime();
		var randomNumber = Math.abs(Math.random());

		var input = currentTime.toString() + randomNumber.toString();

		var nonce = createHexMd5(input);
		console.log('nonce=' + nonce);
		
		return nonce; 
	}

	function createHexMd5(input){
		return hex_md5(input);
	}
	
	function createTimestamp() {
		var date = new Date()
    gmtDateString = date.toGMTString()
    
    console.log('GMT date string=' + gmtDateString);
    return gmtDateString;
	}

	function testCreateSignature() {
		var signature = createSignature('GET', '/profiles', 'testSecretKey');
//		alert('signature=' + signature);
	}

// http://wiki.zanox.com/en/RESTful_API_V20110301
// http://wiki.zanox.com/en/API_Most_Frequent_Use_Cases



