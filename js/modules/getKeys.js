var fs = require('fs');

var privateKey = function (callback) {
    try {
        var privkeyPath = $('#private-key')[0].files[0].path;
    } catch (e) {
        callback('No Key Selected', null);
        return false;
    }

    fs.readFile(privkeyPath, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            var keyString = data.toString();

            var privateKeyStart = '-----BEGIN PGP PRIVATE KEY BLOCK-----';
            var privateKeyEnd = '-----END PGP PRIVATE KEY BLOCK-----';

            // check if is valid private key
            if (keyString.indexOf(privateKeyStart) !== -1 &&
                keyString.indexOf(privateKeyEnd) !== -1) {
                // we have a private key
                // extract just the private key portion
                var privateKey = keyString.match(/-----BEGIN PGP PRIVATE KEY BLOCK-----(.*\s)*-----END PGP PRIVATE KEY BLOCK-----/)[0];
                callback(false, privateKey);
            } else {
                // not a pgp key
                callback('Not a PGP private key', null);
                return false;
            }
        }
    });
};
var publicKey = function (callback) {
    try {
        var privkeyPath = $('#private-key')[0].files[0].path;
    } catch (e) {
        callback('No Key Selected', null);
        return false;
    }

    fs.readFile(privkeyPath, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            var keyString = data.toString();

            var publicKeyStart = '-----BEGIN PGP PUBLIC KEY BLOCK-----';
            var publicKeyEnd = '-----END PGP PUBLIC KEY BLOCK-----';

            // check if is valid private key
            if (keyString.indexOf(publicKeyStart) !== -1 &&
                keyString.indexOf(publicKeyEnd) !== -1) {
                // we have a private key
                // extract just the private key portion
                var publicKey = keyString.match(/-----BEGIN PGP PUBLIC KEY BLOCK-----(.*\s)*-----END PGP PUBLIC KEY BLOCK-----/)[0];
                callback(false, publicKey);
            } else {
                // not a pgp key
                callback('Not a PGP combo key', null);
                return false;
            }
        }
    });
};

var keys = function (callback) {
    try {
        var privkeyPath = $('#private-key')[0].files[0].path;
    } catch (e) {
        callback('No Key Selected', null);
        return false;
    }

    fs.readFile(privkeyPath, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            var keyString = data.toString();

            var privateKeyStart = '-----BEGIN PGP PRIVATE KEY BLOCK-----';
            var privateKeyEnd = '-----END PGP PRIVATE KEY BLOCK-----';
            var publicKeyStart = '-----BEGIN PGP PUBLIC KEY BLOCK-----';
            var publicKeyEnd = '-----END PGP PUBLIC KEY BLOCK-----';

            // check if is valid private key
            if (keyString.indexOf(privateKeyStart) !== -1 &&
                keyString.indexOf(privateKeyEnd) !== -1 &&
                keyString.indexOf(publicKeyStart) !== -1 &&
                keyString.indexOf(publicKeyEnd) !== -1) {
                // we have a private key
                // extract just the private key portion
                var privateKey = keyString.match(/-----BEGIN PGP PRIVATE KEY BLOCK-----(.*\s)*-----END PGP PRIVATE KEY BLOCK-----/)[0];
                var publicKey = keyString.match(/-----BEGIN PGP PUBLIC KEY BLOCK-----(.*\s)*-----END PGP PUBLIC KEY BLOCK-----/)[0];
                callback(false, privateKey, publicKey);
            } else {
                // not a pgp key
                callback('Not a PGP combo key', null, null);
                return false;
            }
        }
    });
};

exports.privateKey = privateKey;
exports.publicKey = publicKey;
exports.keys = keys;