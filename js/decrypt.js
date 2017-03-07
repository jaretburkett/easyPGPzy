$(function () {

    // decrypt form
    $('#decryptform').submit(function (event) {
        event.preventDefault();

        popup(true, 'Decrypting');

        getKey.privateKey(function (err, key) {
            if (err) {
                error(err);
            } else {
                privkey = key;
                decryptMessage();
            }
        });
    });
});

function decryptMessage() {
    // get form
    // console.log(privkey);

    var encryptedmessage = $('#encryptedmessage').val();
    console.log(encryptedmessage);

    var privKeyDE = openpgp.key.readArmored(privkey).keys[0];
    privKeyDE.decrypt($('#pkpassword').val());
    try {
        var options = {
            message: openpgp.message.readArmored(encryptedmessage),     // parse armored message
            privateKey: privKeyDE // for decryption
        };
    } catch (e) {
        console.log(e);
        error('Not a valid encrypted message');
        return false;
    }

    console.log(options);
    openpgp.decrypt(options).then(function (plaintext) {
        popup(false);
        var formattedPT = plaintext.data.replace(/(?:\r\n|\r|\n)/g, '<br />');
        $('#decrypted-message').html(formattedPT); // Uint8Array([0x01, 0x01, 0x01])
    }).catch(function (err) {
        // needs password
        error('Wrong private key or passphrase');
        return false;
    });
}

