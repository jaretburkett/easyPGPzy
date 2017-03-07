/**
 * Generate a Private and Public keypair
 * @param  {numBits} Integer - Any multiple of 1024. 2048 is recommended.
 * @param  {userid} String - should be like: Alice Mayfield <amayfield@quantum.com>
 * @param  {passphrase} String - password should be a 4-5 word sentence (20+ chars)
 * @return {key} String - Encrypted ASCII armored keypair (contains both Private and Public keys)
 */

var genPrivkey = '';
var genPubkey = '';

$(function () {
    $('#gen-key').submit(function (event) {
        event.preventDefault();

        var options = {
            userIds: [{
                name:$('#gen-name').val(),
                email:$('#gen-email').val()
            }],
            numBits: 4096, // RSA key size
            passphrase: $('#gen-pkpassword').val()
        };
        popup(true, 'Generating Keys: Will take a while');
        openpgp.generateKey(options).then(function(key) {
            // genPrivkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
            // genPubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
            var tmpPrivkey = key.privateKeyArmored.match(/(\S{50,})(\s.*)[^---]*/)[0]; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
            var tmpPubkey = key.publicKeyArmored.match(/(\S{50,})(\s.*)[^---]*/)[0];   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

            // clean keys
            var keyInfo = {
                privateKey:{
                    start:'-----BEGIN PGP PRIVATE KEY BLOCK-----',
                    end:'-----END PGP PRIVATE KEY BLOCK-----'
                },
                publicKey:{
                    start:'-----BEGIN PGP PUBLIC KEY BLOCK-----',
                    end:'-----END PGP PUBLIC KEY BLOCK-----'
                },
                tags:'Version: '+keyTags.version
            };

            genPubkey = keyInfo.publicKey.start + '\n'+keyInfo.tags+'\n \n'+tmpPubkey+keyInfo.publicKey.end;
            genPrivkey = genPubkey + '\n \n \n '+ keyInfo.privateKey.start+ '\n'+keyInfo.tags+ '\n \n'+tmpPrivkey+keyInfo.privateKey.end;

            popup(false);
            console.log(genPrivkey);
            console.log(genPubkey);

            var dateFormat = require('dateformat');
            var now = new Date();
            var cleandate = dateFormat(now, "mmmm dS, yyyy, h:MM:ss TT");

            var str = '<div class="gen-key-timestamp"><strong>Created: </strong>'+cleandate+'</div> ' +
                '<div class="row">';
            str += '<div class="col-xs-6">';
            str += '<button id="save-priv" class="btn btn-default btn-block">Save Private</button>';
            str += '</div>';
            str += '<div class="col-xs-6">';
            str += '<button id="save-pub" class="btn btn-default btn-block">Save Public</button>';
            str += '</div>';
            str += '</div>';
            $('#gen-keys').html(str);

            // set callbacks
            $('#save-priv').click(function(){
                savePrivateKey();
            });

            $('#save-pub').click(function(){
                savePublicKey();
            })
        });

    });
});

function savePrivateKey(){
    dialog.showSaveDialog({
        title: 'privateKey',
        defaultPath: '~/privateKey.asc',
        filters: [
            {name: 'PGP Key', extensions: ['asc']},
            {name: 'All Files', extensions: ['*']}
        ]
    }, function(result){
        if ( typeof result !== 'undefined' && result ) {
            // write key to path
            fs.writeFile(result, genPrivkey, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
        // no nothing if they canceled
        console.log(result);
    });
}

function savePublicKey(){
    dialog.showSaveDialog({
        title: 'publicKey',
        defaultPath: '~/publicKey.asc',
        filters: [
            {name: 'PGP Key', extensions: ['asc']},
            {name: 'All Files', extensions: ['*']}
        ]
    }, function(result){
        if ( typeof result !== 'undefined' && result ) {
            // write key to path
            fs.writeFile(result, genPubkey, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
        // do nothing if they canceled
        console.log(result);
    });
}