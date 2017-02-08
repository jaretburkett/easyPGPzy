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
        popup(true, 'Encrypting');
        openpgp.encrypt(options).then(function(ciphertext) {
            popup(false);
            var encryptedMessage = ciphertext.data;
            encryptedMessage = encryptedMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $('#encrypt-encrypted-message').html(encryptedMessage);
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
