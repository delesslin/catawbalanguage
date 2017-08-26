var MediaUpload = require('../');
var fs = require('fs');
var path = require('path');

// var oauthCreds = require('../config0.js');
var oauthCreds = {
	consumer_key: 'ctOTHRKn0rG4ASax46KpCoV0U'
	, consumer_secret: 'guhg0WugoYnbCRLi3eG8p8T4b9oT9SO4WqKCUx9F1ZZ9UUt0U4'
	, token: '885923200089174016-MJnO0q1lDQILfgLGrv21lOyA6ipr12a'
	, token_secret: 'jddIwCUPwIgM9E1ahDtJiDVPV4yF4h3DAjsjeayYa0VTN'
}

var media = fs.readFileSync(path.join(__dirname, 'video2.mp4'));

var media_upload = new MediaUpload(oauthCreds);
media_upload.uploadMedia('video', media, console.log);
