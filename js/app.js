/**
 * Created by jaretburkett on 2/6/17.
 */

const openpgp = require('openpgp');
const fs = require('fs');
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
const dateFormat = require('dateformat');
var shell = require('electron').shell;
var getKey = require('./js/modules/getKey');

// get isdev
var isDev = remote.getGlobal('sharedObject').isDev;

// globals
var keyTags = {
    version: 'easyPGP v1.0.101'
};

// globals
var privkey = '';

openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' }); // set the relative web worker path

// openpgp.config.aead_protect = true ;// activate fast AES-GCM mode (not yet OpenPGP standard)


$(function() {
    // show decrypt on load
    $('#section-decrypt').show();

    // link clicks
    $('.sec-link').click(function () {
        // hide sections
        $('section').hide();

        // remove active li
        $('.navbar-nav li').removeClass('active');
        $(this).parent().addClass('active');

        var section = $(this).attr('data-id');

        $('#section-' + section).show();
    });

    //open links externally by default
    $(document).on('click', 'a[href^="http"]', function(event) {
        event.preventDefault();
        shell.openExternal(this.href);
    });

    // donate button
    $('#donate-button').click(function(){
        $('.donate-message').fadeIn( 400, function() {

        });
    });

    // close donate message
    $('.donate-message').click(function(event){
        if($( event.target).is('.donate-message') ) {
            $(this).fadeOut(400, function(){

            });
        }

    });

    // file input handler
    $('input:file').change(function() {
        // get filename
        var label = '<i class="fa fa-key" aria-hidden="true"></i> ';
        // error if no file selected
        try{
            label += $(this)[0].files[0].name;
        }catch(e){
            label += $(this).attr('data-label');
        }

        // show filename
        $("label[for='" + $(this).attr("id") + "']").html(label);
    });

    // error click to remove
    $('.popup-message').click(function () {
        $(this).fadeOut();
    })
});

function popup(on, message){
    if(on){
        // set message
        $('.popup-content').html(message);
        $('.popup-message').fadeIn( 400, function() {

        });

    } else {
        $('.popup-message').fadeOut( 400, function() {

        });
    }
}

function error(message) {
    popup(true, message);
    setTimeout(function () {
        popup(false, null);
    }, 3000)
}

// disable pinch zooming
window.addEventListener('mousewheel', function (e) {
    // zoom
    if (e.ctrlKey) {
        console.log(e);
        e.preventDefault();

    }
});
