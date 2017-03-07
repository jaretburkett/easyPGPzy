var publicKey = '';

$(function(){

    // encrypt form
    $('#encryptform').submit(function( event ) {
        event.preventDefault();

        // get private key
        publicKey = $('#encrypt-key').val();
        var message = $('#encrypt-message').val();

        var options = {
            data: message,
            publicKeys: openpgp.key.readArmored(publicKey).keys
        };
        var messageInfo = {
            start: '-----BEGIN PGP MESSAGE-----',
            end: '-----END PGP MESSAGE-----',
            tags: 'Version: ' + keyTags.version
        };
        popup(true, 'Encrypting');
        openpgp.encrypt(options).then(function (ciphertext) {
            popup(false);
            var encryptedMessage = ciphertext.data;
            // get just key
            encryptedMessage = encryptedMessage.match(/(\S{50,})(\s.*)[^---]*/)[0];

            encryptedMessage = messageInfo.start + '\n' + messageInfo.tags + '\n \n' + encryptedMessage + messageInfo.end;

            encryptedMessage = encryptedMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $('#encrypt-encrypted-message').html(encryptedMessage);
        }).catch(function (err) {
            // needs password
            error(err);
            return false;
        });
    });

    // get public key upload
    $('#encrypt-public-key-file').change(function(){
        var pubKeyPath = $(this)[0].files[0].path;
        fs.readFile(pubKeyPath, 'utf8', function (err,data) {
            if (err) {
                return alert(err);
            }
            $('#encrypt-key').val(data.toString());
        });

    });

});
