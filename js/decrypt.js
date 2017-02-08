
$(function(){

    // decrypt form
    $('#decryptform').submit(function( event ) {
        event.preventDefault();

        popup(true, 'Decrypting');

        // get private key
        var privkeyPath = $(this)[0].files[0].path;
        fs.readFile(privkeyPath, 'utf8', function (err,data) {
            if (err) {
                return alert(err);
            }
            privkey = data.toString();
            decryptMessage();
        });
    });

});

function decryptMessage(){
    // get form
    console.log(privkey);

    var encryptedmessage = $('#encryptedmessage').val();
    console.log(encryptedmessage);

    var privKeyDE = openpgp.key.readArmored(privkey).keys[0];
    privKeyDE.decrypt($('#pkpassword').val());

    var options =  {
        message: openpgp.message.readArmored(encryptedmessage),     // parse armored message
        privateKey: privKeyDE // for decryption
    };
    console.log(options);
    openpgp.decrypt(options).then(function(plaintext) {
        popup(false);
        var formattedPT = plaintext.data.replace(/(?:\r\n|\r|\n)/g, '<br />');
        $('#decrypted-message').html(formattedPT); // Uint8Array([0x01, 0x01, 0x01])
    });
}

